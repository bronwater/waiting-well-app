import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Users, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/hooks/use-toast';

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email: string;
  notifyOnUpdates: boolean;
  notifyOnCompletion: boolean;
}

export const EmergencyContactAlerts = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [currentContact, setCurrentContact] = useState<EmergencyContact>({
    name: '',
    relationship: '',
    phone: '',
    email: '',
    notifyOnUpdates: true,
    notifyOnCompletion: true,
  });
  const [alertsSent, setAlertsSent] = useState(false);

  const relationships = [
    'Spouse/Partner',
    'Parent',
    'Child',
    'Sibling',
    'Other Family',
    'Friend',
    'Caregiver',
    'Other'
  ];

  const addContact = () => {
    if (!currentContact.name || !currentContact.phone) {
      toast({
        title: "Missing Information",
        description: "Please provide at least a name and phone number.",
        variant: "destructive",
      });
      return;
    }

    setContacts(prev => [...prev, { ...currentContact }]);
    setCurrentContact({
      name: '',
      relationship: '',
      phone: '',
      email: '',
      notifyOnUpdates: true,
      notifyOnCompletion: true,
    });

    toast({
      title: "Contact Added",
      description: `${currentContact.name} has been added to your emergency contacts.`,
    });
  };

  const removeContact = (index: number) => {
    setContacts(prev => prev.filter((_, i) => i !== index));
    toast({
      title: "Contact Removed",
      description: "Emergency contact has been removed.",
    });
  };

  const sendAlerts = () => {
    // Simulate sending alerts (in real app, this would call SMS/email APIs)
    setAlertsSent(true);
    
    contacts.forEach(contact => {
      if (contact.notifyOnUpdates) {
        // Simulate SMS/Email sending
        console.log(`Sending alert to ${contact.name} at ${contact.phone}`);
      }
    });

    toast({
      title: "Alerts Sent",
      description: `Notifications sent to ${contacts.length} emergency contact(s).`,
    });
  };

  const getNotificationPreview = () => {
    return `🏥 UrgencyTrack Update: Your contact is currently in the ER waiting room at City Hospital. We'll keep you updated on any changes. For emergencies, call 911.`;
  };

  return (
    <div className="space-y-6">
      {/* Add Emergency Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Emergency Contact Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact-name">Full Name *</Label>
              <Input
                id="contact-name"
                value={currentContact.name}
                onChange={(e) => setCurrentContact(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter contact name"
              />
            </div>
            <div>
              <Label htmlFor="relationship">Relationship</Label>
              <Select 
                value={currentContact.relationship} 
                onValueChange={(value) => setCurrentContact(prev => ({ ...prev, relationship: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  {relationships.map(rel => (
                    <SelectItem key={rel} value={rel}>{rel}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact-phone">Phone Number *</Label>
              <Input
                id="contact-phone"
                type="tel"
                value={currentContact.phone}
                onChange={(e) => setCurrentContact(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="contact-email">Email Address</Label>
              <Input
                id="contact-email"
                type="email"
                value={currentContact.email}
                onChange={(e) => setCurrentContact(prev => ({ ...prev, email: e.target.value }))}
                placeholder="contact@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Notification Preferences</Label>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="notify-updates"
                checked={currentContact.notifyOnUpdates}
                onCheckedChange={(checked) => 
                  setCurrentContact(prev => ({ ...prev, notifyOnUpdates: checked as boolean }))
                }
              />
              <Label htmlFor="notify-updates" className="text-sm">
                Notify on wait time updates
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="notify-completion"
                checked={currentContact.notifyOnCompletion}
                onCheckedChange={(checked) => 
                  setCurrentContact(prev => ({ ...prev, notifyOnCompletion: checked as boolean }))
                }
              />
              <Label htmlFor="notify-completion" className="text-sm">
                Notify when appointment is complete
              </Label>
            </div>
          </div>

          <Button onClick={addContact} className="w-full">
            Add Emergency Contact
          </Button>
        </CardContent>
      </Card>

      {/* Emergency Contacts List */}
      {contacts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Emergency Contacts ({contacts.length})</span>
              <Button onClick={sendAlerts} disabled={alertsSent} className="gap-2">
                <Send className="h-4 w-4" />
                {alertsSent ? 'Alerts Sent' : 'Send Alerts'}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{contact.name}</h4>
                      {contact.relationship && (
                        <Badge variant="outline">{contact.relationship}</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {contact.phone}
                      </div>
                      {contact.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {contact.email}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 mt-2">
                      {contact.notifyOnUpdates && (
                        <Badge variant="secondary" className="text-xs">Updates</Badge>
                      )}
                      {contact.notifyOnCompletion && (
                        <Badge variant="secondary" className="text-xs">Completion</Badge>
                      )}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeContact(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notification Preview */}
      {contacts.length > 0 && (
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Mail className="h-5 w-5" />
              Notification Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-white/70 rounded-lg">
              <p className="text-sm text-gray-700">
                {getNotificationPreview()}
              </p>
            </div>
            <p className="text-xs text-blue-700 mt-2">
              This is how your emergency contacts will be notified about your status.
            </p>
          </CardContent>
        </Card>
      )}

      {alertsSent && (
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800">Alerts Sent Successfully</h3>
              <p className="text-sm text-green-700 mt-1">
                Your emergency contacts have been notified of your current status.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};