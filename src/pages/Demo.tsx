import { useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Clock, Upload, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { FileUpload, type AnalysisResult } from "@/components/FileUpload";
import { RoleSelector, type UserRole } from "@/components/RoleSelector";
import { FileContentDisplay } from "@/components/FileContentDisplay";
import { Chatbot } from "@/components/Chatbot";

const Demo = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin");
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const handleFileAnalyzed = (result: AnalysisResult) => {
    setCurrentAnalysis(result);
    setShowUpload(false);
  };

  const handleReload = () => {
    setCurrentAnalysis(null); // Clear current analysis
    setShowUpload(true);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 space-y-8">
        {/* Simple Header */}
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-3xl font-bold">
            File Security Analysis
          </h2>
          <p className="text-muted-foreground">
            Upload a file to test our AI-powered security analysis
          </p>
        </div>

        {/* Role Selector */}
        <div className="max-w-md mx-auto">
          <RoleSelector selectedRole={selectedRole} onRoleChange={setSelectedRole} />
        </div>

        {/* File Upload - Only show when needed */}
        {showUpload && (
          <div className="max-w-2xl mx-auto">
            <FileUpload onFileAnalyzed={handleFileAnalyzed} />
          </div>
        )}

        {/* Analysis Results */}
        {currentAnalysis && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* File Status Header */}
            <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                {currentAnalysis.status === "approved" ? (
                  <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-1" />
                ) : currentAnalysis.status === "blocked" ? (
                  <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-lg truncate">{currentAnalysis.fileName}</h4>
                      <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {currentAnalysis.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant={
                          currentAnalysis.status === "approved" ? "default" 
                          : currentAnalysis.status === "blocked" ? "destructive" 
                          : "secondary"
                        }
                        className="flex-shrink-0"
                      >
                        {currentAnalysis.status.toUpperCase()}
                      </Badge>
                      <Button variant="outline" size="sm" onClick={handleReload}>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload New
                      </Button>
                    </div>
                  </div>

                  {currentAnalysis.status === "approved" && (
                    <p className="text-sm text-success">
                      ✓ Embeddings stored in vector database
                    </p>
                  )}
                </div>
              </div>
            </Card>

            {/* File Contents */}
            <FileContentDisplay 
              content={currentAnalysis.content} 
              suspiciousPatterns={currentAnalysis.suspiciousPatterns}
              userRole={selectedRole}
              fileName={currentAnalysis.fileName}
              fileType={currentAnalysis.fileType}
              imageData={currentAnalysis.imageData}
            />

            {/* Chatbot */}
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <Chatbot 
                key={`${currentAnalysis.fileName}-${currentAnalysis.timestamp.getTime()}`}
                userRole={selectedRole} 
                fileName={currentAnalysis.fileName} 
              />
            </Card>

            {/* Detected Threats - Collapsible */}
            {currentAnalysis.threats.length > 0 && (
              <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                <Collapsible>
                  <CollapsibleTrigger className="w-full">
                    <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-smooth">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                        <div>
                          <h4 className="font-semibold">Detected Threats</h4>
                          <p className="text-xs text-muted-foreground">
                            {currentAnalysis.threats.length} threat{currentAnalysis.threats.length !== 1 ? "s" : ""} found
                          </p>
                        </div>
                      </div>
                      <Badge variant="destructive" className="ml-4">
                        {currentAnalysis.threats.length} Threats
                      </Badge>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 pb-4 space-y-2">
                      {currentAnalysis.threats.map((threat, i) => (
                        <div 
                          key={i}
                          className="flex items-center gap-2 text-sm bg-destructive/10 border border-destructive/20 rounded px-3 py-2"
                        >
                          <AlertTriangle className="w-3 h-3 text-destructive flex-shrink-0" />
                          <span className="text-foreground">{threat}</span>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            )}
          </div>
        )}

        {/* Simple Instructions - Only show when no file is analyzed */}
        {!currentAnalysis && !showUpload && (
          <div className="max-w-md mx-auto text-center">
            <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-lg p-6">
              <h3 className="font-semibold mb-2">How it works</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Choose your role, upload a file, and see the security analysis results with detected threats highlighted.
              </p>
              <Button onClick={handleReload} className="w-full">
                <FileText className="w-4 h-4 mr-2" />
                Start Analysis
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Demo;