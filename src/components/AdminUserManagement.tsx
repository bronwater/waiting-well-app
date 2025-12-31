import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserPlus, Trash2, Shield, Search, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  roles: string[];
}

interface LoginHistory {
  id: string;
  user_id: string;
  login_at: string;
  ip_address: string | null;
  user_agent: string | null;
  success: boolean;
}

export const AdminUserManagement = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loginHistory, setLoginHistory] = useState<LoginHistory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  
  // Form states
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserFullName, setNewUserFullName] = useState("");
  const [newUserRole, setNewUserRole] = useState<"admin" | "doctor" | "reception">("reception");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (profilesError) throw profilesError;

      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("*");

      if (rolesError) throw rolesError;

      const usersWithRoles = profiles?.map(profile => ({
        ...profile,
        roles: roles?.filter(r => r.user_id === profile.id).map(r => r.role) || []
      })) || [];

      setUsers(usersWithRoles);
    } catch (error: any) {
      console.error("Error fetching users:", error);
      toast({
        title: t('admin.users.error'),
        description: t('admin.users.loadError'),
        variant: "destructive",
      });
    }
  };

  const fetchLoginHistory = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("login_history")
        .select("*")
        .eq("user_id", userId)
        .order("login_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      setLoginHistory(data || []);
    } catch (error: any) {
      console.error("Error fetching login history:", error);
      toast({
        title: t('admin.users.error'),
        description: t('admin.history.loadError'),
        variant: "destructive",
      });
    }
  };

  const handleCreateUser = async () => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newUserEmail,
        password: newUserPassword,
        options: {
          data: {
            full_name: newUserFullName,
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        const { error: roleError } = await supabase
          .from("user_roles")
          .insert({
            user_id: authData.user.id,
            role: newUserRole,
          });

        if (roleError) throw roleError;

        toast({
          title: t('admin.users.success'),
          description: t('admin.users.created'),
        });

        setNewUserEmail("");
        setNewUserPassword("");
        setNewUserFullName("");
        setNewUserRole("reception");
        setIsCreateDialogOpen(false);
        fetchUsers();
      }
    } catch (error: any) {
      console.error("Error creating user:", error);
      toast({
        title: t('admin.users.error'),
        description: error.message || t('admin.users.createError'),
        variant: "destructive",
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm(t('admin.users.confirmDelete'))) return;

    try {
      const { error } = await supabase.auth.admin.deleteUser(userId);

      if (error) throw error;

      toast({
        title: t('admin.users.success'),
        description: t('admin.users.deleted'),
      });

      fetchUsers();
    } catch (error: any) {
      console.error("Error deleting user:", error);
      toast({
        title: t('admin.users.error'),
        description: t('admin.users.deleteError'),
        variant: "destructive",
      });
    }
  };

  const handleToggleRole = async (userId: string, role: "admin" | "doctor" | "reception") => {
    try {
      const user = users.find(u => u.id === userId);
      const hasRole = user?.roles.includes(role);

      if (hasRole) {
        const { error } = await supabase
          .from("user_roles")
          .delete()
          .eq("user_id", userId)
          .eq("role", role);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("user_roles")
          .insert({
            user_id: userId,
            role: role,
          });

        if (error) throw error;
      }

      toast({
        title: t('admin.users.success'),
        description: hasRole ? t('admin.users.roleRemoved') : t('admin.users.roleAdded'),
      });

      fetchUsers();
    } catch (error: any) {
      console.error("Error toggling role:", error);
      toast({
        title: t('admin.users.error'),
        description: t('admin.users.roleError'),
        variant: "destructive",
      });
    }
  };

  const handleViewHistory = (userId: string) => {
    setSelectedUserId(userId);
    fetchLoginHistory(userId);
    setIsHistoryDialogOpen(true);
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive";
      case "doctor":
        return "default";
      case "reception":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin": return t('admin.users.roleAdmin');
      case "doctor": return t('admin.users.roleDoctor');
      case "reception": return t('admin.users.roleReception');
      default: return role;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{t('admin.users.title')}</h2>
          <p className="text-muted-foreground">{t('admin.users.subtitle')}</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              {t('admin.users.create')}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t('admin.users.createTitle')}</DialogTitle>
              <DialogDescription>
                {t('admin.users.createDesc')}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">{t('admin.users.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <Label htmlFor="password">{t('admin.users.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <div>
                <Label htmlFor="fullName">{t('admin.users.fullName')}</Label>
                <Input
                  id="fullName"
                  value={newUserFullName}
                  onChange={(e) => setNewUserFullName(e.target.value)}
                  placeholder="Jean Dupont"
                />
              </div>
              <div>
                <Label htmlFor="role">{t('admin.users.role')}</Label>
                <Select value={newUserRole} onValueChange={(value: any) => setNewUserRole(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">{t('admin.users.roleAdmin')}</SelectItem>
                    <SelectItem value="doctor">{t('admin.users.roleDoctor')}</SelectItem>
                    <SelectItem value="reception">{t('admin.users.roleReception')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                {t('admin.users.cancel')}
              </Button>
              <Button onClick={handleCreateUser}>
                {t('admin.users.createBtn')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t('admin.users.search')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.users.list')}</CardTitle>
          <CardDescription>
            {filteredUsers.length} {t('admin.users.found')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('admin.users.email')}</TableHead>
                  <TableHead>{t('admin.users.name')}</TableHead>
                  <TableHead>{t('admin.users.roles')}</TableHead>
                  <TableHead>{t('admin.users.createdAt')}</TableHead>
                  <TableHead>{t('admin.users.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell>{user.full_name || "-"}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.roles.length > 0 ? (
                          user.roles.map((role) => (
                            <Badge key={role} variant={getRoleBadgeVariant(role)}>
                              {getRoleLabel(role)}
                            </Badge>
                          ))
                        ) : (
                          <Badge variant="outline">{t('admin.users.noRole')}</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(user.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewHistory(user.id)}
                        >
                          <Clock className="h-4 w-4" />
                        </Button>
                        <Select
                          onValueChange={(value: any) => handleToggleRole(user.id, value)}
                        >
                          <SelectTrigger className="w-[140px] h-8">
                            <Shield className="h-4 w-4 mr-2" />
                            <SelectValue placeholder={t('admin.users.role')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">
                              {user.roles.includes("admin") ? "✓ " : ""}{t('admin.users.roleAdmin')}
                            </SelectItem>
                            <SelectItem value="doctor">
                              {user.roles.includes("doctor") ? "✓ " : ""}{t('admin.users.roleDoctor')}
                            </SelectItem>
                            <SelectItem value="reception">
                              {user.roles.includes("reception") ? "✓ " : ""}{t('admin.users.roleReception')}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Login History Dialog */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{t('admin.history.title')}</DialogTitle>
            <DialogDescription>
              {t('admin.history.subtitle')}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('admin.history.date')}</TableHead>
                  <TableHead>{t('admin.history.ip')}</TableHead>
                  <TableHead>{t('admin.history.browser')}</TableHead>
                  <TableHead>{t('admin.history.status')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loginHistory.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      {new Date(log.login_at).toLocaleString()}
                    </TableCell>
                    <TableCell>{log.ip_address || "-"}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {log.user_agent || "-"}
                    </TableCell>
                    <TableCell>
                      <Badge variant={log.success ? "default" : "destructive"}>
                        {log.success ? t('admin.history.success') : t('admin.history.failed')}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {loginHistory.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      {t('admin.history.noHistory')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};
