import React from "react";

interface StatBadgeProps {
  label: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
}

const StatBadge: React.FC<StatBadgeProps> = ({
  label,
  value,
  description,
  icon,
  trend,
}) => {
  const trendColors = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-slate-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs uppercase tracking-[0.15em] text-slate-500 font-medium">
          {label}
        </p>
        {icon && <div className="text-slate-400">{icon}</div>}
      </div>
      <p
        className={`text-3xl font-bold ${trend ? trendColors[trend] : "text-slate-900"}`}
      >
        {value}
      </p>
      {description && (
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default React.memo(StatBadge);
