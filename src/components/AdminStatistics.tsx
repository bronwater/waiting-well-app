import { useState } from "react";
import { Download, Search, TrendingUp, Clock, Users, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTranslation } from "@/hooks/useTranslation";
import { toast } from "sonner";

interface PatientRecord {
  id: string;
  name: string;
  date: string;
  priority: string;
  waitTime: number;
  doctor: string;
  status: 'completed' | 'cancelled' | 'transferred';
}

export const AdminStatistics = () => {
  const { t, language } = useTranslation();
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchId, setSearchId] = useState("");
  const [dateFilter, setDateFilter] = useState("today");

  // Mock data for statistics - translated day names
  const getDayNames = () => {
    if (language === 'es') return ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
    if (language === 'fr') return ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  };

  const dayNames = getDayNames();
  const dailyAverages = [
    { day: dayNames[0], patients: 45, waitTime: 32 },
    { day: dayNames[1], patients: 52, waitTime: 38 },
    { day: dayNames[2], patients: 48, waitTime: 35 },
    { day: dayNames[3], patients: 55, waitTime: 42 },
    { day: dayNames[4], patients: 60, waitTime: 45 },
    { day: dayNames[5], patients: 38, waitTime: 28 },
    { day: dayNames[6], patients: 35, waitTime: 25 },
  ];

  const hourlyAverages = [
    { hour: '8h', patients: 5 },
    { hour: '10h', patients: 12 },
    { hour: '12h', patients: 18 },
    { hour: '14h', patients: 15 },
    { hour: '16h', patients: 20 },
    { hour: '18h', patients: 14 },
    { hour: '20h', patients: 8 },
    { hour: '22h', patients: 4 },
  ];

  const priorityWaitTimes = [
    { priority: t('admin.priority.criticalRed'), avgTime: 5, color: '#ef4444' },
    { priority: t('admin.priority.urgentOrange'), avgTime: 15, color: '#f97316' },
    { priority: t('admin.priority.semiUrgentYellow'), avgTime: 45, color: '#eab308' },
    { priority: t('admin.priority.nonUrgentGreen'), avgTime: 90, color: '#22c55e' },
  ];

  const doctorPerformance = [
    { doctor: 'Dr. Martin', avgTime: 25, patients: 42 },
    { doctor: 'Dr. Dubois', avgTime: 28, patients: 38 },
    { doctor: 'Dr. Bernard', avgTime: 22, patients: 45 },
    { doctor: 'Dr. Petit', avgTime: 30, patients: 35 },
    { doctor: 'Dr. Robert', avgTime: 26, patients: 40 },
  ];

  const mockRecords: PatientRecord[] = [
    { id: 'P001', name: 'Jean Dupont', date: '2024-01-15', priority: 'Rouge', waitTime: 5, doctor: 'Dr. Martin', status: 'completed' },
    { id: 'P002', name: 'Marie Laurent', date: '2024-01-15', priority: 'Orange', waitTime: 18, doctor: 'Dr. Dubois', status: 'completed' },
    { id: 'P003', name: 'Pierre Bernard', date: '2024-01-15', priority: 'Jaune', waitTime: 42, doctor: 'Dr. Bernard', status: 'transferred' },
    { id: 'P004', name: 'Sophie Moreau', date: '2024-01-14', priority: 'Vert', waitTime: 85, doctor: 'Dr. Petit', status: 'completed' },
    { id: 'P005', name: 'Luc Fontaine', date: '2024-01-14', priority: 'Orange', waitTime: 15, doctor: 'Dr. Robert', status: 'cancelled' },
  ];

  const filteredRecords = mockRecords.filter(record => {
    const matchesName = !searchName || record.name.toLowerCase().includes(searchName.toLowerCase());
    const matchesDate = !searchDate || record.date.includes(searchDate);
    const matchesId = !searchId || record.id.toLowerCase().includes(searchId.toLowerCase());
    return matchesName && matchesDate && matchesId;
  });

  const handleExportCSV = () => {
    const csv = [
      ['ID', t('admin.users.name'), t('admin.stats.date'), t('admin.stats.priority'), t('admin.stats.waitTime'), t('admin.stats.doctor'), t('admin.stats.statusLabel')],
      ...filteredRecords.map(r => [r.id, r.name, r.date, r.priority, r.waitTime, r.doctor, r.status])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patients-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success(t('admin.stats.exportSuccess'));
  };

  const handleExportExcel = () => {
    toast.success(t('admin.stats.exportDev'));
  };

  const stats = {
    cancellationRate: 8.5,
    transferRate: 12.3,
    completionRate: 79.2,
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return t('admin.stats.completed');
      case 'cancelled': return t('admin.stats.cancelled');
      case 'transferred': return t('admin.stats.transferred');
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            {t('admin.stats.searchPatient')}
          </CardTitle>
          <CardDescription>
            {t('admin.stats.searchDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder={t('admin.stats.patientName')}
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <Input
              type="date"
              placeholder={t('admin.stats.date')}
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
            <Input
              placeholder={t('admin.stats.patientId')}
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <div className="flex gap-2">
              <Button onClick={handleExportCSV} variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                CSV
              </Button>
              <Button onClick={handleExportExcel} variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Excel
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('admin.stats.completionRate')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.completionRate}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('admin.stats.cancellationRate')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{stats.cancellationRate}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t('admin.stats.transferRate')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats.transferRate}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.stats.dailyAvg')}</CardTitle>
            <CardDescription>{t('admin.stats.dailyAvgDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyAverages}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="patients" stroke="hsl(var(--primary))" name={t('admin.stats.patients')} />
                <Line type="monotone" dataKey="waitTime" stroke="#f97316" name={t('admin.stats.timeMin')} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('admin.stats.hourlyAvg')}</CardTitle>
            <CardDescription>{t('admin.stats.hourlyAvgDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyAverages}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="patients" fill="hsl(var(--primary))" name={t('admin.stats.patients')} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.stats.avgByPriority')}</CardTitle>
            <CardDescription>{t('admin.stats.waitTimeMin')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {priorityWaitTimes.map((item) => (
                <div key={item.priority} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.priority}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full" 
                        style={{ 
                          width: `${(item.avgTime / 90) * 100}%`,
                          backgroundColor: item.color 
                        }}
                      />
                    </div>
                    <span className="text-sm font-bold w-12 text-right">{item.avgTime} min</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('admin.stats.doctorPerformance')}</CardTitle>
            <CardDescription>{t('admin.stats.doctorPerformanceDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={doctorPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="doctor" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgTime" fill="hsl(var(--primary))" name={t('admin.stats.avgTimeMin')} />
                <Bar dataKey="patients" fill="#10b981" name={t('admin.stats.treatedPatients')} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Search Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('admin.stats.searchResults')}</CardTitle>
          <CardDescription>
            {filteredRecords.length} {t('admin.stats.patientsFound')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('admin.stats.id')}</TableHead>
                <TableHead>{t('admin.users.name')}</TableHead>
                <TableHead>{t('admin.stats.date')}</TableHead>
                <TableHead>{t('admin.stats.priority')}</TableHead>
                <TableHead>{t('admin.stats.waitTime')}</TableHead>
                <TableHead>{t('admin.stats.doctor')}</TableHead>
                <TableHead>{t('admin.stats.statusLabel')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    {t('admin.stats.noPatient')}
                  </TableCell>
                </TableRow>
              ) : (
                filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.id}</TableCell>
                    <TableCell>{record.name}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        record.priority === 'Rouge' ? 'bg-red-100 text-red-800' :
                        record.priority === 'Orange' ? 'bg-orange-100 text-orange-800' :
                        record.priority === 'Jaune' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {record.priority}
                      </span>
                    </TableCell>
                    <TableCell>{record.waitTime} min</TableCell>
                    <TableCell>{record.doctor}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        record.status === 'completed' ? 'bg-green-100 text-green-800' :
                        record.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {getStatusLabel(record.status)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
