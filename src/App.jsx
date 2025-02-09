import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Inflation } from "./pages/Inflation";
import { SIP } from "./components/SIP";
import { IncomeTaxCalculator } from "./pages/IncomeTaxCalculator";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { BudgetingFramework } from "./components/BudgetingFramework";

function App() {
  return (
    <Router>
      <GoogleAnalytics />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inflation-calculator" element={<Inflation />} />
        <Route path="/sip-calculator" element={<SIP />} />
        <Route
          path="/income-tax-calculator"
          element={<IncomeTaxCalculator />}
        />
        <Route path="/budgeting-framework" element={<BudgetingFramework />} />
      </Routes>
    </Router>
  );
}

export default App;
