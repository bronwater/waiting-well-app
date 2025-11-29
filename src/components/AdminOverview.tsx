import { useState, useEffect } from 'react';
import { Users, Clock, AlertTriangle, Activity, Bed, Stethoscope } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PainReport {
  id: string;
  level: number;
  timestamp: Date;
  acknowledged?: boolean;
}

export const AdminOverview = () => {
  const [reports, setReports] = useState<PainReport[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const saved = localStorage.getItem('painReports');
    if (saved) {
      const parsedReports = JSON.parse(saved).map((report: any) => ({
        ...report,
        timestamp: new Date(report.timestamp)
      }));
      setReports(parsedReports);
    }
  }, []);

  const criticalReports = reports.filter(r => r.level >= 8 && !r.acknowledged).length;
  const totalPatients = Math.floor(Math.random() * 20) + 15;
  const avgWaitTime = Math.floor(Math.random() * 30) + 45;
  const activeStaff = Math.floor(Math.random() * 5) + 8;
  const availableBeds = Math.floor(Math.random() * 10) + 5;
  const availableDoctors = Math.floor(Math.random() * 8) + 12;

  // Données pour le graphique d'affluence par heure
  const hourlyData = [
    { hour: '00h', patients: 2 },
    { hour: '02h', patients: 1 },
    { hour: '04h', patients: 3 },
    { hour: '06h', patients: 5 },
    { hour: '08h', patients: 12 },
    { hour: '10h', patients: 18 },
    { hour: '12h', patients: 22 },
    { hour: '14h', patients: 20 },
    { hour: '16h', patients: 25 },
    { hour: '18h', patients: 15 },
    { hour: '20h', patients: 10 },
    { hour: '22h', patients: 6 },
  ];

  // Données pour le graphique en camembert (priorités)
  const priorityData = [
    { name: 'Critique', value: 3, color: '#ef4444' },
    { name: 'Élevée', value: 7, color: '#f97316' },
    { name: 'Moyenne', value: 12, color: '#eab308' },
    { name: 'Basse', value: 8, color: '#22c55e' },
  ];

  const stats = [
    {
      title: 'Patients en attente',
      value: totalPatients,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Temps d\'attente moyen',
      value: `${avgWaitTime} min`,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Urgences critiques',
      value: criticalReports,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Lits disponibles',
      value: availableBeds,
      icon: Bed,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Médecins disponibles',
      value: availableDoctors,
      icon: Stethoscope,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Personnel actif',
      value: activeStaff,
      icon: Activity,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
    },
  ];

  const recentActivity = [
    { time: '2 min ago', event: 'New patient check-in', type: 'info' },
    { time: '5 min ago', event: 'Critical pain report submitted', type: 'critical' },
    { time: '12 min ago', event: 'Patient discharged', type: 'success' },
    { time: '18 min ago', event: 'New announcement published', type: 'info' },
    { time: '23 min ago', event: 'Medical staff shift change', type: 'info' },
  ];

  return (
    <div className="space-y-6">
      {/* Statistiques principales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Graphiques */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Affluence par heure */}
        <Card>
          <CardHeader>
            <CardTitle>Affluence par heure</CardTitle>
            <CardDescription>Distribution des patients sur 24h</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="patients" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Patients"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Répartition par priorité */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition par priorité</CardTitle>
            <CardDescription>Distribution des patients par niveau de priorité</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Activité récente */}
      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
          <CardDescription>Derniers événements et logs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'critical' ? 'bg-red-500' :
                    activity.type === 'success' ? 'bg-green-500' :
                    'bg-blue-500'
                  }`} />
                  <span className="text-sm">{activity.event}</span>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
