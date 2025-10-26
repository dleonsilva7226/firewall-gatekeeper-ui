import { AlertTriangle, FileText, Image as ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Chatbot } from "@/components/Chatbot";
import type { UserRole } from "@/components/RoleSelector";

interface FileContentDisplayProps {
  content: string;
  suspiciousPatterns: Array<{
    text: string;
    reason: string;
    startIndex: number;
    endIndex: number;
  }>;
  userRole: UserRole;
  fileName: string;
  fileType: string;
  imageData?: string;
}

export const FileContentDisplay = ({ content, suspiciousPatterns, userRole, fileName, fileType, imageData }: FileContentDisplayProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const renderHighlightedContent = () => {
    if (suspiciousPatterns.length === 0) {
      return <div className="whitespace-pre-wrap text-foreground font-mono text-sm">{content}</div>;
    }

    // Sort patterns by start index
    const sortedPatterns = [...suspiciousPatterns].sort((a, b) => a.startIndex - b.startIndex);
    
    const elements: JSX.Element[] = [];
    let lastIndex = 0;

    sortedPatterns.forEach((pattern, idx) => {
      // Add text before the pattern
      if (pattern.startIndex > lastIndex) {
        elements.push(
          <span key={`text-${idx}`} className="text-foreground">
            {content.substring(lastIndex, pattern.startIndex)}
          </span>
        );
      }

      // Add highlighted pattern
      elements.push(
        <span
          key={`pattern-${idx}`}
          className="bg-destructive/20 text-destructive border-b-2 border-destructive font-semibold relative group cursor-help"
          title={pattern.reason}
        >
          {pattern.text}
          <span className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-10 w-64 p-2 bg-destructive text-destructive-foreground text-xs rounded shadow-lg">
            <AlertTriangle className="w-3 h-3 inline mr-1" />
            {pattern.reason}
          </span>
        </span>
      );

      lastIndex = pattern.endIndex;
    });

    // Add remaining text
    if (lastIndex < content.length) {
      elements.push(
        <span key="text-end" className="text-foreground">
          {content.substring(lastIndex)}
        </span>
      );
    }

    return <div className="whitespace-pre-wrap font-mono text-sm">{elements}</div>;
  };

  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden">
      <div 
        className="p-4 border-b border-border flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-smooth"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          {fileType.startsWith('image/') ? (
            <ImageIcon className="w-5 h-5 text-primary" />
          ) : (
            <FileText className="w-5 h-5 text-primary" />
          )}
          <div>
            <h4 className="font-semibold">
              {fileType.startsWith('image/') ? 'Image Preview' : 'File Contents'}
            </h4>
            <p className="text-xs text-muted-foreground">
              {fileType.startsWith('image/') 
                ? 'Image analysis results' 
                : `${suspiciousPatterns.length} suspicious pattern${suspiciousPatterns.length !== 1 ? "s" : ""} detected`
              }
            </p>
          </div>
        </div>
        <Badge variant={suspiciousPatterns.length > 0 ? "destructive" : "default"}>
          {suspiciousPatterns.length > 0 ? "Threats Found" : "Clean"}
        </Badge>
      </div>
      
      {isExpanded && (
        <div className="p-6">
          {suspiciousPatterns.length > 0 && !fileType.startsWith('image/') && (
            <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <div className="flex items-start gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-destructive mb-2">
                    Highlighted sections contain security threats
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Hover over red text to see threat details
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {fileType.startsWith('image/') && imageData ? (
            <div className="space-y-4">
              <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                <img 
                  src={imageData} 
                  alt={fileName}
                  className="max-w-full h-auto max-h-96 mx-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="bg-secondary/50 rounded-lg p-4 max-h-96 overflow-auto border border-border">
                <div className="whitespace-pre-wrap text-foreground font-mono text-sm">{content}</div>
              </div>
            </div>
          ) : (
            <div className="bg-secondary/50 rounded-lg p-4 max-h-96 overflow-auto border border-border">
              {renderHighlightedContent()}
            </div>
          )}
        </div>
      )}

      {/* Chatbot */}
      <Chatbot userRole={userRole} fileName={fileName} />
    </Card>
  );
};
