import { create } from "zustand";

type SwapStoreState = {
  fromChain: string;
  toChain: string;
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  fromAmountUSD: number;
  toAmountUSD: number;
  swapEnabled: boolean;
  walletConnected: boolean;
  activeAddress: string;
  isLoading: boolean;

  setFromChain: (fromChain: string) => void;
  setToChain: (toChain: string) => void;
  setFromToken: (fromToken: string) => void;
  setToToken: (toToken: string) => void;
  setFromAmount: (fromAmount: string) => void;
  setToAmount: (toAmount: string) => void;
  setFromAmountUSD: (fromAmountUSD: number) => void;
  setToAmountUSD: (toAmountUSD: number) => void;
  setSwapEnabled: (swapEnabled: boolean) => void;
  setWalletConnected: (walletConnected: boolean) => void;
  setActiveAddress: (activeAddress: string) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const useSwapStore = create<SwapStoreState>((set) => ({
  fromChain: "Arbitrum",
  toChain: "Ethereum",
  fromToken: "ETH",
  toToken: "USDC",
  fromAmount: "",
  toAmount: "--",
  fromAmountUSD: 0,
  toAmountUSD: 0,
  swapEnabled: false,
  walletConnected: false,
  activeAddress: "",
  isLoading: false,

  setFromChain: (fromChain: string) => set({ fromChain }),
  setToChain: (toChain: string) => set({ toChain }),
  setFromToken: (fromToken: string) => set({ fromToken }),
  setToToken: (toToken: string) => set({ toToken }),
  setFromAmount: (fromAmount: string) => set({ fromAmount }),
  setToAmount: (toAmount: string) => set({ toAmount }),
  setFromAmountUSD: (fromAmountUSD: number) => set({ fromAmountUSD }),
  setToAmountUSD: (toAmountUSD: number) => set({ toAmountUSD }),
  setSwapEnabled: (swapEnabled: boolean) => set({ swapEnabled }),
  setWalletConnected: (walletConnected: boolean) => set({ walletConnected }),
  setActiveAddress: (activeAddress: string) => set({ activeAddress }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
