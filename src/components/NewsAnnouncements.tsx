import { Bell, Clock, AlertCircle } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  timestamp: Date;
  author: string;
}

interface NewsAnnouncementsProps {
  news: NewsItem[];
}

export const NewsAnnouncements = ({ news }: NewsAnnouncementsProps) => {
  const { t } = useTranslation();
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      default: return 'secondary';
    }
  };
  
  const getPriorityIcon = (priority: string) => {
    if (priority === 'urgent' || priority === 'high') {
      return <AlertCircle className="h-4 w-4" />;
    }
    return <Bell className="h-4 w-4" />;
  };

  if (news.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            {t('news.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{t('news.noNews')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3 animate-fade-in">
      <h2 className="text-base font-medium flex items-center gap-2 text-muted-foreground">
        <Bell className="h-4 w-4" />
        {t('news.title')}
      </h2>
      
      <div className="space-y-2">
        {news.map((item, index) => (
          <Alert 
            key={item.id} 
            className={`
              ${item.priority === 'urgent' ? 'border-destructive' : ''} 
              animate-fade-in hover-scale transition-all duration-200 
              border-l-4 ${item.priority === 'urgent' ? 'border-l-destructive' : 'border-l-primary'} 
              text-sm py-3
            `}
            style={{ 
              animationDelay: `${index * 100}ms` 
            }}
          >
            <div className="flex items-start gap-3 w-full">
              {getPriorityIcon(item.priority)}
              <div className="flex-1 space-y-1.5 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-medium text-sm truncate">{item.title}</h3>
                  <Badge variant={getPriorityColor(item.priority) as any} className="text-xs shrink-0">
                    {t(`news.priority.${item.priority}`)}
                  </Badge>
                </div>
                <AlertDescription className="text-xs text-muted-foreground line-clamp-2">
                  {item.content}
                </AlertDescription>
                <div className="flex items-center gap-2 text-xs text-muted-foreground opacity-75">
                  <Clock className="h-3 w-3" />
                  <span>{item.timestamp.toLocaleString()}</span>
                  <span>•</span>
                  <span>{item.author}</span>
                </div>
              </div>
            </div>
          </Alert>
        ))}
      </div>
    </div>
  );
};