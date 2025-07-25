import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { WaitingTimeCard } from "@/components/WaitingTimeCard";
import { MedicalInfoForm } from "@/components/MedicalInfoForm";
import { GuidanceSection } from "@/components/GuidanceSection";
import { FAQSection } from "@/components/FAQSection";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeSection, setActiveSection] = useState("status");
  const [estimatedWait, setEstimatedWait] = useState("45 min");
  const [position, setPosition] = useState(8);
  const [totalPatients, setTotalPatients] = useState(23);
  const [showNotification, setShowNotification] = useState(false);
  const { toast } = useToast();

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update wait time (simulate real conditions)
      const waitTimes = ["35 min", "40 min", "45 min", "50 min", "55 min"];
      const newWait = waitTimes[Math.floor(Math.random() * waitTimes.length)];
      setEstimatedWait(newWait);
      
      // Occasionally advance position
      if (Math.random() > 0.7 && position > 1) {
        setPosition(prev => prev - 1);
        setShowNotification(true);
        toast({
          title: "Update: You're moving up!",
          description: "Your estimated wait time has been updated.",
        });
        
        // Clear notification after 5 seconds
        setTimeout(() => setShowNotification(false), 5000);
      }
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [position, toast]);

  const renderContent = () => {
    switch (activeSection) {
      case "status":
        return (
          <WaitingTimeCard 
            estimatedWait={estimatedWait}
            position={position}
            totalPatients={totalPatients}
          />
        );
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
  );
};

export default Index;
