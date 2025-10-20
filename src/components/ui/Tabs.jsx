import React, { useState } from "react";

export const Tabs = ({ tabs, defaultValue, className = "" }) => {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex bg-white/5 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`
              flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
              ${
                activeTab === tab.value
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-300"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[400px]">
        {tabs.map(
          (tab) =>
            activeTab === tab.value && <div key={tab.value}>{tab.content}</div>
        )}
      </div>
    </div>
  );
};

export const Tab = ({ children }) => children;
