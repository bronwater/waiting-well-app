import { useState } from 'react';
import { Eye, CheckCircle, XCircle, Filter, User, Phone, MapPin, Calendar, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useTranslation } from '@/hooks/useTranslation';

interface Patient {
  id: string;
  queueNumber: number;
  lastName: string;
  firstName: string;
  stage: 'triage' | 'waiting' | 'consultation' | 'treatment';
  admissionType: 'medicine' | 'trauma';
  priority: 'critical' | 'high' | 'medium' | 'low';
  waitTime: number;
  observations: string;
  age: number;
  phone: string;
  address: string;
  arrivalTime: string;
  symptoms: string;
  medicalHistory: string;
  allergies: string;
  currentMedication: string;
}

export const RealTimeQueue = () => {
  const { t } = useTranslation();
  const [admissionFilter, setAdmissionFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [patients] = useState<Patient[]>([
    { id: '1', queueNumber: 1, lastName: 'Martin', firstName: 'Sophie', stage: 'consultation', admissionType: 'trauma', priority: 'critical', waitTime: 15, observations: 'Douleur thoracique sévère', age: 45, phone: '06 12 34 56 78', address: '15 rue de la Paix, 75001 Paris', arrivalTime: '14:30', symptoms: 'Douleur thoracique intense, essoufflement', medicalHistory: 'Hypertension artérielle', allergies: 'Pénicilline', currentMedication: 'Lisinopril 10mg' },
    { id: '2', queueNumber: 2, lastName: 'Dubois', firstName: 'Jean', stage: 'waiting', admissionType: 'medicine', priority: 'high', waitTime: 32, observations: 'Fièvre élevée persistante', age: 62, phone: '06 98 76 54 32', address: '8 avenue Victor Hugo', arrivalTime: '15:10', symptoms: 'Fièvre 39.5°C depuis 3 jours', medicalHistory: 'Diabète de type 2', allergies: 'Aucune', currentMedication: 'Metformine 850mg' },
    { id: '3', queueNumber: 3, lastName: 'Bernard', firstName: 'Marie', stage: 'triage', admissionType: 'trauma', priority: 'medium', waitTime: 8, observations: 'Entorse cheville gauche', age: 28, phone: '07 45 23 67 89', address: '22 boulevard Saint-Michel', arrivalTime: '16:05', symptoms: 'Douleur cheville gauche après chute', medicalHistory: 'Aucun antécédent', allergies: 'Aucune', currentMedication: 'Aucun' },
    { id: '4', queueNumber: 4, lastName: 'Petit', firstName: 'Lucas', stage: 'waiting', admissionType: 'medicine', priority: 'low', waitTime: 45, observations: 'Consultation routine', age: 35, phone: '06 11 22 33 44', address: '5 rue de Rivoli', arrivalTime: '14:20', symptoms: 'Mal de gorge léger', medicalHistory: 'Aucun antécédent', allergies: 'Pollen', currentMedication: 'Aucun' },
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'critical': return t('admin.queue.critical');
      case 'high': return t('admin.queue.high');
      case 'medium': return t('admin.queue.medium');
      case 'low': return t('admin.queue.low');
      default: return priority;
    }
  };

  const getStageLabel = (stage: string) => {
    switch (stage) {
      case 'triage': return t('admin.queue.stageTriage');
      case 'waiting': return t('admin.queue.stageWaiting');
      case 'consultation': return t('admin.queue.stageConsultation');
      case 'treatment': return t('admin.queue.stageTreatment');
      default: return stage;
    }
  };

  const getAdmissionLabel = (type: string) => {
    return type === 'medicine' ? t('admin.queue.medicine') : t('admin.queue.trauma');
  };

  const filteredPatients = patients.filter(patient => {
    const matchesAdmission = admissionFilter === 'all' || patient.admissionType === admissionFilter;
    const matchesPriority = priorityFilter === 'all' || patient.priority === priorityFilter;
    return matchesAdmission && matchesPriority;
  });

  const handleViewDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {t('admin.patient.details')} #{selectedPatient?.queueNumber}
            </DialogTitle>
            <DialogDescription>{t('admin.patient.fullInfo')}</DialogDescription>
          </DialogHeader>
          
          {selectedPatient && (
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg border-b pb-2">{t('admin.patient.personalInfo')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-sm text-muted-foreground">{t('admin.patient.fullName')}</p><p className="font-medium">{selectedPatient.firstName} {selectedPatient.lastName}</p></div>
                  <div><p className="text-sm text-muted-foreground">{t('admin.patient.age')}</p><p className="font-medium">{selectedPatient.age} {t('admin.patient.years')}</p></div>
                  <div><p className="text-sm text-muted-foreground flex items-center gap-1"><Phone className="h-3 w-3" /> {t('admin.patient.phone')}</p><p className="font-medium">{selectedPatient.phone}</p></div>
                  <div className="col-span-2"><p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> {t('admin.patient.address')}</p><p className="font-medium">{selectedPatient.address}</p></div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg border-b pb-2">{t('admin.patient.visitInfo')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-sm text-muted-foreground">{t('admin.patient.arrivalTime')}</p><p className="font-medium">{selectedPatient.arrivalTime}</p></div>
                  <div><p className="text-sm text-muted-foreground">{t('admin.patient.waitTime')}</p><p className="font-medium">{selectedPatient.waitTime} {t('admin.patient.minutes')}</p></div>
                  <div><p className="text-sm text-muted-foreground">{t('admin.patient.admissionType')}</p><p className="font-medium">{getAdmissionLabel(selectedPatient.admissionType)}</p></div>
                  <div><p className="text-sm text-muted-foreground">{t('admin.patient.currentStage')}</p><Badge variant="outline">{getStageLabel(selectedPatient.stage)}</Badge></div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg border-b pb-2"><FileText className="h-5 w-5 inline mr-2" />{t('admin.patient.medicalInfo')}</h3>
                <div className="space-y-3">
                  <div><p className="text-sm text-muted-foreground font-medium">{t('admin.patient.symptoms')}</p><p className="text-sm mt-1 p-3 bg-muted rounded-lg">{selectedPatient.symptoms}</p></div>
                  <div><p className="text-sm text-muted-foreground font-medium">{t('admin.patient.medicalHistory')}</p><p className="text-sm mt-1 p-3 bg-muted rounded-lg">{selectedPatient.medicalHistory}</p></div>
                  <div><p className="text-sm text-muted-foreground font-medium">{t('admin.patient.allergies')}</p><p className="text-sm mt-1 p-3 bg-muted rounded-lg">{selectedPatient.allergies}</p></div>
                  <div><p className="text-sm text-muted-foreground font-medium">{t('admin.patient.currentMedication')}</p><p className="text-sm mt-1 p-3 bg-muted rounded-lg">{selectedPatient.currentMedication}</p></div>
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t">
                <Button className="flex-1 gap-2"><CheckCircle className="h-4 w-4" />{t('admin.queue.takeCharge')}</Button>
                <Button variant="destructive" className="flex-1 gap-2"><XCircle className="h-4 w-4" />{t('admin.queue.cancelAction')}</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="flex items-center gap-2"><Filter className="h-5 w-5" />{t('admin.queue.filters')}</CardTitle>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Select value={admissionFilter} onValueChange={setAdmissionFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder={t('admin.queue.admissionType')} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('admin.queue.allTypes')}</SelectItem>
                    <SelectItem value="medicine">{t('admin.queue.medicine')}</SelectItem>
                    <SelectItem value="trauma">{t('admin.queue.trauma')}</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder={t('admin.stats.priority')} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('admin.queue.allPriorities')}</SelectItem>
                    <SelectItem value="critical">{t('admin.queue.critical')}</SelectItem>
                    <SelectItem value="high">{t('admin.queue.high')}</SelectItem>
                    <SelectItem value="medium">{t('admin.queue.medium')}</SelectItem>
                    <SelectItem value="low">{t('admin.queue.low')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">{t('admin.queue.number')}</TableHead>
                    <TableHead>{t('admin.queue.lastName')}</TableHead>
                    <TableHead>{t('admin.queue.firstName')}</TableHead>
                    <TableHead>{t('admin.queue.stage')}</TableHead>
                    <TableHead>{t('admin.queue.admissionType')}</TableHead>
                    <TableHead>{t('admin.stats.priority')}</TableHead>
                    <TableHead>{t('admin.stats.waitTime')}</TableHead>
                    <TableHead>{t('admin.queue.observations')}</TableHead>
                    <TableHead className="text-right">{t('admin.users.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-bold">#{patient.queueNumber}</TableCell>
                      <TableCell className="font-medium">{patient.lastName}</TableCell>
                      <TableCell>{patient.firstName}</TableCell>
                      <TableCell><Badge variant="outline">{getStageLabel(patient.stage)}</Badge></TableCell>
                      <TableCell>{getAdmissionLabel(patient.admissionType)}</TableCell>
                      <TableCell><div className="flex items-center gap-2"><div className={`w-3 h-3 rounded-full ${getPriorityColor(patient.priority)}`} /><span className="text-sm">{getPriorityLabel(patient.priority)}</span></div></TableCell>
                      <TableCell>{patient.waitTime} min</TableCell>
                      <TableCell className="max-w-[200px]"><Button variant="ghost" size="sm" className="gap-2" onClick={() => handleViewDetails(patient)}><Eye className="h-4 w-4" />{t('admin.queue.viewDetails')}</Button></TableCell>
                      <TableCell className="text-right"><div className="flex justify-end gap-2"><Button size="sm" variant="default" className="gap-2"><CheckCircle className="h-4 w-4" />{t('admin.queue.takeCharge')}</Button><Button size="sm" variant="destructive" className="gap-2"><XCircle className="h-4 w-4" />{t('admin.queue.cancelAction')}</Button></div></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filteredPatients.length === 0 && <div className="text-center py-8 text-muted-foreground">{t('admin.queue.noPatients')}</div>}
          </CardContent>
        </Card>
      </div>
    </>
  );
};
