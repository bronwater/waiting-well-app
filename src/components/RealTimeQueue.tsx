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

  // Mock data - à remplacer par données réelles
  const [patients] = useState<Patient[]>([
    {
      id: '1',
      queueNumber: 1,
      lastName: 'Martin',
      firstName: 'Sophie',
      stage: 'consultation',
      admissionType: 'trauma',
      priority: 'critical',
      waitTime: 15,
      observations: 'Douleur thoracique sévère',
      age: 45,
      phone: '06 12 34 56 78',
      address: '15 rue de la Paix, 75001 Paris',
      arrivalTime: '14:30',
      symptoms: 'Douleur thoracique intense, essoufflement, sueurs froides',
      medicalHistory: 'Hypertension artérielle, antécédents cardiaques familiaux',
      allergies: 'Pénicilline',
      currentMedication: 'Lisinopril 10mg, Aspirine 100mg'
    },
    {
      id: '2',
      queueNumber: 2,
      lastName: 'Dubois',
      firstName: 'Jean',
      stage: 'waiting',
      admissionType: 'medicine',
      priority: 'high',
      waitTime: 32,
      observations: 'Fièvre élevée persistante',
      age: 62,
      phone: '06 98 76 54 32',
      address: '8 avenue Victor Hugo, 92100 Boulogne',
      arrivalTime: '15:10',
      symptoms: 'Fièvre 39.5°C depuis 3 jours, toux persistante, fatigue',
      medicalHistory: 'Diabète de type 2, ancien fumeur',
      allergies: 'Aucune allergie connue',
      currentMedication: 'Metformine 850mg'
    },
    {
      id: '3',
      queueNumber: 3,
      lastName: 'Bernard',
      firstName: 'Marie',
      stage: 'triage',
      admissionType: 'trauma',
      priority: 'medium',
      waitTime: 8,
      observations: 'Entorse cheville gauche',
      age: 28,
      phone: '07 45 23 67 89',
      address: '22 boulevard Saint-Michel, 75005 Paris',
      arrivalTime: '16:05',
      symptoms: 'Douleur cheville gauche après chute, gonflement, difficulté à marcher',
      medicalHistory: 'Aucun antécédent notable',
      allergies: 'Aucune allergie connue',
      currentMedication: 'Aucun'
    },
    {
      id: '4',
      queueNumber: 4,
      lastName: 'Petit',
      firstName: 'Lucas',
      stage: 'waiting',
      admissionType: 'medicine',
      priority: 'low',
      waitTime: 45,
      observations: 'Consultation routine',
      age: 35,
      phone: '06 11 22 33 44',
      address: '5 rue de Rivoli, 75004 Paris',
      arrivalTime: '14:20',
      symptoms: 'Mal de gorge léger, légère fièvre (37.8°C)',
      medicalHistory: 'Aucun antécédent',
      allergies: 'Pollen',
      currentMedication: 'Aucun'
    },
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
      case 'critical': return 'Critique';
      case 'high': return 'Élevée';
      case 'medium': return 'Moyenne';
      case 'low': return 'Basse';
      default: return priority;
    }
  };

  const getStageLabel = (stage: string) => {
    switch (stage) {
      case 'triage': return 'Tri';
      case 'waiting': return 'Attente';
      case 'consultation': return 'Consultation';
      case 'treatment': return 'Traitement';
      default: return stage;
    }
  };

  const getAdmissionLabel = (type: string) => {
    return type === 'medicine' ? 'Médecine' : 'Traumatologie';
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
      {/* Dialog pour les détails du patient */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Détails du patient #{selectedPatient?.queueNumber}
            </DialogTitle>
            <DialogDescription>
              Informations complètes du patient
            </DialogDescription>
          </DialogHeader>
          
          {selectedPatient && (
            <div className="space-y-6">
              {/* Informations personnelles */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg border-b pb-2">Informations personnelles</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nom complet</p>
                    <p className="font-medium">{selectedPatient.firstName} {selectedPatient.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Âge</p>
                    <p className="font-medium">{selectedPatient.age} ans</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" /> Téléphone
                    </p>
                    <p className="font-medium">{selectedPatient.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> Adresse
                    </p>
                    <p className="font-medium">{selectedPatient.address}</p>
                  </div>
                </div>
              </div>

              {/* Informations de visite */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg border-b pb-2">Informations de visite</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> Heure d'arrivée
                    </p>
                    <p className="font-medium">{selectedPatient.arrivalTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Temps d'attente</p>
                    <p className="font-medium">{selectedPatient.waitTime} minutes</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Type d'admission</p>
                    <p className="font-medium">{getAdmissionLabel(selectedPatient.admissionType)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Étape actuelle</p>
                    <Badge variant="outline">{getStageLabel(selectedPatient.stage)}</Badge>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-muted-foreground">Priorité</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(selectedPatient.priority)}`} />
                      <span className="font-medium">{getPriorityLabel(selectedPatient.priority)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informations médicales */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg border-b pb-2 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Informations médicales
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Symptômes</p>
                    <p className="text-sm mt-1 p-3 bg-muted rounded-lg">{selectedPatient.symptoms}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Antécédents médicaux</p>
                    <p className="text-sm mt-1 p-3 bg-muted rounded-lg">{selectedPatient.medicalHistory}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Allergies</p>
                    <p className="text-sm mt-1 p-3 bg-muted rounded-lg">{selectedPatient.allergies}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Médicaments actuels</p>
                    <p className="text-sm mt-1 p-3 bg-muted rounded-lg">{selectedPatient.currentMedication}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">Observations</p>
                    <p className="text-sm mt-1 p-3 bg-red-50 border border-red-200 rounded-lg">{selectedPatient.observations}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <Button className="flex-1 gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Prendre en charge
                </Button>
                <Button variant="destructive" className="flex-1 gap-2">
                  <XCircle className="h-4 w-4" />
                  Annuler
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtres
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Select value={admissionFilter} onValueChange={setAdmissionFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Type d'admission" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="medicine">Médecine</SelectItem>
                  <SelectItem value="trauma">Traumatologie</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Priorité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes priorités</SelectItem>
                  <SelectItem value="critical">Critique</SelectItem>
                  <SelectItem value="high">Élevée</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="low">Basse</SelectItem>
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
                  <TableHead className="w-[80px]">N°</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Prénom</TableHead>
                  <TableHead>Étape</TableHead>
                  <TableHead>Type admission</TableHead>
                  <TableHead>Priorité</TableHead>
                  <TableHead>Temps d'attente</TableHead>
                  <TableHead>Observations</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-bold">#{patient.queueNumber}</TableCell>
                    <TableCell className="font-medium">{patient.lastName}</TableCell>
                    <TableCell>{patient.firstName}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{getStageLabel(patient.stage)}</Badge>
                    </TableCell>
                    <TableCell>{getAdmissionLabel(patient.admissionType)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(patient.priority)}`} />
                        <span className="text-sm">{getPriorityLabel(patient.priority)}</span>
                      </div>
                    </TableCell>
                    <TableCell>{patient.waitTime} min</TableCell>
                    <TableCell className="max-w-[200px]">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-2"
                        onClick={() => handleViewDetails(patient)}
                      >
                        <Eye className="h-4 w-4" />
                        Voir détails
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="default" className="gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Prendre en charge
                        </Button>
                        <Button size="sm" variant="destructive" className="gap-2">
                          <XCircle className="h-4 w-4" />
                          Annuler
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredPatients.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Aucun patient ne correspond aux filtres sélectionnés
            </div>
          )}
        </CardContent>
      </Card>
      </div>
    </>
  );
};