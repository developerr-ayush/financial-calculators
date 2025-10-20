import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Inflation } from "./pages/Inflation";
import { SIPPage } from "./pages/SIP";
import { StepUpSIPPage } from "./pages/StepUpSIP";
import { IncomeTaxCalculator } from "./pages/IncomeTaxCalculator";
import { Header } from "./components/Header";
import GoogleAnalytics from "./components/GoogleAnalytics";

function App() {
  return (
    <Router>
      <GoogleAnalytics />
      <Header />
      <main className="min-h-screen bg-slate-950 text-white flex flex-col">
        <div className="min-h-full flex-1 pt-16 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/inflation-calculator" element={<Inflation />} />
            <Route path="/sip-calculator" element={<SIPPage />} />
            <Route path="/stepup-sip-calculator" element={<StepUpSIPPage />} />
            <Route
              path="/income-tax-calculator"
              element={<IncomeTaxCalculator />}
            />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
