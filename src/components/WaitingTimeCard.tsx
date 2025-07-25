import { Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WaitingTimeCardProps {
  estimatedWait: string;
  position: number;
  totalPatients: number;
}

export const WaitingTimeCard = ({ estimatedWait, position, totalPatients }: WaitingTimeCardProps) => {
  return (
    <Card className="shadow-card border-primary/20">
      <CardHeader className="bg-gradient-calm rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-primary" />
          Estimated Wait Time
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <div className="text-4xl font-bold text-primary">{estimatedWait}</div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>You are #{position} of {totalPatients} patients</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((totalPatients - position) / totalPatients) * 100}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};