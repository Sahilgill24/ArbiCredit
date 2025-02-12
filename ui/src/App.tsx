import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home-page";
import PortfolioPage from "./pages/portfolio-page";
import SwapPage from "./pages/swap-page";
import { WagmiProvider } from "wagmi";
import { Config } from "./wagmi-config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  return (
    <WagmiProvider config={Config}>
      <QueryClientProvider client={new QueryClient()}>
        <Router>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/swap" element={<SwapPage />} />
          </Routes>

        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
