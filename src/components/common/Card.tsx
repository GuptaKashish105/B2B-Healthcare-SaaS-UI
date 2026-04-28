import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

const Card: React.FC<CardProps> = React.memo(
  ({ children, className = "", onClick, hover = true }) => {
    const classes = `bg-white rounded-xl shadow-sm border border-slate-200 transition-all duration-200 ${
      onClick || hover
        ? "hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 cursor-pointer"
        : ""
    } ${className}`;

    return (
      <div className={classes} onClick={onClick}>
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

export default Card;
