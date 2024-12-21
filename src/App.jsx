import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { Inflation } from "./pages/Inflation";
import { SIP } from "./components/SIP";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inflation-calculator" element={<Inflation />} />
          <Route path="/sip-calculator" element={<SIP />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
