import { useState, useEffect } from 'react';
import { Users, Clock, AlertTriangle, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';

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
  const totalPatients = Math.floor(Math.random() * 20) + 15; // Simulated data
  const avgWaitTime = Math.floor(Math.random() * 30) + 45; // Simulated data
  const activeStaff = Math.floor(Math.random() * 5) + 8; // Simulated data

  const stats = [
    {
      title: t('admin.overview.totalPatients'),
      value: totalPatients,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: t('admin.overview.avgWaitTime'),
      value: `${avgWaitTime} min`,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: t('admin.overview.criticalReports'),
      value: criticalReports,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: t('admin.overview.activeStaff'),
      value: activeStaff,
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

      <Card>
        <CardHeader>
          <CardTitle>{t('admin.overview.recentActivity')}</CardTitle>
          <CardDescription>Latest updates and events</CardDescription>
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
