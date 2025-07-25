import { Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "@/hooks/useTranslation";
import { useRealTimeQueue } from "@/hooks/useRealTimeQueue";

interface WaitingTimeCardProps {
  estimatedWait?: string;
  position?: number;
  totalPatients?: number;
}

export const WaitingTimeCard = ({ 
  estimatedWait: propWait, 
  position: propPosition, 
  totalPatients: propTotal 
}: WaitingTimeCardProps) => {
  const { t } = useTranslation();
  const { queueData, isConnected } = useRealTimeQueue();

  // Use real-time data when connected, fallback to props
  const estimatedWait = isConnected ? `${queueData.estimatedWaitTime} min` : (propWait || "45 min");
  const position = isConnected ? queueData.position : (propPosition || 8);
  const totalPatients = isConnected ? queueData.totalPatients : (propTotal || 23);

  const getTimeAgo = (timestamp: Date) => {
    const minutes = Math.floor((Date.now() - timestamp.getTime()) / 60000);
    if (minutes === 0) return t('waitTime.justNow');
    return `${minutes} ${t('waitTime.minutesAgo')}`;
  };

  const progressPercentage = ((totalPatients - position) / totalPatients) * 100;

  return (
    <Card className="shadow-card border-primary/20 relative overflow-hidden">
      {/* Real-time indicator */}
      {isConnected && (
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="gap-1 text-xs">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Live
          </Badge>
        </div>
      )}
      
      <CardHeader className="bg-gradient-calm rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-primary" />
          {t('waitTime.estimatedWait')}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <div className="text-4xl font-bold text-primary">{estimatedWait}</div>
          
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{t('waitTime.yourPosition')}: #{position} of {totalPatients}</span>
          </div>
          
          <div className="space-y-2">
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-gradient-primary h-3 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-xs text-muted-foreground">
              Progress: {Math.round(progressPercentage)}% complete
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {t('waitTime.updated')}: {isConnected ? getTimeAgo(queueData.lastUpdated) : t('waitTime.justNow')}
            {isConnected && (
              <div className="text-xs text-primary font-medium mt-1">
                🔄 Real-time updates active
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};