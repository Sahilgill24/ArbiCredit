import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home-page";
import PortfolioPage from "./pages/portfolio-page";
import SwapPage from "./pages/swap-page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/swap" element={<SwapPage />} />
      </Routes>
    </Router>
  );
}

export default App;
