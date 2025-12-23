import { Home, QrCode, BarChart3, MapPin } from "lucide-react";

interface NavItem {
  icon: React.ElementType;
  label: string;
  id: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: "HOME", id: "home" },
  { icon: QrCode, label: "GENERATE", id: "generate" },
  { icon: BarChart3, label: "STATS", id: "stats" },
  { icon: MapPin, label: "CODES", id: "codes" },
];

interface MobileNavProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export function MobileNav({ activeSection, onNavigate }: MobileNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="mx-2 mb-2 rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-lg">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-transparent bg-clip-text"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={isActive ? { backgroundImage: "var(--gradient-primary)" } : undefined}
              >
                <item.icon
                  className={`h-5 w-5 ${
                    isActive ? "text-[hsl(325,100%,55%)]" : ""
                  }`}
                />
                <span
                  className={`text-[10px] font-semibold tracking-wider ${
                    isActive ? "bg-clip-text text-transparent" : ""
                  }`}
                  style={isActive ? { backgroundImage: "var(--gradient-primary)" } : undefined}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
