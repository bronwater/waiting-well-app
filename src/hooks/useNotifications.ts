import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsSupported('Notification' in window);
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (!isSupported) {
      toast({
        title: "Notifications not supported",
        description: "Your browser doesn't support notifications",
        variant: "destructive",
      });
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      if (result === 'granted') {
        toast({
          title: "Notifications enabled",
          description: "You'll receive updates about your wait time",
        });
        return true;
      } else {
        toast({
          title: "Notifications disabled",
          description: "You won't receive wait time updates",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  };

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if (permission === 'granted' && isSupported) {
      new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options,
      });
    }
  };

  const sendWaitTimeUpdate = (currentWaitTime: number, position: number) => {
    const title = position <= 3 
      ? "Your turn is coming soon!" 
      : "Wait time update";
    
    const body = position <= 3
      ? `You're #${position} in line. Please prepare to be called.`
      : `Current wait time: ${currentWaitTime} minutes. You're #${position} in line.`;

    sendNotification(title, {
      body,
      tag: 'wait-time-update',
      requireInteraction: position <= 3,
    });
  };

  return {
    permission,
    isSupported,
    requestPermission,
    sendNotification,
    sendWaitTimeUpdate,
  };
};