import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Coffee, Phone, Wifi, MapPin, AlertTriangle } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export const GuidanceSection = () => {
  const { t } = useTranslation();
  
  const guidanceItems = [
    {
      icon: Clock,
      title: t("guidance.stayCalm"),
      description: t("guidance.stayCalm.desc"),
      type: "info"
    },
    {
      icon: Coffee,
      title: "Stay Hydrated",
      description: "Drink water if permitted. Ask staff if you're unsure",
      type: "tip"
    },
    {
      icon: Phone,
      title: t("guidance.phone"),
      description: t("guidance.phone.desc"),
      type: "tip"
    },
    {
      icon: Wifi,
      title: "Free WiFi Available",
      description: "Network: HospitalGuest | No password required",
      type: "info"
    },
    {
      icon: MapPin,
      title: "Facilities Nearby",
      description: "Restrooms, cafeteria, and pharmacy on this floor",
      type: "info"
    },
    {
      icon: AlertTriangle,
      title: "Notify Staff if Symptoms Worsen",
      description: "Don't hesitate to inform staff of any changes",
      type: "important"
    }
  ];

  const getVariant = (type: string) => {
    switch (type) {
      case "important": return "destructive";
      case "tip": return "secondary";
      default: return "outline";
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-primary">{t("guidance.title")}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Helpful information and guidance during your visit
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {guidanceItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <IconComponent className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <Badge variant={getVariant(item.type)} className="text-xs">
                      {item.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};