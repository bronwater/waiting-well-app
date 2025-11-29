import { useState } from 'react';
import { Eye, CheckCircle, XCircle, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
}

export const RealTimeQueue = () => {
  const { t } = useTranslation();
  const [admissionFilter, setAdmissionFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

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
      observations: 'Douleur thoracique sévère'
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
      observations: 'Fièvre élevée persistante'
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
      observations: 'Entorse cheville gauche'
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
      observations: 'Consultation routine'
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

  return (
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
                      <Button variant="ghost" size="sm" className="gap-2">
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
  );
};