import { Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { JavaneseCalendarResult } from '@/lib/javanese-calendar';
import { useToast } from '@/hooks/use-toast';

interface ResultCardProps {
  result: JavaneseCalendarResult | null;
  isLoading?: boolean;
}

export const ResultCard = ({ result, isLoading = false }: ResultCardProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    if (!result) return;
    
    try {
      await navigator.clipboard.writeText(result.formatted);
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Javanese date has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl border bg-background p-8 animate-fade-in-up">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="rounded-2xl border bg-background p-8 text-center animate-fade-in-up">
        <div className="text-muted-foreground">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-2xl">🌙</span>
          </div>
          <p>Select a date to see the Javanese calendar conversion</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-background p-8 space-y-6 animate-fade-in-up float glow">
      {/* Header */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-primary-glow">
          Javanese Calendar
        </h3>
        <p className="text-muted-foreground">Traditional Calendar Wisdom</p>
      </div>

      {/* Main Date Display */}
      <div className="text-center space-y-1">
        <div className="text-3xl md:text-4xl font-bold text-foreground">
          {result.javanese.date} {result.javanese.month} {result.javanese.year}
        </div>
      </div>

      {/* Cycles Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Day & Pasaran</Label>
            <Badge variant="secondary" className="w-full justify-center">
              {result.gregorian.dayName} {result.cycles.pasaran}
            </Badge>
          </div>
          
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Year Type</Label>
            <Badge variant="outline" className="w-full justify-center">
              {result.javanese.yearType}
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Wuku Cycle</Label>
            <Badge className="w-full justify-center bg-accent/20 text-accent-foreground border-accent/30">
              {result.cycles.wuku}
            </Badge>
          </div>
          
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Windu</Label>
            <Badge variant="outline" className="w-full justify-center">
              {result.javanese.windu}
            </Badge>
          </div>
        </div>
      </div>

      {/* Full Format Display */}
      <div className="bg-muted/30 rounded-lg p-4 text-center">
        <Label className="text-xs text-muted-foreground block mb-2">Complete Format</Label>
        <p className="text-sm font-medium text-foreground leading-relaxed">
          {result.formatted}
        </p>
      </div>

      {/* Copy Button */}
      <Button 
        onClick={handleCopy}
        className="w-full"
        disabled={copied}
      >
        {copied ? (
          <>
            <CheckCircle className="w-4 h-4 mr-2" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 mr-2" />
            Copy to Clipboard
          </>
        )}
      </Button>
    </div>
  );
};

// Label component for consistent styling
const Label = ({ children, className = "", ...props }: { children: React.ReactNode; className?: string; [key: string]: any }) => (
  <label className={`text-sm font-medium ${className}`} {...props}>
    {children}
  </label>
);