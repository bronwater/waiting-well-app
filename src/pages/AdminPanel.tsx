import { useState } from "react";
import { Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { AdminNewsPublisher } from "@/components/AdminNewsPublisher";
import { AdminPainReports } from "@/components/AdminPainReports";
import { AdminOverview } from "@/components/AdminOverview";
import { NewsAnnouncements } from "@/components/NewsAnnouncements";
import { RealTimeQueue } from "@/components/RealTimeQueue";
import { AdminStatistics } from "@/components/AdminStatistics";
import { AdminUserManagement } from "@/components/AdminUserManagement";
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

interface AdminContentProps {
  news: NewsItem[];
  onPublish: (newsItem: Omit<NewsItem, 'id' | 'timestamp'>) => void;
  onDelete: (id: string) => void;
}

const AdminContent = ({ news, onPublish, onDelete }: AdminContentProps) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-xl font-bold text-primary truncate">{t('admin.title')}</h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">{t('admin.subtitle')}</p>
              </div>
            </div>
            
            <Link to="/" className="flex-shrink-0">
              <Button variant="outline" size="sm" className="h-8 sm:h-10">
                <ArrowLeft className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">{t('admin.backToApp')}</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
          <div className="overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0">
            <TabsList className="inline-flex w-auto min-w-full sm:min-w-0">
              <TabsTrigger value="overview" className="text-xs sm:text-sm whitespace-nowrap">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="queue" className="text-xs sm:text-sm whitespace-nowrap">File d'attente</TabsTrigger>
              <TabsTrigger value="statistics" className="text-xs sm:text-sm whitespace-nowrap">Statistiques</TabsTrigger>
              <TabsTrigger value="users" className="text-xs sm:text-sm whitespace-nowrap">Gestion utilisateurs</TabsTrigger>
              <TabsTrigger value="painReports" className="text-xs sm:text-sm whitespace-nowrap">{t('admin.tabs.painReports')}</TabsTrigger>
              <TabsTrigger value="publish" className="text-xs sm:text-sm whitespace-nowrap">{t('admin.tabs.publish')}</TabsTrigger>
              <TabsTrigger value="preview" className="text-xs sm:text-sm whitespace-nowrap">{t('admin.tabs.preview')}</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview">
            <AdminOverview />
          </TabsContent>

          <TabsContent value="queue">
            <RealTimeQueue />
          </TabsContent>

          <TabsContent value="statistics">
            <AdminStatistics />
          </TabsContent>

          <TabsContent value="users">
            <AdminUserManagement />
          </TabsContent>

          <TabsContent value="painReports">
            <AdminPainReports />
          </TabsContent>
          
          <TabsContent value="publish">
            <AdminNewsPublisher 
              news={news} 
              onPublish={onPublish} 
              onDelete={onDelete} 
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
  );
};

const AdminPanel = () => {
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
      <AdminContent news={news} onPublish={handlePublish} onDelete={handleDelete} />
    </TranslationProvider>
  );
};

export default AdminPanel;