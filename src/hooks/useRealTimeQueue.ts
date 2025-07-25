import { useState, useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNotifications } from './useNotifications';

interface QueueData {
  patientId: string;
  position: number;
  estimatedWaitTime: number;
  totalPatients: number;
  queueStatus: 'waiting' | 'called' | 'in-treatment' | 'completed';
  lastUpdated: Date;
  urgencyLevel: 'low' | 'medium' | 'high';
  departmentLoad: number; // 0-100 percentage
  emergency: number;
  urgent: number;
  standard: number;
  total: number;
}

interface HospitalUpdate {
  type: 'position_change' | 'wait_time_update' | 'queue_movement' | 'department_status' | 'emergency_alert';
  data: Partial<QueueData>;
  message?: string;
  timestamp: Date;
}

export const useRealTimeQueue = (patientId: string = 'patient-001') => {
  const [queueData, setQueueData] = useState<QueueData>({
    patientId,
    position: 8,
    estimatedWaitTime: 45,
    totalPatients: 23,
    queueStatus: 'waiting',
    lastUpdated: new Date(),
    urgencyLevel: 'medium',
    departmentLoad: 75,
    emergency: 4,
    urgent: 8,
    standard: 11,
    total: 23,
  });
  
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  const wsRef = useRef<WebSocket | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  const { sendWaitTimeUpdate } = useNotifications();

  // Simulate hospital queue management system data
  const generateHospitalUpdate = (): HospitalUpdate => {
    const updateTypes: HospitalUpdate['type'][] = [
      'position_change', 'wait_time_update', 'queue_movement', 'department_status'
    ];
    
    const randomType = updateTypes[Math.floor(Math.random() * updateTypes.length)];
    const timestamp = new Date();
    
    switch (randomType) {
      case 'position_change':
        return {
          type: 'position_change',
          data: {
            position: Math.max(1, queueData.position - (Math.random() < 0.3 ? 1 : 0)),
            lastUpdated: timestamp,
          },
          message: 'Your position in the queue has been updated',
          timestamp,
        };
        
      case 'wait_time_update':
        const timeVariation = Math.floor(Math.random() * 20) - 10; // ±10 minutes
        return {
          type: 'wait_time_update',
          data: {
            estimatedWaitTime: Math.max(10, queueData.estimatedWaitTime + timeVariation),
            lastUpdated: timestamp,
          },
          message: 'Wait time estimate has been updated',
          timestamp,
        };
        
      case 'queue_movement':
        return {
          type: 'queue_movement',
          data: {
            totalPatients: Math.max(queueData.position, queueData.totalPatients + Math.floor(Math.random() * 6) - 3),
            lastUpdated: timestamp,
          },
          message: 'Queue movement detected',
          timestamp,
        };
        
      case 'department_status':
        return {
          type: 'department_status',
          data: {
            departmentLoad: Math.max(30, Math.min(100, queueData.departmentLoad + Math.floor(Math.random() * 20) - 10)),
            lastUpdated: timestamp,
          },
          message: 'Department status updated',
          timestamp,
        };
        
      default:
        return {
          type: 'wait_time_update',
          data: { lastUpdated: timestamp },
          timestamp,
        };
    }
  };

  // Simulate WebSocket connection to hospital system
  const connectToHospital = () => {
    setConnectionStatus('connecting');
    
    // Simulate connection delay
    setTimeout(() => {
      setIsConnected(true);
      setConnectionStatus('connected');
      
      toast({
        title: "Connected to Hospital System",
        description: "You'll receive real-time updates about your queue position.",
      });

      // Start polling for updates (simulating WebSocket messages)
      intervalRef.current = setInterval(() => {
        const update = generateHospitalUpdate();
        handleHospitalUpdate(update);
      }, 15000); // Update every 15 seconds
      
    }, 2000);
  };

  const handleHospitalUpdate = (update: HospitalUpdate) => {
    setQueueData(prev => {
      const newData = { ...prev, ...update.data };
      
      // Send notification if position changed significantly
      if (update.type === 'position_change' && newData.position <= 3 && prev.position > 3) {
        sendWaitTimeUpdate(newData.estimatedWaitTime, newData.position);
        toast({
          title: "You're almost there!",
          description: `You're now #${newData.position} in line. Please prepare to be called.`,
        });
      } else if (update.type === 'wait_time_update' && Math.abs(newData.estimatedWaitTime - prev.estimatedWaitTime) >= 10) {
        toast({
          title: "Wait Time Updated",
          description: `New estimated wait time: ${newData.estimatedWaitTime} minutes`,
        });
      }
      
      return newData;
    });
  };

  const disconnect = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setIsConnected(false);
    setConnectionStatus('disconnected');
    
    toast({
      title: "Disconnected from Hospital System",
      description: "Manual refresh may be needed for updates.",
      variant: "destructive",
    });
  };

  // Manual refresh function
  const refreshData = () => {
    const update = generateHospitalUpdate();
    handleHospitalUpdate(update);
    
    toast({
      title: "Data Refreshed",
      description: "Queue information has been updated manually.",
    });
  };

  // Auto-connect on mount
  useEffect(() => {
    connectToHospital();
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Simulate staff actions (for demo purposes)
  const simulateStaffAction = (action: 'call_next' | 'emergency' | 'delay') => {
    let update: HospitalUpdate;
    
    switch (action) {
      case 'call_next':
        update = {
          type: 'position_change',
          data: {
            position: Math.max(1, queueData.position - 1),
            lastUpdated: new Date(),
          },
          message: 'A patient has been called',
          timestamp: new Date(),
        };
        break;
        
      case 'emergency':
        update = {
          type: 'emergency_alert',
          data: {
            estimatedWaitTime: queueData.estimatedWaitTime + 20,
            departmentLoad: Math.min(100, queueData.departmentLoad + 15),
            lastUpdated: new Date(),
          },
          message: 'Emergency case - wait times may be extended',
          timestamp: new Date(),
        };
        break;
        
      case 'delay':
        update = {
          type: 'wait_time_update',
          data: {
            estimatedWaitTime: queueData.estimatedWaitTime + 15,
            lastUpdated: new Date(),
          },
          message: 'Unexpected delay - wait time increased',
          timestamp: new Date(),
        };
        break;
        
      default:
        return;
    }
    
    handleHospitalUpdate(update);
  };

  return {
    queueData,
    isConnected,
    connectionStatus,
    connectToHospital,
    disconnect,
    refreshData,
    simulateStaffAction, // For demo purposes
  };
};