import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";

import { MedicalInfoForm } from "@/components/MedicalInfoForm";
import { GuidanceSection } from "@/components/GuidanceSection";
import { FAQSection } from "@/components/FAQSection";
import { NotificationSettings } from "@/components/NotificationSettings";
import { PreScreeningHub } from "@/components/PreScreeningHub";
import { TranslationProvider } from "@/components/TranslationProvider";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeSection, setActiveSection] = useState("status");
  const [showNotification, setShowNotification] = useState(false);
  const { toast } = useToast();


  const renderContent = () => {
    switch (activeSection) {
      case "status":
        return <NotificationSettings />;
      case "prescreening":
        return <PreScreeningHub />;
      case "info":
        return <MedicalInfoForm />;
      case "guidance":
        return <GuidanceSection />;
      case "faq":
        return <FAQSection />;
      default:
        return null;
    }
  };

  return (
    <TranslationProvider>
      <div className="min-h-screen bg-gradient-calm">
        <Header patientName="John D." showNotification={showNotification} />
        <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
        
        <main className="container mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto">
            {renderContent()}
          </div>
        </main>
        
        <footer className="bg-card border-t mt-12">
          <div className="container mx-auto px-4 py-6 text-center">
            <p className="text-sm text-muted-foreground">
              For medical emergencies, press the call button or dial 911
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              UrgencyTrack - Keeping you informed during your visit
            </p>
          </div>
        </footer>
      </div>
    </TranslationProvider>
  );
};

export default Index;
