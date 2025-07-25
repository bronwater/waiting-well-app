import { Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNotifications } from '@/hooks/useNotifications';
import { useTranslation } from '@/hooks/useTranslation';

export const NotificationSettings = () => {
  const { permission, isSupported, requestPermission } = useNotifications();
  const { t } = useTranslation();

  if (!isSupported) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          {t('notifications.title')}
        </CardTitle>
        <CardDescription>
          {t('notifications.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={requestPermission}
          variant={permission === 'granted' ? 'secondary' : 'default'}
          className="w-full gap-2"
          disabled={permission === 'granted'}
        >
          {permission === 'granted' ? (
            <>
              <Bell className="h-4 w-4" />
              {t('notifications.enable')}d
            </>
          ) : (
            <>
              <BellOff className="h-4 w-4" />
              {t('notifications.enable')}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};