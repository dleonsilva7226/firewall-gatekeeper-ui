import { Shield, CheckCircle2, XCircle, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { AnalysisResult } from "./FileUpload";

interface StatsOverviewProps {
  results: AnalysisResult[];
}

export const StatsOverview = ({ results }: StatsOverviewProps) => {
  const total = results.length;
  const approved = results.filter(r => r.status === "approved").length;
  const blocked = results.filter(r => r.status === "blocked").length;
  const warnings = results.filter(r => r.status === "warning").length;
  const avgScore = total > 0 
    ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / total) 
    : 0;

  const stats = [
    { 
      label: "Total Analyzed", 
      value: total, 
      icon: Activity, 
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    { 
      label: "Approved", 
      value: approved, 
      icon: CheckCircle2, 
      color: "text-success",
      bgColor: "bg-success/10"
    },
    { 
      label: "Blocked", 
      value: blocked, 
      icon: XCircle, 
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    },
    { 
      label: "Avg Score", 
      value: `${avgScore}%`, 
      icon: Shield, 
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={stat.label} 
            className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm transition-smooth hover:shadow-glow hover:border-primary/40"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
