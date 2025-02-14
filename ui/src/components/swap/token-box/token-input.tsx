import { Skeleton } from "@/components/ui/skeleton";
import { TokenBoxVariant } from "@/lib/types";
import { useSwapStore } from "@/stores/swap-store";
import { useState } from "react";
import TokenSelector from "./token-selector";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
const TokenInput = ({ type }: TokenBoxVariant) => {
  const {
    fromChain,
    toChain,
    fromAmount,
    setFromAmount,
    toAmount,
    setToAmount,
  } = useSwapStore();

  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [creditscore, setcreditscore] = useState<Number>(0);
  const accountaddress = useAccount();
  const address = accountaddress.address;


  console.log("sample")
  console.log(fromAmount)

  const abi = [{ "inputs": [{ "internalType": "uint32", "name": "seed", "type": "uint32" }], "name": "initializeNetwork", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "int32", "name": "x0", "type": "int32" }, { "internalType": "int32", "name": "x1", "type": "int32" }, { "internalType": "int32", "name": "x2", "type": "int32" }], "name": "predict", "outputs": [{ "internalType": "int32", "name": "", "type": "int32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "_interface", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "int32", "name": "x0", "type": "int32" }, { "internalType": "int32", "name": "x1", "type": "int32" }, { "internalType": "int32", "name": "x2", "type": "int32" }, { "internalType": "int32", "name": "target", "type": "int32" }, { "internalType": "uint32", "name": "learning_rate", "type": "uint32" }], "name": "trainSample", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
  const abi2 = [{ "inputs": [{ "internalType": "address", "name": "to", "type": "address" }], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "_interface", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "deploy_addr", "type": "address" }, { "internalType": "uint32", "name": "credit_score", "type": "uint32" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }]
  // this is the address for the credit score generator Contract
  const contractaddress = '0xB53E69dCF35E0b9789B5a9e64685244b1Ccced33'
  const nftcontractaddress = '0x3b192B43bB38C9a48be7110ef5763AebA405B150'
  // this is for the NFT contract 
  const provider = new ethers.providers.JsonRpcProvider('https://sepolia-rollup.arbitrum.io/rpc');
  const signer = new ethers.Wallet('20703a5b719e0184bc11f9f6be2a8adfebdc0c27fd7115b132f89ef0dddc8888', provider);


  const Creditscorecontract = new ethers.Contract(contractaddress, abi, signer);
  const NFTcontract = new ethers.Contract(nftcontractaddress, abi2, signer);

  async function Creditscore() {
    let tx = await Creditscorecontract.initializeNetwork(1);
    console.log(tx)
    let tx3 = await Creditscorecontract.predict(5000, 200, 3000);
    console.log(tx3)
    // tx3 is the final credit score
    setcreditscore(tx3)



  }

  async function mintCreditNFT() {
    let tx2 = await NFTcontract.mint(address);
    console.log(tx2)
    let tx4 = await NFTcontract.tokenURI(address, creditscore);
    console.log(tx4)
    if (tx4.startsWith('data:application/json;base64,')) {
      const json = atob(tx4.split(',')[1]);
      const parsed = JSON.parse(json);
      console.log(parsed)

    }
  }

  return (
    <div className="flex gap-1 items-center">
      {type === "from" ? (
        <AmountInput
          placeholder={fromChain ? "0.00" : "--"}
          type="number"
          disabled={!fromChain}
          onChange={(e) => setFromAmount(e.target.value)}
          value={fromAmount}
          error={error}
          errorMessage={errorMessage}
        />
      ) : isLoading ? (
        <SwapAmountSkeleton />
      ) : (
        <AmountInput
          placeholder={toChain ? "0.00" : "--"}
          disabled={!toChain}
          value={fromAmount * 2900}
          readOnly
        />
      )}
      <TokenSelector type={type} />
    </div>
  );
};

interface AmountInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
}

function AmountInput({
  error = false,
  errorMessage,
  ...props
}: AmountInputProps) {
  return (
    <div className="pb-2">
      <input
        className={`bg-transparent font-medium w-full text-4xl py-2 outline-none transition-all duration-300 disabled:cursor-not-allowed disabled:text-muted-foreground disabled:brightness-50 ${error && "border-b-2 border-b-destructive text-destructive"
          }`}
        pattern="^-?[0-9]\d*\.?\d*$"
        {...props}
      />
      {error && errorMessage && (
        <span className="text-destructive text-xs mt-1">{errorMessage}</span>
      )}
    </div>
  );
}

function SwapAmountSkeleton() {
  return <Skeleton className="h-10 my-4 w-[250px]" />;
}

export default TokenInput;
