import { Heart, Menu } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSelector } from "./LanguageSelector";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

interface HeaderProps {
  patientName?: string;
  showNotification?: boolean;
  navigationItems?: Array<{
    id: string;
    label: string;
    icon: any;
    onClick: () => void;
    isActive: boolean;
  }>;
}

export const Header = ({ patientName = "Patient", showNotification = false, navigationItems = [] }: HeaderProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  
  return (
    <header className="bg-card shadow-card border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient-medical">{t('header.title')}</h1>
              <p className="text-sm text-muted-foreground hidden sm:block">{t('header.subtitle')}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden lg:block">
              <p className="text-sm font-medium">Welcome, {patientName}</p>
              <p className="text-xs text-muted-foreground">Stay informed about your wait</p>
            </div>
            
            <div className="hidden sm:block">
              <LanguageSelector />
            </div>

            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="sm:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <div className="flex flex-col gap-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gradient-medical">{t('header.title')}</h2>
                      <p className="text-xs text-muted-foreground">{t('header.subtitle')}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    {navigationItems.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <Button
                          key={item.id}
                          variant={item.isActive ? "default" : "ghost"}
                          className="w-full justify-start gap-3"
                          onClick={() => {
                            item.onClick();
                            setOpen(false);
                          }}
                        >
                          <IconComponent className="h-5 w-5" />
                          <span>{item.label}</span>
                        </Button>
                      );
                    })}
                  </div>

                  <div className="pt-4 border-t">
                    <LanguageSelector />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};