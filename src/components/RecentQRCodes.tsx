import { QRCodeSVG } from "qrcode.react";
import { ExternalLink, BarChart3 } from "lucide-react";

interface QRCodeItem {
  id: string;
  url: string;
  scans: number;
  createdAt: Date;
}

interface RecentQRCodesProps {
  codes: QRCodeItem[];
}

export function RecentQRCodes({ codes }: RecentQRCodesProps) {
  if (codes.length === 0) {
    return (
      <div className="glass-card rounded-xl p-6 sm:p-8 animate-fade-in">
        <div className="text-center py-6 sm:py-8">
          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center" style={{ backgroundImage: "var(--gradient-primary)", opacity: 0.15 }}>
            <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8" style={{ color: "hsl(325, 100%, 55%)" }} />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">No QR Codes Yet</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Generate your first QR code to start tracking scans
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl overflow-hidden animate-fade-in">
      <div className="p-4 sm:p-6 border-b border-border/50">
        <h3 className="text-base sm:text-lg font-semibold text-foreground">Recent QR Codes</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">Track your generated codes</p>
      </div>
      <div className="divide-y divide-border/50 max-h-[400px] overflow-y-auto">
        {codes.map((code, index) => (
          <div 
            key={code.id}
            className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:bg-secondary/30 transition-colors"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="p-1.5 sm:p-2 bg-background rounded-lg border border-border/30">
              <QRCodeSVG
                value={code.url}
                size={36}
                level="L"
                bgColor="transparent"
                fgColor="currentColor"
                className="text-foreground sm:w-[48px] sm:h-[48px]"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                {code.url}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                {code.createdAt.toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-base sm:text-lg font-bold text-foreground">{code.scans}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">scans</p>
            </div>
            <a 
              href={code.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}