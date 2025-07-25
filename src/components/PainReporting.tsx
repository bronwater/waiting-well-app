import { useState, useEffect } from 'react';
import { AlertTriangle, Clock, TrendingUp, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/useTranslation';

interface PainReport {
  id: string;
  level: number;
  location: string;
  description: string;
  timestamp: Date;
  type: string;
}

export const PainReporting = () => {
  const [painLevel, setPainLevel] = useState([0]);
  const [painLocation, setPainLocation] = useState('');
  const [painDescription, setPainDescription] = useState('');
  const [painType, setPainType] = useState('');
  const [recentReports, setRecentReports] = useState<PainReport[]>([]);
  const { toast } = useToast();
  const { t } = useTranslation();

  // Load saved reports on mount
  useEffect(() => {
    const saved = localStorage.getItem('painReports');
    if (saved) {
      const reports = JSON.parse(saved).map((report: any) => ({
        ...report,
        timestamp: new Date(report.timestamp)
      }));
      setRecentReports(reports);
    }
  }, []);

  const painLocations = [
    'Head/Neck', 'Chest', 'Back', 'Abdomen', 'Arms', 'Legs', 'Joints', 'Other'
  ];

  const painTypes = [
    'Sharp', 'Dull', 'Throbbing', 'Burning', 'Cramping', 'Shooting', 'Aching', 'Stabbing'
  ];

  const getPainDescription = (level: number) => {
    if (level === 0) return { text: "No Pain", color: "text-green-600" };
    if (level <= 3) return { text: "Mild Pain", color: "text-yellow-600" };
    if (level <= 6) return { text: "Moderate Pain", color: "text-orange-600" };
    if (level <= 8) return { text: "Severe Pain", color: "text-red-600" };
    return { text: "Worst Possible Pain", color: "text-red-800" };
  };

  const getPainColor = (level: number) => {
    if (level === 0) return "bg-green-500";
    if (level <= 3) return "bg-yellow-500";
    if (level <= 6) return "bg-orange-500";
    if (level <= 8) return "bg-red-500";
    return "bg-red-700";
  };

  const handleSubmitReport = () => {
    if (painLevel[0] === 0) {
      toast({
        title: "Please select your pain level",
        description: "Use the slider to indicate your current pain level.",
        variant: "destructive"
      });
      return;
    }

    const newReport: PainReport = {
      id: Date.now().toString(),
      level: painLevel[0],
      location: painLocation,
      description: painDescription,
      timestamp: new Date(),
      type: painType
    };

    const updatedReports = [newReport, ...recentReports].slice(0, 10);
    setRecentReports(updatedReports);
    localStorage.setItem('painReports', JSON.stringify(updatedReports));

    // Alert medical staff for high pain levels
    if (painLevel[0] >= 8) {
      toast({
        title: "High Pain Level Alert",
        description: "Your report has been flagged for immediate medical attention.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Pain Report Submitted",
        description: "Your medical team has been notified of your current pain level.",
      });
    }

    // Reset form
    setPainLevel([0]);
    setPainLocation('');
    setPainDescription('');
    setPainType('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const currentPain = getPainDescription(painLevel[0]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Pain Level Assessment
          </CardTitle>
          <CardDescription>
            Help your medical team understand your current pain level and symptoms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Rate your current pain level (0 = No Pain, 10 = Worst Possible Pain)
              </p>
              <div className="space-y-4">
                <Slider
                  value={painLevel}
                  onValueChange={setPainLevel}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0</span>
                  <span>2</span>
                  <span>4</span>
                  <span>6</span>
                  <span>8</span>
                  <span>10</span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getPainColor(painLevel[0])} text-white font-medium`}>
                  <span className="text-2xl font-bold">{painLevel[0]}</span>
                  <span>•</span>
                  <span>{currentPain.text}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Pain Location</label>
                <div className="grid grid-cols-2 gap-2">
                  {painLocations.map((location) => (
                    <Button
                      key={location}
                      variant={painLocation === location ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPainLocation(location)}
                      className="text-xs"
                    >
                      {location}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Pain Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {painTypes.map((type) => (
                    <Button
                      key={type}
                      variant={painType === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPainType(type)}
                      className="text-xs"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Additional Details (Optional)
              </label>
              <Textarea
                placeholder="Describe what makes the pain better or worse, when it started, or any other relevant details..."
                value={painDescription}
                onChange={(e) => setPainDescription(e.target.value)}
                className="min-h-20"
              />
            </div>

            <Button 
              onClick={handleSubmitReport} 
              className="w-full"
              disabled={painLevel[0] === 0}
            >
              Submit Pain Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {recentReports.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recent Pain Reports
            </CardTitle>
            <CardDescription>
              Track your pain levels over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentReports.slice(0, 5).map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${getPainColor(report.level)} flex items-center justify-center text-white font-bold text-sm`}>
                      {report.level}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{getPainDescription(report.level).text}</span>
                        {report.location && (
                          <Badge variant="secondary" className="text-xs">
                            <MapPin className="h-3 w-3 mr-1" />
                            {report.location}
                          </Badge>
                        )}
                        {report.type && (
                          <Badge variant="outline" className="text-xs">
                            {report.type}
                          </Badge>
                        )}
                      </div>
                      {report.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {report.description.substring(0, 100)}
                          {report.description.length > 100 && '...'}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTime(report.timestamp)}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <Calendar className="h-3 w-3" />
                      {report.timestamp.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Emergency Pain Protocol</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="font-medium text-red-800">Severe Pain (8-10)</p>
                <p className="text-sm text-red-600">Immediate medical attention will be provided</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium text-yellow-800">Moderate Pain (4-7)</p>
                <p className="text-sm text-yellow-600">Nursing staff will assess within 30 minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Mild Pain (1-3)</p>
                <p className="text-sm text-green-600">Comfort measures and monitoring provided</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};