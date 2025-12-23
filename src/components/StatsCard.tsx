import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
}

export function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  return (
    <div className="glass-card rounded-xl p-4 sm:p-6 animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="space-y-1 sm:space-y-2">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <p className={`text-xs sm:text-sm font-medium ${trend.positive ? 'text-green-500' : 'text-red-500'}`}>
              {trend.positive ? '+' : ''}{trend.value}% from last week
            </p>
          )}
        </div>
        <div className="p-2 sm:p-3 rounded-lg" style={{ backgroundImage: "var(--gradient-primary)", opacity: 0.15 }}>
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" style={{ color: "hsl(325, 100%, 55%)" }} />
        </div>
      </div>
    </div>
  );
}