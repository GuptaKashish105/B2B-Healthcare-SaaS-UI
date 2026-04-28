import React from "react";

const Skeleton: React.FC<{ className?: string }> = ({
  className = "h-6 bg-slate-200 rounded-md",
}) => <div className={`animate-pulse ${className}`} />;

export default React.memo(Skeleton);
