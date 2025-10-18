import { useState, useEffect } from 'react';
import { AlertTriangle, MapPin, Clock, Calendar, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface PainReport {
  id: string;
  level: number;
  location: string;
  description: string;
  timestamp: Date;
  type: string;
  acknowledged?: boolean;
}

export const AdminPainReports = () => {
  const [reports, setReports] = useState<PainReport[]>([]);
  const { toast } = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    // Load pain reports from localStorage
    const saved = localStorage.getItem('painReports');
    if (saved) {
      const parsedReports = JSON.parse(saved).map((report: any) => ({
        ...report,
        timestamp: new Date(report.timestamp)
      }));
      setReports(parsedReports);
    }
  }, []);

  const getPainColor = (level: number) => {
    if (level === 0) return 'bg-green-500';
    if (level <= 3) return 'bg-yellow-500';
    if (level <= 6) return 'bg-orange-500';
    if (level <= 8) return 'bg-red-500';
    return 'bg-red-700';
  };

  const getPainDescription = (level: number) => {
    if (level === 0) return 'No Pain';
    if (level <= 3) return 'Mild Pain';
    if (level <= 6) return 'Moderate Pain';
    if (level <= 8) return 'Severe Pain';
    return 'Critical Pain';
  };

  const handleAcknowledge = (id: string) => {
    const updatedReports = reports.map(report =>
      report.id === id ? { ...report, acknowledged: true } : report
    );
    setReports(updatedReports);
    localStorage.setItem('painReports', JSON.stringify(updatedReports));
    
    toast({
      title: 'Report Acknowledged',
      description: 'Pain report has been marked as reviewed.',
    });
  };

  const criticalReports = reports.filter(r => r.level >= 8 && !r.acknowledged);
  const highPriorityReports = reports.filter(r => r.level >= 5 && r.level < 8 && !r.acknowledged);

  return (
    <div className="space-y-6">
      {criticalReports.length > 0 && (
        <Card className="border-red-500 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              {t('admin.pain.critical')} ({criticalReports.length})
            </CardTitle>
            <CardDescription className="text-red-600">
              Immediate attention required
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {criticalReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 rounded-lg bg-white border border-red-200">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-full ${getPainColor(report.level)} flex items-center justify-center text-white font-bold`}>
                      {report.level}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold">Patient #{report.id.slice(-6)}</span>
                        {report.location && (
                          <Badge variant="secondary">
                            <MapPin className="h-3 w-3 mr-1" />
                            {report.location}
                          </Badge>
                        )}
                        {report.type && (
                          <Badge variant="outline">{report.type}</Badge>
                        )}
                      </div>
                      {report.description && (
                        <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {report.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <Button size="sm" onClick={() => handleAcknowledge(report.id)}>
                      {t('admin.pain.acknowledge')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {highPriorityReports.length > 0 && (
        <Card className="border-orange-500 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="h-5 w-5" />
              {t('admin.pain.highPriority')} ({highPriorityReports.length})
            </CardTitle>
            <CardDescription className="text-orange-600">
              Requires attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {highPriorityReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 rounded-lg bg-white border border-orange-200">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-full ${getPainColor(report.level)} flex items-center justify-center text-white font-bold`}>
                      {report.level}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold">Patient #{report.id.slice(-6)}</span>
                        {report.location && (
                          <Badge variant="secondary">
                            <MapPin className="h-3 w-3 mr-1" />
                            {report.location}
                          </Badge>
                        )}
                        {report.type && (
                          <Badge variant="outline">{report.type}</Badge>
                        )}
                      </div>
                      {report.description && (
                        <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {report.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => handleAcknowledge(report.id)}>
                      {t('admin.pain.acknowledge')}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>{t('admin.pain.title')}</CardTitle>
          <CardDescription>{t('admin.pain.subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          {reports.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {t('admin.pain.noPain')}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('admin.pain.patient')}</TableHead>
                  <TableHead>{t('admin.pain.level')}</TableHead>
                  <TableHead>{t('admin.pain.location')}</TableHead>
                  <TableHead>{t('admin.pain.type')}</TableHead>
                  <TableHead>{t('admin.pain.description')}</TableHead>
                  <TableHead>{t('admin.pain.time')}</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">#{report.id.slice(-6)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full ${getPainColor(report.level)} flex items-center justify-center text-white font-bold text-xs`}>
                          {report.level}
                        </div>
                        <span className="text-sm">{getPainDescription(report.level)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {report.location ? (
                        <Badge variant="secondary">
                          <MapPin className="h-3 w-3 mr-1" />
                          {report.location}
                        </Badge>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      {report.type ? <Badge variant="outline">{report.type}</Badge> : '-'}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-sm text-muted-foreground truncate">
                        {report.description || '-'}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {report.timestamp.toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {report.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {report.acknowledged ? (
                        <Badge variant="secondary" className="gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          {t('admin.pain.acknowledged')}
                        </Badge>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => handleAcknowledge(report.id)}>
                          {t('admin.pain.acknowledge')}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
