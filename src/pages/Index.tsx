import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Navigation } from "@/components/Navigation";
import { WaitingTimeCard } from "@/components/WaitingTimeCard";

import { MedicalInfoForm } from "@/components/MedicalInfoForm";
import { GuidanceSection } from "@/components/GuidanceSection";
import { FAQSection } from "@/components/FAQSection";
import { NotificationSettings } from "@/components/NotificationSettings";
import { EducationalContent } from "@/components/EducationalContent";
import { FeedbackRating } from "@/components/FeedbackRating";
import { NewsAnnouncements } from "@/components/NewsAnnouncements";
import { TranslationProvider } from "@/components/TranslationProvider";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeSection, setActiveSection] = useState("status");
  const [estimatedWait, setEstimatedWait] = useState("45 min");
  const [position, setPosition] = useState(8);
  const [totalPatients, setTotalPatients] = useState(23);
  const [showNotification, setShowNotification] = useState(false);
  const [isBeingCalled, setIsBeingCalled] = useState(false);
  const { toast } = useToast();
  
  // Sample news data - in real app, this would come from an API
  const [news] = useState([
    {
      id: '1',
      title: 'System Maintenance Tonight',
      content: 'We will be performing routine system maintenance tonight from 2:00 AM to 4:00 AM. Some services may be temporarily unavailable during this time.',
      priority: 'medium' as const,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      author: 'IT Department'
    },
    {
      id: '2',
      title: 'New Visitor Policy',
      content: 'Starting next week, visitor hours will be extended to 8:00 PM on weekdays. Please check with reception for the latest guidelines.',
      priority: 'low' as const,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      author: 'Administration'
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update wait time (simulate real conditions)
      const waitTimes = ["35 min", "40 min", "45 min", "50 min", "55 min"];
      const newWait = waitTimes[Math.floor(Math.random() * waitTimes.length)];
      setEstimatedWait(newWait);
      
      // Occasionally advance position
      if (Math.random() > 0.7 && position > 1) {
        setPosition(prev => {
          const newPos = prev - 1;
          if (newPos === 1) {
            setIsBeingCalled(true);
            toast({
              title: "🔔 You're being called!",
              description: "Please proceed to your assigned room.",
            });
          }
          return newPos;
        });
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
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gradient-medical">Welcome, John Doe</h2>
              <p className="text-muted-foreground mt-1">Stay informed about your visit</p>
            </div>
            
            {isBeingCalled && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-lg shadow-lg animate-pulse border-2 border-green-400">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">🔔 You're Being Called!</h3>
                  <p className="text-green-50">Please proceed to your assigned room now.</p>
                </div>
              </div>
            )}
            
            <WaitingTimeCard 
              estimatedWait={estimatedWait}
              position={position}
              totalPatients={totalPatients}
            />
            <NewsAnnouncements news={news} />
            <NotificationSettings />
          </div>
        );
      case "info":
        return <MedicalInfoForm />;
      case "education":
        return <EducationalContent />;
      case "feedback":
        return <FeedbackRating />;
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
