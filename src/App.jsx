import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { Inflation } from "./pages/Inflation";
import { SIP } from "./components/SIP";
import { IncomeTaxCalculator } from "./pages/IncomeTaxCalculator";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inflation-calculator" element={<Inflation />} />
          <Route path="/sip-calculator" element={<SIP />} />
          <Route
            path="/income-tax-calculator"
            element={<IncomeTaxCalculator />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
