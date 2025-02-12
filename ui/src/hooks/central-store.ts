import { ChainId, Token } from "@/lib/types";
import { create } from "zustand";
import { Nullable } from "@/lib/types";
import { QuoteResponse } from "@chainflip/sdk/swap";

interface CentralStoreState {
  fromChain: ChainId;
  fromToken: Nullable<Token>;
  fromAmount: string;
  toChain: ChainId;
  toToken: Nullable<Token>;
  toAmount: string;
  swapEnabled: boolean;
  activeAddress: string;
  toAddress: string;
  toAmountUSD: number;
  fromAmountUSD: number;
  quote: Nullable<QuoteResponse>;
  walletConnected: boolean;

  setFromChain: (fromChain: string) => void;
  setFromToken: (fromToken: Nullable<Token>) => void;
  setFromAmount: (fromAmount: string) => void;
  setToChain: (toChain: string) => void;
  setToToken: (toToken: Nullable<Token>) => void;
  setToAmount: (toAmount: string) => void;
  setSwapEnabled: (swapEnabled: boolean) => void;
  setActiveAddress: (activeAddress: string) => void;
  setToAddress: (toAddress: string) => void;
  setToAmountUSD: (toAmountUSD: number) => void;
  setFromAmountUSD: (fromAmountUSD: number) => void;
  setQuote: (quote: Nullable<QuoteResponse>) => void;
  setWalletConnected: (walletConnected: boolean) => void;
}

export const useCentralStore = create<CentralStoreState>((set) => ({
  fromChain: "",
  fromToken: null,
  fromAmount: "",
  toChain: "",
  toToken: null,
  toAmount: "",
  swapEnabled: false,
  activeAddress: "",
  toAddress: "",
  toAmountUSD: 0,
  fromAmountUSD: 0,
  quote: null,
  walletConnected: false,
  setFromChain: (fromChain) => set({ fromChain }),
  setFromToken: (fromToken) => set({ fromToken }),
  setFromAmount: (fromAmount) => set({ fromAmount }),
  setToChain: (toChain) => set({ toChain }),
  setToToken: (toToken) => set({ toToken }),
  setToAmount: (toAmount) => set({ toAmount }),
  setSwapEnabled: (swapEnabled) => set({ swapEnabled }),
  setActiveAddress: (activeAddress) => set({ activeAddress }),
  setToAddress: (toAddress) => set({ toAddress }),
  setToAmountUSD: (toAmountUSD) => set({ toAmountUSD }),
  setFromAmountUSD: (fromAmountUSD) => set({ fromAmountUSD }),
  setQuote: (quote) => set({ quote }),
  setWalletConnected: (walletConnected) => set({ walletConnected }),
}));
