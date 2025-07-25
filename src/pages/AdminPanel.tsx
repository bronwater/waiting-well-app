import { useState } from "react";
import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { AdminNewsPublisher } from "@/components/AdminNewsPublisher";
import { NewsAnnouncements } from "@/components/NewsAnnouncements";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TranslationProvider } from "@/components/TranslationProvider";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  timestamp: Date;
  author: string;
}

const AdminPanel = () => {
  const { t } = useTranslation();
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: '1',
      title: 'System Maintenance Scheduled',
      content: 'We will be performing system maintenance tonight from 2:00 AM to 4:00 AM. Some services may be temporarily unavailable.',
      priority: 'medium',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      author: 'IT Department'
    }
  ]);

  const handlePublish = (newsItem: Omit<NewsItem, 'id' | 'timestamp'>) => {
    const newItem: NewsItem = {
      ...newsItem,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setNews(prev => [newItem, ...prev]);
  };

  const handleDelete = (id: string) => {
    setNews(prev => prev.filter(item => item.id !== id));
  };

  return (
    <TranslationProvider>
      <div className="min-h-screen bg-background">
        <header className="bg-card shadow-card border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-primary">{t('admin.title')}</h1>
                  <p className="text-sm text-muted-foreground">{t('admin.subtitle')}</p>
                </div>
              </div>
              
              <Link to="/">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {t('admin.backToApp')}
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Tabs defaultValue="publish" className="space-y-6">
            <TabsList>
              <TabsTrigger value="publish">{t('admin.tabs.publish')}</TabsTrigger>
              <TabsTrigger value="preview">{t('admin.tabs.preview')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="publish">
              <AdminNewsPublisher 
                news={news} 
                onPublish={handlePublish} 
                onDelete={handleDelete} 
              />
            </TabsContent>
            
            <TabsContent value="preview">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">{t('admin.preview.title')}</h2>
                <p className="text-muted-foreground">{t('admin.preview.description')}</p>
                <NewsAnnouncements news={news} />
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </TranslationProvider>
  );
};

export default AdminPanel;