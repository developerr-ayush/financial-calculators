import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { Inflation } from "./pages/Inflation";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inflation-calculator" element={<Inflation />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
