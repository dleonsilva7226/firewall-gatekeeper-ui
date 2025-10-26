import { useState } from "react";
import { Flame } from "lucide-react";
import { FileUpload, type AnalysisResult } from "@/components/FileUpload";
import { RoleSelector, type UserRole } from "@/components/RoleSelector";
import { AnalysisResults } from "@/components/AnalysisResults";
import { StatsOverview } from "@/components/StatsOverview";

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin");
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);

  const handleFileAnalyzed = (result: AnalysisResult) => {
    setAnalysisResults(prev => [result, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/50 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-fire">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-fire bg-clip-text text-transparent">
                Prometheus
              </h1>
              <p className="text-sm text-muted-foreground">
                Agentic Firewall Security Platform
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold">
            Secure Your Vector Database
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced AI-powered firewall that screens embeddings for prompt injection, 
            jailbreaking, and obfuscation before storage
          </p>
        </div>

        {/* Role Selector */}
        <RoleSelector selectedRole={selectedRole} onRoleChange={setSelectedRole} />

        {/* Stats Overview */}
        {analysisResults.length > 0 && (
          <StatsOverview results={analysisResults} />
        )}

        {/* File Upload */}
        <FileUpload onFileAnalyzed={handleFileAnalyzed} />

        {/* Analysis Results */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">Analysis History</h3>
          <AnalysisResults results={analysisResults} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20 py-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>Prometheus - Protecting your data with the fire of intelligence</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
