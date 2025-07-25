import { useState } from "react";
import { Plus, Send, Trash2 } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { useToast } from "@/hooks/use-toast";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  timestamp: Date;
  author: string;
}

interface AdminNewsPublisherProps {
  news: NewsItem[];
  onPublish: (newsItem: Omit<NewsItem, 'id' | 'timestamp'>) => void;
  onDelete: (id: string) => void;
}

export const AdminNewsPublisher = ({ news, onPublish, onDelete }: AdminNewsPublisherProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');
  const [author, setAuthor] = useState('');

  const handlePublish = () => {
    if (!title.trim() || !content.trim() || !author.trim()) {
      toast({
        title: t('admin.news.error'),
        description: t('admin.news.fillRequired'),
        variant: "destructive",
      });
      return;
    }

    onPublish({
      title: title.trim(),
      content: content.trim(),
      priority,
      author: author.trim(),
    });

    setTitle('');
    setContent('');
    setPriority('medium');
    setAuthor('');

    toast({
      title: t('admin.news.published'),
      description: t('admin.news.publishedSuccess'),
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {t('admin.news.publish')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('admin.news.title')}</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('admin.news.titlePlaceholder')}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('admin.news.author')}</label>
              <Input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder={t('admin.news.authorPlaceholder')}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('admin.news.priority')}</label>
            <Select value={priority} onValueChange={(value: any) => setPriority(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">{t('news.priority.low')}</SelectItem>
                <SelectItem value="medium">{t('news.priority.medium')}</SelectItem>
                <SelectItem value="high">{t('news.priority.high')}</SelectItem>
                <SelectItem value="urgent">{t('news.priority.urgent')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('admin.news.content')}</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t('admin.news.contentPlaceholder')}
              className="min-h-[120px]"
            />
          </div>
          
          <Button onClick={handlePublish} className="w-full">
            <Send className="h-4 w-4 mr-2" />
            {t('admin.news.publishButton')}
          </Button>
        </CardContent>
      </Card>

      {news.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t('admin.news.published')} ({news.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {news.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-3 p-3 border rounded-lg">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{item.title}</h4>
                      <Badge variant={getPriorityColor(item.priority) as any} className="text-xs">
                        {t(`news.priority.${item.priority}`)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.content}</p>
                    <div className="text-xs text-muted-foreground">
                      {item.timestamp.toLocaleString()} • {item.author}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(item.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};