import { useState, useEffect } from "react";
import { Activity, Shield, AlertTriangle, TrendingUp, Clock, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface DashboardMetrics {
  latency: number;
  accuracy: number;
  threatSpikes: number;
  totalRequests: number;
  blockedRequests: number;
  approvedRequests: number;
}

interface ObservabilityData {
  timestamp: string;
  requests: number;
  threats: number;
  latency: number;
  accuracy: number;
}

const Dashboard = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    latency: 0,
    accuracy: 0,
    threatSpikes: 0,
    totalRequests: 0,
    blockedRequests: 0,
    approvedRequests: 0,
  });

  const [observabilityData, setObservabilityData] = useState<ObservabilityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data generation - replace with actual API calls
  useEffect(() => {
    const fetchMetrics = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock metrics data
      setMetrics({
        latency: Math.floor(Math.random() * 200) + 50, // 50-250ms
        accuracy: Math.floor(Math.random() * 20) + 80, // 80-100%
        threatSpikes: Math.floor(Math.random() * 15) + 5, // 5-20 spikes
        totalRequests: Math.floor(Math.random() * 10000) + 5000, // 5k-15k
        blockedRequests: Math.floor(Math.random() * 1000) + 200, // 200-1200
        approvedRequests: Math.floor(Math.random() * 9000) + 4000, // 4k-13k
      });

      // Mock observability data for the last 24 hours
      const mockData: ObservabilityData[] = [];
      const now = new Date();
      for (let i = 23; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - i * 60 * 60 * 1000);
        mockData.push({
          timestamp: timestamp.toISOString().slice(11, 16), // HH:MM format
          requests: Math.floor(Math.random() * 100) + 50,
          threats: Math.floor(Math.random() * 20) + 5,
          latency: Math.floor(Math.random() * 100) + 50,
          accuracy: Math.floor(Math.random() * 15) + 85,
        });
      }
      setObservabilityData(mockData);
      
      setIsLoading(false);
    };

    fetchMetrics();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  const metricCards = [
    {
      title: "Response Time",
      value: `${metrics.latency}ms`,
      icon: Clock,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      description: "Average response time"
    },
    {
      title: "Detection Accuracy",
      value: `${metrics.accuracy}%`,
      icon: Shield,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      description: "Threat detection accuracy"
    },
    {
      title: "Active Threats",
      value: metrics.threatSpikes,
      icon: AlertTriangle,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      description: "Threats detected today"
    },
    {
      title: "Total Requests",
      value: metrics.totalRequests.toLocaleString(),
      icon: Activity,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      description: "Files processed today"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Simple Header */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold">VecSec Dashboard</h1>
          <p className="text-muted-foreground">Real-time monitoring of your AI firewall</p>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricCards.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card 
                key={metric.title}
                className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm transition-smooth hover:shadow-glow hover:border-primary/40"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                    <Icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {isLoading ? (
                      <div className="animate-pulse bg-muted h-8 w-20 rounded" />
                    ) : (
                      metric.value
                    )}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Simplified Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Request Volume Chart */}
          <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Request Volume (24h)</h3>
              <p className="text-sm text-muted-foreground">Files processed over time</p>
            </div>
            <div className="h-64">
              {isLoading ? (
                <div className="animate-pulse bg-muted h-full rounded" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={observabilityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                    <XAxis 
                      dataKey="timestamp" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="requests" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>

          {/* Threat Detection Chart */}
          <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Threat Detection (24h)</h3>
              <p className="text-sm text-muted-foreground">Threats blocked over time</p>
            </div>
            <div className="h-64">
              {isLoading ? (
                <div className="animate-pulse bg-muted h-full rounded" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={observabilityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                    <XAxis 
                      dataKey="timestamp" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar 
                      dataKey="threats" 
                      fill="hsl(var(--destructive))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Shield className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold">Security Status</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Files Blocked</span>
                <span className="font-semibold text-destructive">{metrics.blockedRequests.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Files Approved</span>
                <span className="font-semibold text-success">{metrics.approvedRequests.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Block Rate</span>
                <span className="font-semibold">
                  {metrics.totalRequests > 0 
                    ? ((metrics.blockedRequests / metrics.totalRequests) * 100).toFixed(1)
                    : 0
                  }%
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Zap className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold">Performance</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg Response Time</span>
                <span className="font-semibold">{metrics.latency}ms</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Detection Accuracy</span>
                <span className="font-semibold text-green-500">{metrics.accuracy}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">System Uptime</span>
                <span className="font-semibold text-green-500">99.9%</span>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
