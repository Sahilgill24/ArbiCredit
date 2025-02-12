import { create } from "zustand";
import { type UserAsset, type UserTransaction } from "@/lib/types";

type PortfolioStoreState = {
  assets: UserAsset[];
  transactions: UserTransaction[];
  isLoading: boolean;

  setAssets: (assets: UserAsset[]) => void;
  setTransactions: (transactions: UserTransaction[]) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const usePortfolioStore = create<PortfolioStoreState>((set) => ({
  // Populating with sample data for now
  assets: [
    {
      token: "ETH",
      chain: "Ethereum",
      balance: 2.5,
      balanceUSD: 4625.0,
    },
    {
      token: "USDC",
      chain: "Polygon",
      balance: 1500,
      balanceUSD: 1500.0,
    },
    {
      token: "BTC",
      chain: "Bitcoin",
      balance: 0.1,
      balanceUSD: 2900.0,
    },
    {
      token: "BNB",
      chain: "Binance Smart Chain",
      balance: 10,
      balanceUSD: 2300.0,
    },
    {
      token: "SOL",
      chain: "Solana",
      balance: 20,
      balanceUSD: 500.0,
    },
    {
      token: "AVAX",
      chain: "Avalanche",
      balance: 30,
      balanceUSD: 450.0,
    },
  ],
  transactions: [
    {
      type: "receive",
      txHash: "0x1234abcd5678efgh9012ijkl3456mnop7890qrst",
      timestamp: new Date("2024-08-15T14:25:00Z"),
      token: "ETH",
      chain: "Ethereum",
      amount: 2.5,
      amountUSD: 4500,
      address: "0x1234abcd5678efgh9012ijkl3456mnop7890qrst",
    },
    {
      type: "send",
      txHash: "0x1234abcd5678efgh9012ijkl3456mnop7890qrst",
      timestamp: new Date("2024-08-16T10:10:00Z"),
      token: "USDC",
      chain: "Polygon",
      amount: 1000,
      amountUSD: 1000,
      address: "0x7890qrst1234abcd5678efgh9012ijkl3456mnop",
    },
    {
      type: "receive",
      txHash: "0x1234abcd5678efgh9012ijkl3456mnop7890qrst",
      timestamp: new Date("2024-08-17T08:30:00Z"),
      token: "DAI",
      chain: "Ethereum",
      amount: 500,
      amountUSD: 500,
      address: "0x4567ijkl7890mnop1234qrst5678abcd9012efgh",
    },
    {
      type: "send",
      txHash: "0x1234abcd5678efgh9012ijkl3456mnop7890qrst",
      timestamp: new Date("2024-08-17T12:45:00Z"),
      token: "BNB",
      chain: "Binance Smart Chain",
      amount: 1.2,
      amountUSD: 250,
      address: "0x9012mnop3456qrst7890abcd1234efgh5678ijkl",
    },
    {
      type: "receive",
      txHash: "0x1234abcd5678efgh9012ijkl3456mnop7890qrst",
      timestamp: new Date("2024-08-18T09:15:00Z"),
      token: "MATIC",
      chain: "Polygon",
      amount: 150,
      amountUSD: 150,
      address: "0x7890qrst1234abcd5678ijkl9012mnop3456efgh",
    },
    {
      type: "send",
      txHash: "0x1234abcd5678efgh9012ijkl3456mnop7890qrst",
      timestamp: new Date("2024-08-18T11:00:00Z"),
      token: "AVAX",
      chain: "Avalanche",
      amount: 10,
      amountUSD: 200,
      address: "0x3456mnop7890qrst1234ijkl5678abcd9012efgh",
    },
    {
      type: "receive",
      txHash: "0x1234abcd5678efgh9012ijkl3456mnop7890qrst",
      timestamp: new Date("2024-08-18T14:20:00Z"),
      token: "SOL",
      chain: "Solana",
      amount: 5,
      amountUSD: 125,
      address: "0x9012ijkl3456mnop7890qrst5678abcd1234efgh",
    },
    {
      type: "send",
      txHash: "0x1234abcd5678efgh9012ijkl3456mnop7890qrst",
      timestamp: new Date("2024-08-18T16:40:00Z"),
      token: "DOT",
      chain: "Polkadot",
      amount: 8,
      amountUSD: 160,
      address: "0x5678mnop9012qrst1234ijkl3456abcd7890efgh",
    },
    {
      type: "receive",
      txHash: "0x1234abcd5678efgh9012ijkl3456mnop7890qrst",
      timestamp: new Date("2024-08-19T07:55:00Z"),
      token: "LINK",
      chain: "Ethereum",
      amount: 20,
      amountUSD: 400,
      address: "0x2345qrst7890ijkl1234mnop5678abcd9012efgh",
    },
    {
      type: "send",
      txHash: "0x1234abcd5678efgh9012ijkl3456mnop7890qrst",
      timestamp: new Date("2024-08-19T09:30:00Z"),
      token: "ADA",
      chain: "Cardano",
      amount: 1000,
      amountUSD: 320,
      address: "0x6789mnop3456ijkl9012qrst1234abcd7890efgh",
    },
  ],
  isLoading: false,

  setAssets: (assets) => set({ assets }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setTransactions: (transactions) => set({ transactions }),
}));
