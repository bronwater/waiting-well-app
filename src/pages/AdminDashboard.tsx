import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  Activity,
  UserCheck,
  Timer,
  Hospital
} from "lucide-react";
import { useRealTimeQueue } from "@/hooks/useRealTimeQueue";

export default function AdminDashboard() {
  const { queueData } = useRealTimeQueue();
  const [selectedTimeframe, setSelectedTimeframe] = useState("today");

  const analyticsData = {
    today: {
      totalPatients: 156,
      avgWaitTime: "32 min",
      completedTreatments: 89,
      criticalCases: 12,
      efficiency: 85
    },
    week: {
      totalPatients: 1240,
      avgWaitTime: "28 min", 
      completedTreatments: 987,
      criticalCases: 53,
      efficiency: 88
    },
    month: {
      totalPatients: 4890,
      avgWaitTime: "31 min",
      completedTreatments: 4234,
      criticalCases: 231,
      efficiency: 86
    }
  };

  const currentData = analyticsData[selectedTimeframe as keyof typeof analyticsData];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">UrgencyTrack Management Portal</p>
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              <Activity className="h-4 w-4 mr-1" />
              Live
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={selectedTimeframe} onValueChange={setSelectedTimeframe} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentData.totalPatients}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Wait Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentData.avgWaitTime}</div>
              <p className="text-xs text-muted-foreground">
                -8% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentData.completedTreatments}</div>
              <p className="text-xs text-muted-foreground">
                +5% from last period
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critical Cases</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{currentData.criticalCases}</div>
              <p className="text-xs text-muted-foreground">
                Requires immediate attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Queue Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hospital className="h-5 w-5" />
                Current Queue Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Emergency</span>
                  <Badge variant="destructive">{queueData.emergency} patients</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Urgent</span>
                  <Badge variant="secondary">{queueData.urgent} patients</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Standard</span>
                  <Badge variant="outline">{queueData.standard} patients</Badge>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">Total in Queue:</span>
                    <span className="font-bold">{queueData.total} patients</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Efficiency Rate</span>
                  <Badge variant="default">{currentData.efficiency}%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Staff Utilization</span>
                  <Badge variant="secondary">92%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Patient Satisfaction</span>
                  <Badge variant="default">4.2/5</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Response Time</span>
                  <Badge variant="outline">3.2 min</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Timer className="h-6 w-6" />
                <span>Adjust Wait Times</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <AlertTriangle className="h-6 w-6" />
                <span>Emergency Alert</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Users className="h-6 w-6" />
                <span>Staff Management</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}