import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSwapStore } from "@/stores/swap-store";

import Settings from "./settings";
import TransactionHistory from "./transaction-history";
import { FromAddress, SwapIcon, ToAddress } from "./swap-user-data";
import TokenBox from "./token-box";
import { ArrowUpDown, CheckCheckIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { CopyAddress } from "../portfolio/commons";
import { ethers } from "ethers";
import { useAccount } from "wagmi";


const Swap = () => {
  const {
    fromChain,
    fromAmount,
    fromToken,
    toChain,
    toToken,
    walletConnected,
    activeAddress,
    setActiveAddress,
    swapEnabled,
    setSwapEnabled,
    isLoading,
    setIsLoading,
  } = useSwapStore();

  const { toast } = useToast();
  console.log(fromAmount)

  const [txHash, setTxHash] = useState<string | null>(null);
  const [creditscore, setcreditscore] = useState<Number>(0);
  const accountaddress = useAccount();
  const address = accountaddress.address;


  const handleSwapClicked = async () => {
    const did = "x"
    // TODO: Write handle swap logic
  };
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
    // in the predict function currently I am inputting the data , but they can be captured from the input
    let tx3 = await Creditscorecontract.predict(5000, 200, 3000);
    console.log(tx3)
    // tx3 is the final credit score
    setcreditscore(tx3)

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
    <div className="*:w-[480px] mx-auto relative overflow-hidden">
      <Card
        className={`z-50 bg transition-all bg-gradient-to-bl from-accent/40 from-[-20%] via-card to-muted/40 duration-500`}
      >
        <CardHeader className="flex flex-row items-center mb-2 justify-between">
          <CardTitle className="font-bold">Lend</CardTitle>
          <div className="space-x-2">
            <Settings />
            <TransactionHistory />
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <FromAddress />
          <TokenBox type="from" />
          <SwapIcon />
          <ToAddress />
          <TokenBox type="to" />
          <div className="flex flex-col space-y-1.5">
            <Input
              id="address"
              placeholder="Your Credit Score here"
              value={creditscore.toString()}

            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Input
              id="address"
              placeholder="NFT address"
              value={address}


            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">

          <Button
            className="w-full text-base"
            size={"lg"}
            variant={"expandIcon"}
            iconPlacement="right"
            Icon={ArrowUpDown}
            disabled={!swapEnabled}
            onClick={Creditscore}
          >
            Lend
          </Button>

          {txHash && (
            <Alert className="">
              <AlertTitle className="text-primary brightness-125 font-bold inline-flex gap-1 items-center">
                Transaction Successful <CheckCheckIcon className="w-4 h-4" />
              </AlertTitle>
              <AlertDescription className="text-muted-foreground font-semibold inline-flex items-center gap-2">
                Transaction Hash:{" "}
                <CopyAddress className="text-sm" address={txHash} description="Transaction Hash copied to clipboard" />
              </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Swap;
