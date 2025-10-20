import { Link, useLocation } from "react-router-dom";
import { Container } from "./ui/Container";

export const Header = () => {
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "SIP Calculator", href: "/sip-calculator" },
    { name: "Inflation Calculator", href: "/inflation-calculator" },
    { name: "Income Tax Calculator", href: "/income-tax-calculator" },
  ];

  return (
    <header className="bg-slate-950/80 backdrop-blur-md border-b border-white/10 fixed w-full top-0 z-50">
      <Container>
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">₹</span>
            </div>
            <h1 className="text-xl font-semibold text-white">FinanceCalc</h1>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu */}
          <div className="md:hidden">
            <select
              value={location.pathname}
              onChange={(e) => (window.location.href = e.target.value)}
              className="bg-slate-900/50 text-slate-300 text-sm rounded-lg px-3 py-2 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {navigation.map((item) => (
                <option key={item.href} value={item.href}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Container>
    </header>
  );
};
