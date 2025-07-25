import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, User, BookOpen, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: "status", label: "Wait Status", icon: Clock },
  { id: "info", label: "Medical Info", icon: User },
  { id: "guidance", label: "Guidance", icon: BookOpen },
  { id: "faq", label: "FAQ & Help", icon: HelpCircle }
];

export const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
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