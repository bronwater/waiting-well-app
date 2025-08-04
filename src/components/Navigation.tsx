import { Button } from "@/components/ui/button";
import { Clock, User, BookOpen, HelpCircle, Brain, Star, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const { t } = useTranslation();
  
  const navItems = [
    { id: "status", label: t("nav.overview"), icon: Clock },
    { id: "info", label: t("nav.medicalInfo"), icon: User },
    { id: "pain", label: "Pain Report", icon: AlertTriangle },
    { id: "education", label: "Health Education", icon: BookOpen },
    { id: "feedback", label: "Feedback", icon: Star },
    { id: "guidance", label: t("nav.guidance"), icon: BookOpen },
    { id: "faq", label: t("nav.faq"), icon: HelpCircle }
  ];

  return (
    <nav className="bg-card shadow-card border-b">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1 overflow-x-auto py-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap",
                  isActive && "shadow-card"
                )}
              >
                <IconComponent className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};