import { useState } from "react";
import SEO from "../components/SEO";

export const Inflation = () => {
  const [oldPrice, setOldPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const calculateInflation = () => {
    if (!oldPrice || !newPrice) return 0;
    const inflationRate = ((newPrice - oldPrice) / oldPrice) * 100;
    return inflationRate.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4">
      <SEO
        title="Inflation Calculator"
        description="Calculate the impact of inflation on your money over time. See how much purchasing power your money loses due to inflation."
        keywords="inflation calculator, purchasing power calculator, inflation impact, money value calculator"
      />

      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 max-w-md w-full shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Inflation Calculator
          </h2>

          <div className="space-y-6">
            <div>
              <input
                type="number"
                value={oldPrice}
                onChange={(e) => setOldPrice(Number(e.target.value))}
                placeholder="Old Price"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            <div>
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(Number(e.target.value))}
                placeholder="New Price"
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="text-2xl font-bold text-green-400">
              Inflation Rate: {calculateInflation()}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
