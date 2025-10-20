import { useState, createContext, useContext } from "react";
import PropTypes from "prop-types";
import { tv } from "tailwind-variants";

// Tab context for nested tabs
const TabContext = createContext();

// Tab variants using tailwind-variants
const tabStyles = tv({
  base: "flex transition-all duration-200",
  variants: {
    variant: {
      primary: "border-b border-white/10",
      secondary: "bg-white/5 rounded-lg p-1",
    },
    size: {
      sm: "px-2 py-1 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

const tabButtonStyles = tv({
  base: "font-medium transition-all duration-200 flex items-center justify-center",
  variants: {
    variant: {
      primary: "flex-1 border-b-2",
      secondary: "flex-1 rounded-md",
    },
    active: {
      true: "",
      false: "",
    },
    size: {
      sm: "px-2 py-1 text-xs",
      md: "px-3 py-2 text-sm",
      lg: "px-4 py-3 text-base",
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      active: true,
      class: "text-blue-400 border-blue-400",
    },
    {
      variant: "primary",
      active: false,
      class: "text-slate-400 hover:text-white",
    },
    {
      variant: "secondary",
      active: true,
      class: "bg-white/10 text-white shadow-sm",
    },
    {
      variant: "secondary",
      active: false,
      class: "text-slate-400 hover:text-slate-300",
    },
  ],
  defaultVariants: {
    variant: "primary",
    active: false,
    size: "md",
  },
});

export const Tabs = ({
  tabs,
  defaultValue,
  variant = "primary",
  size = "md",
  className = "",
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);

  const handleTabChange = (value) => {
    setActiveTab(value);
    onTabChange?.(value);
  };

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className={`space-y-4 ${className}`}>
        <div className={tabStyles({ variant, size })}>
          {tabs.map((tab) => (
            <TabButton
              key={tab.value}
              value={tab.value}
              variant={variant}
              size={size}
              icon={tab.icon}
            >
              {tab.label}
            </TabButton>
          ))}
        </div>

        <div className="min-h-[400px]">
          {tabs.map(
            (tab) =>
              activeTab === tab.value && (
                <div key={tab.value}>
                  {typeof tab.content === "function"
                    ? tab.content(activeTab)
                    : tab.content}
                </div>
              )
          )}
        </div>
      </div>
    </TabContext.Provider>
  );
};

const TabButton = ({ children, value, variant, size, icon }) => {
  const { activeTab, setActiveTab } = useContext(TabContext);

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={tabButtonStyles({
        variant,
        active: activeTab === value,
        size,
      })}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export const NestedTabs = ({
  tabs,
  defaultValue,
  variant = "secondary",
  size = "sm",
  className = "",
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);

  const handleTabChange = (value) => {
    setActiveTab(value);
    onTabChange?.(value);
  };

  return (
    <div className={`flex justify-center space-x-1 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleTabChange(tab.value)}
          className={tabButtonStyles({
            variant,
            active: activeTab === tab.value,
            size,
          })}
        >
          {tab.icon && <span className="mr-2">{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export const TabContent = ({ value, children }) => {
  const { activeTab } = useContext(TabContext);

  if (activeTab !== value) return null;

  return <div>{children}</div>;
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
      content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
      icon: PropTypes.node,
    })
  ).isRequired,
  defaultValue: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
  onTabChange: PropTypes.func,
};

NestedTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
      icon: PropTypes.node,
    })
  ).isRequired,
  defaultValue: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
  onTabChange: PropTypes.func,
};

export const Tab = ({ children }) => children;

Tab.propTypes = {
  children: PropTypes.node.isRequired,
};
