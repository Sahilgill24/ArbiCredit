import { create } from "zustand";

interface ModalStoreState {
  fromChain: string;
  fromToken: string;
  toChain: string;
  toToken: string;

  setFromChain: (fromChain: string) => void;
  setFromToken: (fromToken: string) => void;
  setToChain: (toChain: string) => void;
  setToToken: (toToken: string) => void;
}

export const useModalStore = create<ModalStoreState>((set) => ({
  fromChain: "Arbitrum",
  fromToken: "ETH",
  toChain: "Ethereum",
  toToken: "PEPE",

  setFromChain: (fromChain) => set({ fromChain }),
  setFromToken: (fromToken) => set({ fromToken }),
  setToChain: (toChain) => set({ toChain }),
  setToToken: (toToken) => set({ toToken }),
})); 