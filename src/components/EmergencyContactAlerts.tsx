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
    { key: 'emergency.relationshipSpouse', value: 'Spouse/Partner' },
    { key: 'emergency.relationshipParent', value: 'Parent' },
    { key: 'emergency.relationshipChild', value: 'Child' },
    { key: 'emergency.relationshipSibling', value: 'Sibling' },
    { key: 'emergency.relationshipFamily', value: 'Other Family' },
    { key: 'emergency.relationshipFriend', value: 'Friend' },
    { key: 'emergency.relationshipCaregiver', value: 'Caregiver' },
    { key: 'emergency.relationshipOther', value: 'Other' }
  ];

  const addContact = () => {
    if (!currentContact.name || !currentContact.phone) {
      toast({
        title: t('emergency.missingInfoTitle'),
        description: t('emergency.missingInfoDescription'),
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
      title: t('emergency.contactAddedTitle'),
      description: `${currentContact.name} ${t('emergency.contactAddedDescription')}`,
    });
  };

  const removeContact = (index: number) => {
    setContacts(prev => prev.filter((_, i) => i !== index));
    toast({
      title: t('emergency.contactRemovedTitle'),
      description: t('emergency.contactRemovedDescription'),
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
      title: t('emergency.alertsSentTitle'),
      description: `${t('emergency.alertsSentDescription')} ${contacts.length} ${t('emergency.alertsSentDescriptionEnd')}`,
    });
  };

  const getNotificationPreview = () => {
    return t('emergency.notificationMessage');
  };

  return (
    <div className="space-y-6">
      {/* Add Emergency Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            {t('emergencyContact.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact-name">{t('emergency.fullName')}</Label>
              <Input
                id="contact-name"
                value={currentContact.name}
                onChange={(e) => setCurrentContact(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter contact name"
              />
            </div>
            <div>
              <Label htmlFor="relationship">{t('emergency.relationship')}</Label>
              <Select 
                value={currentContact.relationship} 
                onValueChange={(value) => setCurrentContact(prev => ({ ...prev, relationship: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('emergency.selectRelationship')} />
                </SelectTrigger>
                <SelectContent>
                  {relationships.map(rel => (
                    <SelectItem key={rel.value} value={rel.value}>{t(rel.key)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact-phone">{t('emergency.phoneNumber')}</Label>
              <Input
                id="contact-phone"
                type="tel"
                value={currentContact.phone}
                onChange={(e) => setCurrentContact(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="contact-email">{t('emergency.emailAddress')}</Label>
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
            <Label>{t('emergency.notificationPreferences')}</Label>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="notify-updates"
                checked={currentContact.notifyOnUpdates}
                onCheckedChange={(checked) => 
                  setCurrentContact(prev => ({ ...prev, notifyOnUpdates: checked as boolean }))
                }
              />
              <Label htmlFor="notify-updates" className="text-sm">
                {t('emergency.notifyUpdates')}
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
                {t('emergency.notifyCompletion')}
              </Label>
            </div>
          </div>

          <Button onClick={addContact} className="w-full">
            {t('emergency.addContact')}
          </Button>
        </CardContent>
      </Card>

      {/* Emergency Contacts List */}
      {contacts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{t('emergency.contactsList')} ({contacts.length})</span>
              <Button onClick={sendAlerts} disabled={alertsSent} className="gap-2">
                <Send className="h-4 w-4" />
                {alertsSent ? t('emergency.alertsSent') : t('emergency.sendAlerts')}
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
                        <Badge variant="secondary" className="text-xs">{t('emergency.updates')}</Badge>
                      )}
                      {contact.notifyOnCompletion && (
                        <Badge variant="secondary" className="text-xs">{t('emergency.completion')}</Badge>
                      )}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeContact(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    {t('emergency.remove')}
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
              {t('emergency.notificationPreview')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-white/70 rounded-lg">
              <p className="text-sm text-gray-700">
                {getNotificationPreview()}
              </p>
            </div>
            <p className="text-xs text-blue-700 mt-2">
              {t('emergency.previewDescription')}
            </p>
          </CardContent>
        </Card>
      )}

      {alertsSent && (
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-green-800">{t('emergency.alertsSuccessTitle')}</h3>
              <p className="text-sm text-green-700 mt-1">
                {t('emergency.alertsSuccessDescription')}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};