import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import { Container } from "../components/ui/Container";
import { Card, CardContent } from "../components/ui/Card";
import {
  FaChartLine,
  FaPiggyBank,
  FaCalculator,
  FaChartPie,
} from "react-icons/fa";

const calculatorData = [
  {
    path: "/sip-calculator",
    title: "SIP Calculator",
    description: "Calculate your SIP investments and returns",
    icon: <FaChartLine className="text-4xl" />,
  },
  {
    path: "/stepup-sip-calculator",
    title: "Step-up SIP Calculator",
    description: "Calculate step-up SIP investments with annual increases",
    icon: <FaChartPie className="text-4xl" />,
  },
  {
    path: "/inflation-calculator",
    title: "Inflation Calculator",
    description: "Calculate the impact of inflation on your money",
    icon: <FaPiggyBank className="text-4xl" />,
  },
  {
    path: "/income-tax-calculator",
    title: "Income Tax Calculator",
    description: "Calculate your income tax under the new tax regime",
    icon: <FaCalculator className="text-4xl" />,
  },
];

export const Home = () => {
  return (
    <>
      <SEO
        title="Financial Calculators"
        description="Free online financial calculators for Income Tax, SIP, Inflation and more. Plan your finances better with our easy-to-use calculators."
        keywords="financial calculators, tax calculator, SIP calculator, inflation calculator, finance tools"
      />

      <Container size="lg" className="pt-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">
            Financial Calculators
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Plan your finances with our comprehensive collection of calculators
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculatorData.map(({ path, title, description, icon }) => (
            <Link key={path} to={path} className="group">
              <Card className="h-full transition-all duration-200 hover:scale-105 hover:bg-white/10">
                <CardContent className="flex flex-col items-center text-center space-y-4">
                  <div className="text-blue-400">{icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {title}
                    </h3>
                    <p className="text-slate-400 text-sm">{description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
};
