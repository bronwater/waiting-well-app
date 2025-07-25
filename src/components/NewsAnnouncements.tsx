import { Bell, Clock, AlertCircle } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useState } from "react";

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
    <div className="space-y-2 animate-fade-in">
      <h2 className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
        <Bell className="h-4 w-4" />
        {t('news.title')}
      </h2>
      
      <ScrollArea className="w-full">
        <div className="flex gap-3 pb-2">
          {news.map((item, index) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <div
                  className={`
                    flex-shrink-0 w-64 p-3 rounded-lg border bg-card cursor-pointer
                    ${item.priority === 'urgent' ? 'border-destructive' : 'border-border'} 
                    animate-fade-in hover-scale transition-all duration-200
                    border-l-4 ${item.priority === 'urgent' ? 'border-l-destructive' : 'border-l-primary'}
                    hover:shadow-md
                  `}
                  style={{ 
                    animationDelay: `${index * 100}ms` 
                  }}
                >
                  <div className="flex items-start gap-2">
                    {getPriorityIcon(item.priority)}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium text-sm leading-tight line-clamp-1">{item.title}</h3>
                        <Badge variant={getPriorityColor(item.priority) as any} className="text-xs shrink-0">
                          {t(`news.priority.${item.priority}`)}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1 leading-relaxed">
                        {item.content}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground opacity-75 pt-1">
                        <Clock className="h-3 w-3" />
                        <span className="truncate">{item.timestamp.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {getPriorityIcon(item.priority)}
                    <DialogTitle className="flex-1">{item.title}</DialogTitle>
                    <Badge variant={getPriorityColor(item.priority) as any}>
                      {t(`news.priority.${item.priority}`)}
                    </Badge>
                  </div>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm leading-relaxed">{item.content}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
                    <Clock className="h-4 w-4" />
                    <span>{item.timestamp.toLocaleDateString()} • {item.author}</span>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};