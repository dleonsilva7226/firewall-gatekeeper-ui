import { CheckCircle2, XCircle, AlertTriangle, Shield, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileContentDisplay } from "./FileContentDisplay";
import type { AnalysisResult } from "./FileUpload";
import type { UserRole } from "./RoleSelector";

interface AnalysisResultsProps {
  results: AnalysisResult[];
  userRole: UserRole;
}

export const AnalysisResults = ({ results, userRole }: AnalysisResultsProps) => {
  if (results.length === 0) {
    return (
      <Card className="p-12 border-primary/20 bg-card/50 backdrop-blur-sm text-center">
        <Shield className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground">No files analyzed yet</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result, index) => {
        const StatusIcon = 
          result.status === "approved" ? CheckCircle2 
          : result.status === "blocked" ? XCircle 
          : AlertTriangle;
        
        const statusColor = 
          result.status === "approved" ? "text-success" 
          : result.status === "blocked" ? "text-destructive" 
          : "text-accent";
        
        const borderColor = 
          result.status === "approved" ? "border-success/50" 
          : result.status === "blocked" ? "border-destructive/50" 
          : "border-accent/50";

        return (
          <Card 
            key={index} 
            className={`p-6 border-2 ${borderColor} bg-card/50 backdrop-blur-sm transition-smooth hover:shadow-lg`}
          >
            <div className="flex items-start gap-4">
              <StatusIcon className={`w-6 h-6 ${statusColor} flex-shrink-0 mt-1`} />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-lg truncate">{result.fileName}</h4>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {result.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  
                  <Badge 
                    variant={
                      result.status === "approved" ? "default" 
                      : result.status === "blocked" ? "destructive" 
                      : "secondary"
                    }
                    className="flex-shrink-0"
                  >
                    {result.status.toUpperCase()}
                  </Badge>
                </div>


                {result.threats.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Detected Threats:</p>
                    <div className="space-y-1">
                      {result.threats.map((threat, i) => (
                        <div 
                          key={i}
                          className="flex items-center gap-2 text-sm bg-destructive/10 border border-destructive/20 rounded px-3 py-1.5"
                        >
                          <AlertTriangle className="w-3 h-3 text-destructive flex-shrink-0" />
                          <span className="text-foreground">{threat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.status === "approved" && (
                  <p className="text-sm text-success mt-2">
                    ✓ Embeddings stored in vector database
                  </p>
                )}
              </div>
            </div>
            
            {/* File Content Display */}
            <div className="mt-4">
              <FileContentDisplay 
                content={result.content} 
                suspiciousPatterns={result.suspiciousPatterns}
                userRole={userRole}
                fileName={result.fileName}
                fileType={result.fileType}
                imageData={result.imageData}
              />
            </div>
          </Card>
        );
      })}
    </div>
  );
};
