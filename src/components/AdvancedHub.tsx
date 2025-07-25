import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Activity, Radio, Brain, Users } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { RealTimeMonitor } from './RealTimeMonitor';
import { SymptomChecker } from './SymptomChecker';
import { EmergencyContactAlerts } from './EmergencyContactAlerts';
import { MedicalInfoForm } from './MedicalInfoForm';

export const AdvancedHub = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('realtime');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Advanced Features Hub
            <Badge variant="secondary">Phase 2 & 3</Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Real-time monitoring, AI pre-screening, and emergency contact management.
          </p>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="realtime" className="gap-2">
            <Radio className="h-4 w-4" />
            <span className="hidden sm:inline">Real-Time</span>
          </TabsTrigger>
          <TabsTrigger value="symptom-checker" className="gap-2">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">AI Assessment</span>
          </TabsTrigger>
          <TabsTrigger value="emergency-contacts" className="gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Contacts</span>
          </TabsTrigger>
          <TabsTrigger value="medical-form" className="gap-2">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Medical Info</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="realtime" className="mt-6">
          <RealTimeMonitor />
        </TabsContent>

        <TabsContent value="symptom-checker" className="mt-6">
          <SymptomChecker />
        </TabsContent>

        <TabsContent value="emergency-contacts" className="mt-6">
          <EmergencyContactAlerts />
        </TabsContent>

        <TabsContent value="medical-form" className="mt-6">
          <MedicalInfoForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};