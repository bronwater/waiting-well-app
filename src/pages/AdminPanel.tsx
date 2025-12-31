import { useState } from "react";
import { Shield, ArrowLeft, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { AdminNewsPublisher } from "@/components/AdminNewsPublisher";
import { AdminPainReports } from "@/components/AdminPainReports";
import { AdminOverview } from "@/components/AdminOverview";
import { NewsAnnouncements } from "@/components/NewsAnnouncements";
import { RealTimeQueue } from "@/components/RealTimeQueue";
import { AdminStatistics } from "@/components/AdminStatistics";
import { AdminUserManagement } from "@/components/AdminUserManagement";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tabs = [
    { value: "overview", label: t('admin.tabs.overview') },
    { value: "queue", label: t('admin.tabs.queue') },
    { value: "statistics", label: t('admin.tabs.statistics') },
    { value: "users", label: t('admin.tabs.users') },
    { value: "painReports", label: t('admin.tabs.painReports') },
    { value: "publish", label: t('admin.tabs.publish') },
    { value: "preview", label: t('admin.tabs.preview') },
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              {/* Hamburger menu for mobile */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="sm:hidden h-8 w-8 flex-shrink-0">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 z-[100]">
                  <SheetHeader>
                    <SheetTitle>{t('admin.menu')}</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-2 mt-6">
                    {tabs.map((tab) => (
                      <button
                        key={tab.value}
                        onClick={() => handleTabChange(tab.value)}
                        className={cn(
                          "w-full text-left px-4 py-3 rounded-md transition-colors",
                          activeTab === tab.value
                            ? "bg-primary text-primary-foreground font-medium"
                            : "hover:bg-muted"
                        )}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>

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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          {/* Desktop tabs */}
          <div className="hidden sm:block">
            <TabsList>
              {tabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value} className="text-sm">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {/* Mobile: show current tab title */}
          <div className="sm:hidden">
            <h2 className="text-lg font-semibold text-foreground">
              {tabs.find(tab => tab.value === activeTab)?.label}
            </h2>
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