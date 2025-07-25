import { Heart, Shield } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { LanguageSelector } from "./LanguageSelector";

interface HeaderProps {
  patientName?: string;
  showNotification?: boolean;
}

export const Header = ({ patientName = "Patient", showNotification = false }: HeaderProps) => {
  const { t } = useTranslation();
  
  return (
    <header className="bg-card shadow-card border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">{t('header.title')}</h1>
              <p className="text-sm text-muted-foreground">{t('header.subtitle')}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Welcome, {patientName}</p>
              <p className="text-xs text-muted-foreground">Stay informed about your wait</p>
            </div>
            
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
};