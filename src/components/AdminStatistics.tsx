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
  const { t } = useTranslation();
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchId, setSearchId] = useState("");
  const [dateFilter, setDateFilter] = useState("today");

  // Mock data for statistics
  const dailyAverages = [
    { day: 'Lun', patients: 45, waitTime: 32 },
    { day: 'Mar', patients: 52, waitTime: 38 },
    { day: 'Mer', patients: 48, waitTime: 35 },
    { day: 'Jeu', patients: 55, waitTime: 42 },
    { day: 'Ven', patients: 60, waitTime: 45 },
    { day: 'Sam', patients: 38, waitTime: 28 },
    { day: 'Dim', patients: 35, waitTime: 25 },
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
    { priority: 'Critique (Rouge)', avgTime: 5, color: '#ef4444' },
    { priority: 'Urgent (Orange)', avgTime: 15, color: '#f97316' },
    { priority: 'Semi-urgent (Jaune)', avgTime: 45, color: '#eab308' },
    { priority: 'Non-urgent (Vert)', avgTime: 90, color: '#22c55e' },
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
      ['ID', 'Nom', 'Date', 'Priorité', 'Temps d\'attente (min)', 'Médecin', 'Statut'],
      ...filteredRecords.map(r => [r.id, r.name, r.date, r.priority, r.waitTime, r.doctor, r.status])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patients-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success("Export CSV réussi");
  };

  const handleExportExcel = () => {
    // In a real app, you'd use a library like xlsx
    toast.success("Export Excel en cours de développement");
  };

  const stats = {
    cancellationRate: 8.5,
    transferRate: 12.3,
    completionRate: 79.2,
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Rechercher un patient
          </CardTitle>
          <CardDescription>
            Recherchez par nom, date ou ID patient
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Nom du patient"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <Input
              type="date"
              placeholder="Date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
            />
            <Input
              placeholder="ID Patient"
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
              Taux de complétion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.completionRate}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taux d'annulation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{stats.cancellationRate}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taux de transfert
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
            <CardTitle>Moyennes par jour</CardTitle>
            <CardDescription>Patients et temps d'attente moyen</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyAverages}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="patients" stroke="hsl(var(--primary))" name="Patients" />
                <Line type="monotone" dataKey="waitTime" stroke="#f97316" name="Temps (min)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Moyennes par heure</CardTitle>
            <CardDescription>Affluence horaire</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyAverages}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="patients" fill="hsl(var(--primary))" name="Patients" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Délai moyen par priorité</CardTitle>
            <CardDescription>Temps d'attente en minutes</CardDescription>
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
            <CardTitle>Temps de prise en charge par praticien</CardTitle>
            <CardDescription>Temps moyen et nombre de patients</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={doctorPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="doctor" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgTime" fill="hsl(var(--primary))" name="Temps moyen (min)" />
                <Bar dataKey="patients" fill="#10b981" name="Patients traités" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Search Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Résultats de recherche</CardTitle>
          <CardDescription>
            {filteredRecords.length} patient(s) trouvé(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Priorité</TableHead>
                <TableHead>Temps d'attente</TableHead>
                <TableHead>Médecin</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    Aucun patient trouvé
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
                        {record.status === 'completed' ? 'Terminé' :
                         record.status === 'cancelled' ? 'Annulé' :
                         'Transféré'}
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
