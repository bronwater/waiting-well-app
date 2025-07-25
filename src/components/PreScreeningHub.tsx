import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Brain, Users, FileText } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { SymptomChecker } from './SymptomChecker';
import { EmergencyContactAlerts } from './EmergencyContactAlerts';
import { MedicalInfoForm } from './MedicalInfoForm';

export const PreScreeningHub = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('symptom-checker');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            Pre-Screening & Alerts
            <Badge variant="secondary">Phase 2</Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Complete your pre-screening and set up emergency contact notifications while you wait.
          </p>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="symptom-checker" className="gap-2">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">AI Assessment</span>
          </TabsTrigger>
          <TabsTrigger value="emergency-contacts" className="gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Contact Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="medical-form" className="gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Medical Info</span>
          </TabsTrigger>
        </TabsList>

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