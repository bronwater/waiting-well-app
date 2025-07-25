import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Activity, 
  Clock, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Radio
} from 'lucide-react';
import { useRealTimeQueue } from '@/hooks/useRealTimeQueue';
import { useTranslation } from '@/hooks/useTranslation';

export const RealTimeMonitor = () => {
  const { t } = useTranslation();
  const {
    queueData,
    isConnected,
    connectionStatus,
    connectToHospital,
    disconnect,
    refreshData,
    simulateStaffAction,
  } = useRealTimeQueue();

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Wifi className="h-4 w-4 text-green-600" />;
      case 'connecting':
        return <RefreshCw className="h-4 w-4 text-yellow-600 animate-spin" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <WifiOff className="h-4 w-4 text-gray-400" />;
    }
  };

  const getConnectionStatus = () => {
    switch (connectionStatus) {
      case 'connected':
        return { text: 'Connected to Hospital System', variant: 'default' as const };
      case 'connecting':
        return { text: 'Connecting...', variant: 'secondary' as const };
      case 'error':
        return { text: 'Connection Error', variant: 'destructive' as const };
      default:
        return { text: 'Disconnected', variant: 'outline' as const };
    }
  };

  const getDepartmentStatus = () => {
    if (queueData.departmentLoad < 50) return { text: 'Low Activity', color: 'text-green-600' };
    if (queueData.departmentLoad < 80) return { text: 'Moderate Activity', color: 'text-yellow-600' };
    return { text: 'High Activity', color: 'text-red-600' };
  };

  const status = getConnectionStatus();
  const deptStatus = getDepartmentStatus();

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="h-5 w-5 text-primary" />
              Real-Time Queue Monitor
            </div>
            <Badge variant={status.variant} className="gap-1">
              {getConnectionIcon()}
              {status.text}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {isConnected ? (
              <>
                <Button onClick={disconnect} variant="outline" size="sm">
                  <WifiOff className="h-4 w-4 mr-2" />
                  Disconnect
                </Button>
                <Button onClick={refreshData} variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </>
            ) : (
              <Button onClick={connectToHospital} size="sm">
                <Wifi className="h-4 w-4 mr-2" />
                Connect to Hospital
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Live Queue Data */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Activity className="h-5 w-5" />
            Live Queue Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">#{queueData.position}</div>
              <div className="text-sm text-blue-700">Your Position</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{queueData.estimatedWaitTime}m</div>
              <div className="text-sm text-blue-700">Wait Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{queueData.totalPatients}</div>
              <div className="text-sm text-blue-700">Total Patients</div>
            </div>
            <div className="text-center">
              <Badge variant={queueData.urgencyLevel === 'high' ? 'destructive' : 
                             queueData.urgencyLevel === 'medium' ? 'default' : 'secondary'}>
                {queueData.urgencyLevel.toUpperCase()}
              </Badge>
              <div className="text-sm text-blue-700 mt-1">Priority</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-blue-700">Department Load</span>
              <span className={`font-medium ${deptStatus.color}`}>
                {deptStatus.text} ({queueData.departmentLoad}%)
              </span>
            </div>
            <Progress value={queueData.departmentLoad} className="h-2" />
          </div>

          <div className="text-xs text-blue-600">
            Last updated: {queueData.lastUpdated.toLocaleTimeString()}
            {isConnected && <span className="ml-2">🔄 Auto-updating</span>}
          </div>
        </CardContent>
      </Card>

      {/* Patient Flow Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Patient Flow Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">Queue Status</span>
              </div>
              <Badge variant="outline" className="capitalize">
                {queueData.queueStatus.replace('_', ' ')}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Average Processing Time</span>
              </div>
              <span className="font-semibold">12-15 minutes</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <Activity className="h-4 w-4 text-purple-500" />
                <span className="font-medium">Active Treatment Rooms</span>
              </div>
              <span className="font-semibold">8 of 12</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Demo Controls */}
      <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-700">
            <RefreshCw className="h-5 w-5" />
            Demo Controls
            <Badge variant="outline" className="text-xs">For Testing</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            <Button 
              onClick={() => simulateStaffAction('call_next')} 
              variant="outline" 
              size="sm"
              className="gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Call Next
            </Button>
            <Button 
              onClick={() => simulateStaffAction('emergency')} 
              variant="outline" 
              size="sm"
              className="gap-2"
            >
              <AlertTriangle className="h-4 w-4" />
              Emergency
            </Button>
            <Button 
              onClick={() => simulateStaffAction('delay')} 
              variant="outline" 
              size="sm"
              className="gap-2"
            >
              <Clock className="h-4 w-4" />
              Add Delay
            </Button>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            These controls simulate hospital staff actions affecting the queue.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};