import { useState, useRef } from "react";
import { QRGenerator } from "@/components/QRGenerator";
import { StatsCard } from "@/components/StatsCard";
import { RecentQRCodes } from "@/components/RecentQRCodes";
import { MobileNav } from "@/components/MobileNav";
import { QrCode, Scan, MousePointerClick, TrendingUp } from "lucide-react";

interface QRCodeItem {
  id: string;
  url: string;
  scans: number;
  createdAt: Date;
}

const Index = () => {
  const [qrCodes, setQrCodes] = useState<QRCodeItem[]>([]);
  const [activeSection, setActiveSection] = useState("home");

  const homeRef = useRef<HTMLDivElement>(null);
  const generateRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const codesRef = useRef<HTMLDivElement>(null);

  const handleGenerate = (url: string, id: string) => {
    const newCode: QRCodeItem = {
      id,
      url,
      scans: 0,
      createdAt: new Date(),
    };
    setQrCodes((prev) => [newCode, ...prev]);
  };

  const handleNavigate = (id: string) => {
    setActiveSection(id);
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      home: homeRef,
      generate: generateRef,
      stats: statsRef,
      codes: codesRef,
    };
    refs[id]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const totalScans = qrCodes.reduce((acc, code) => acc + code.scans, 0);

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 rounded-xl glow-effect" style={{ backgroundImage: "var(--gradient-primary)" }}>
              <QrCode className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-foreground">QRTrack</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {["Home", "Generate", "Stats", "Codes"].map((item) => (
              <button
                key={item}
                onClick={() => handleNavigate(item.toLowerCase())}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.toLowerCase()
                    ? "gradient-text"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <section ref={homeRef} className="text-center mb-10 sm:mb-16 animate-fade-in scroll-mt-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="gradient-text">Generate & Track</span>
            <br />
            <span className="text-foreground">Your QR Codes</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Create beautiful QR codes instantly and track every scan with detailed analytics. 
            Perfect for marketing campaigns, events, and business cards.
          </p>
        </section>

        {/* Stats Grid */}
        <section ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12 scroll-mt-20">
          <StatsCard
            title="Total QR Codes"
            value={qrCodes.length}
            icon={QrCode}
          />
          <StatsCard
            title="Total Scans"
            value={totalScans}
            icon={Scan}
          />
          <StatsCard
            title="Click Rate"
            value={qrCodes.length > 0 ? `${((totalScans / Math.max(qrCodes.length, 1)) * 10).toFixed(1)}%` : '0%'}
            icon={MousePointerClick}
          />
          <StatsCard
            title="Active Codes"
            value={qrCodes.length}
            icon={TrendingUp}
            trend={qrCodes.length > 0 ? { value: 12, positive: true } : undefined}
          />
        </section>

        {/* Main Content Grid */}
        <section className="grid lg:grid-cols-2 gap-6 sm:gap-8">
          <div ref={generateRef} className="scroll-mt-20">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Create New QR Code</h2>
            <QRGenerator onGenerate={handleGenerate} />
          </div>
          <div ref={codesRef} className="scroll-mt-20">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Your QR Codes</h2>
            <RecentQRCodes codes={qrCodes} />
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-12 sm:mt-20 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-8 sm:mb-12">Why Choose QRTrack?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                title: "Instant Generation",
                description: "Create QR codes in seconds with our lightning-fast generator.",
                icon: "⚡",
              },
              {
                title: "Real-time Tracking",
                description: "Monitor scans as they happen with live analytics dashboard.",
                icon: "📊",
              },
              {
                title: "High Quality Export",
                description: "Download your QR codes in PNG or PDF format.",
                icon: "🎨",
              },
            ].map((feature, index) => (
              <div 
                key={index}
                className="glass-card rounded-xl p-6 sm:p-8 text-center animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{feature.icon}</div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-12 sm:mt-20 hidden md:block">
        <div className="container mx-auto px-4 py-6 sm:py-8 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} QRTrack. Generate. Track. Grow.
          </p>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <MobileNav activeSection={activeSection} onNavigate={handleNavigate} />
    </div>
  );
};

export default Index;
