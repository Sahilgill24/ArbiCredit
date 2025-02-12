import SwapCard from "@/components/swap-card";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "./wagmi-config";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <main className="w-full h-screen flex flex-row items-center justify-center">
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <SwapCard />
          </QueryClientProvider>
        </WagmiProvider>
      </main>
    </>
  );
}

export default App;
