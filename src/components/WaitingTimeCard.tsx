import { Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/useTranslation";
import { useNotifications } from "@/hooks/useNotifications";
import { useEffect, useState } from "react";

interface WaitingTimeCardProps {
  estimatedWait: string;
  position: number;
  totalPatients: number;
}

export const WaitingTimeCard = ({ estimatedWait, position, totalPatients }: WaitingTimeCardProps) => {
  const { t } = useTranslation();
  const { sendWaitTimeUpdate } = useNotifications();
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  // Send notification when position changes significantly
  useEffect(() => {
    if (position <= 3) {
      sendWaitTimeUpdate(parseInt(estimatedWait), position);
    }
    setLastUpdated(Date.now());
  }, [position, estimatedWait, sendWaitTimeUpdate]);

  const getTimeAgo = (timestamp: number) => {
    const minutes = Math.floor((Date.now() - timestamp) / 60000);
    if (minutes === 0) return t('waitTime.justNow');
    return `${minutes} ${t('waitTime.minutesAgo')}`;
  };

  return (
    <Card className="shadow-card border-primary/20">
      <CardHeader className="bg-gradient-calm rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-primary" />
          {t('waitTime.estimatedWait')}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <div className="text-4xl font-bold text-gradient-medical">{estimatedWait}</div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{t('waitTime.yourPosition')}: #{position} of {totalPatients}</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((totalPatients - position) / totalPatients) * 100}%` }}
            ></div>
          </div>
          <div className="text-sm text-muted-foreground">
            {t('waitTime.updated')}: {getTimeAgo(lastUpdated)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};