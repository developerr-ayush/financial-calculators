import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const calculatorData = [
  {
    path: "/sip-calculator",
    title: "SIP Calculator",
    description: "Calculate your SIP investments and returns",
  },
  {
    path: "/inflation-calculator",
    title: "Inflation Calculator",
    description: "Calculate the impact of inflation on your money",
  },
  {
    path: "/income-tax-calculator",
    title: "Income Tax Calculator",
    description: "Calculate your income tax under the new tax regime",
  },
];

export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4">
      <SEO
        title="Financial Calculators"
        description="Free online financial calculators for Income Tax, SIP, Inflation and more. Plan your finances better with our easy-to-use calculators."
        keywords="financial calculators, tax calculator, SIP calculator, inflation calculator, finance tools"
      />

      <div className="max-w-6xl mx-auto bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-slate-700">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            Welcome to Financial Calculators
          </h1>
          <p className="text-slate-300 text-lg">
            Choose a calculator to help you manage your finances effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculatorData.map(({ path, title, description }) => (
            <Link
              key={path}
              to={path}
              className="group block transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="bg-slate-700/50 backdrop-blur-sm border border-slate-600 rounded-xl p-6 h-64 flex flex-col justify-center items-center text-center transition-all duration-300 hover:bg-slate-600/50 hover:border-slate-500">
                <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {title}
                </h3>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                  {description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
