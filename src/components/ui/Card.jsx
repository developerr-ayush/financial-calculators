import React from "react";

export const Card = ({
  children,
  className = "",
  variant = "default",
  padding = "md",
}) => {
  const variants = {
    default: "bg-white/5 backdrop-blur-sm border border-white/10",
    elevated: "bg-white/10 backdrop-blur-md border border-white/20 shadow-lg",
    ghost: "bg-transparent",
  };

  const paddings = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`rounded-xl ${variants[variant]} ${paddings[padding]} ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-white ${className}`}>
    {children}
  </h3>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);
