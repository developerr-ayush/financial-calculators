export const Container = ({
  children,
  size = "default",
  className = "",
  padding = true,
}) => {
  const sizes = {
    sm: "max-w-2xl",
    default: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-full",
  };

  return (
    <div
      className={`
      ${sizes[size]} mx-auto
      ${padding ? "px-4 sm:px-6 lg:px-8" : ""}
      ${className}
    `}
    >
      {children}
    </div>
  );
};

export const Section = ({ children, className = "" }) => (
  <section className={`py-8 ${className}`}>{children}</section>
);
