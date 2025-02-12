export type TokenBoxVariant = {
  type: "from" | "to";
};
export type Nullable<T> = T | null;
export type ChainId = string;
export type Token = {
  chainId?: ChainId;
  address: string;
  decimals: number;
  symbol: string;
  name: string;
  logo?:string;
  price?:number;
};

