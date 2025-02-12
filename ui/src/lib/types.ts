export type UserAsset = {
  token: string;
  chain: string;
  balance: number;
  balanceUSD: number;
};

export type UserTransaction = UserTransactionBase<"receive" | "send">;
type UserTransactionBase<T extends "receive" | "send"> = {
  type: T;
  txHash: string;
  timestamp: Date;
  token: string;
  chain: string;
  amount: number;
  amountUSD: number;
  address: string;
}

export type TokenBoxVariant = {
  type: "from" | "to";
};

