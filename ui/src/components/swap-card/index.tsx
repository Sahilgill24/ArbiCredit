import ConnectWallet from "./connect-wallet";
import SwapButton from "./swap-button";
import SwapIcon from "./swap-icon";
import TokenInput from "./token-input";
import TransactionDetails from "./gas-fees";

import { useEffect, useState } from "react";
import { ethers, Wallet } from "ethers";
import axios from "axios";
import { useCentralStore } from "@/hooks/central-store";
import { useAccount } from "wagmi";
import { ABI } from "@/lib/AggregatorContract";
import { Assets, Chains, SwapSDK } from "@chainflip/sdk/swap";
import { useEthersSigner } from "@/hooks/ethers";
import { JsonRpcSigner } from "ethers";
import { sdk } from "@/lib/sdk";
export default function SwapCard() {
  const [routeData, setRouteData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const PEPE = "0x6982508145454Ce325dDbE47a25d4ec3d2311933";
  const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
  const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
  const USDC_DECIMALS = 6;
  const CONTRACT = "0xa8c9718d3a790604311206d1748a1e17334eef8b";
  const { fromAmount, setToAmount } = useCentralStore();
  const { address } = useAccount();
  useEffect(() => {
    if (fromAmount === undefined || fromAmount === null || fromAmount === "") return;
    const getRoutes = async () => {
      // const qoute = await sdk.getQuote() 
      const data = await axios.get(
        `http://localhost:3000/${WETH}/${18}/WETH/${PEPE}/${18}/PEPE/${fromAmount}/${address}`
      )
      setToAmount(data.data.qoute)
      setRouteData(data.data.routeCallData);
    }
    if (Number(fromAmount) > 0)
      getRoutes();
  }, [fromAmount]);

  const signer = useEthersSigner({
    chainId: 42161
  });

  const hanleSwap = async () => {
    const abiCoder = new ethers.AbiCoder();
    if (routeData !== undefined && routeData !== null && address !== undefined) {
      {
        const data = abiCoder.encode(["bytes", "address"], [routeData, address]);
        const provider = new ethers.JsonRpcProvider("https://arbitrum-sepolia.blockpi.network/v1/rpc/public ")
        const ethersProvider = new ethers.JsonRpcProvider("https://eth.llamarpc.com")
        // console.log(address)
        // con signer =new JsonRpcSigner(provider, address)
        // console.log(signer)

        const dataLength = data.length / 2;


        const contract = new ethers.Contract(CONTRACT, ABI, ethersProvider);
        const encodedData = contract.interface.encodeFunctionData("cfReceive", [
          1,
          abiCoder.encode(['address'], ['0xF5e10380213880111522dd0efD3dbb45b9f62Bcc']),
          data,
          "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
          ethers.parseEther(fromAmount.toString()),
        ]);
        // console.log(ethers.parseEther("1").toString())
        const estimatedGas = await ethersProvider.send("eth_estimateGas", [
          {
            from: "0xF5e10380213880111522dd0efD3dbb45b9f62Bcc",
            to: CONTRACT,
            data: encodedData,
            value: ethers.parseEther(fromAmount.toString()).toString()
          },
        ]);
        const userLogicgas = (parseInt(estimatedGas, 16))
        console.log(userLogicgas)
        const gasLimit = (userLogicgas + 1200000 + dataLength * 17) * 1.3;
        const gas = await ethersProvider.getFeeData()
        const gasPrice = (gas).maxFeePerGas
        const baseFee = gas.gasPrice
        if (!gasPrice && !baseFee) return
        if (!signer) return
        console.log("gasPrice", gasPrice)
        console.log("baseFee", baseFee)
        const nativeTokenNeeded = gasLimit * ((Number(gasPrice) + Number(baseFee)) / 1e9);
        console.log(((Number(fromAmount)) * (10 ** 18) + (nativeTokenNeeded)))
        console.log("ntN", nativeTokenNeeded)
        const sdk = new SwapSDK({ network: "mainnet" });
        const swapParams = {
          srcChain: Chains.Arbitrum,
          destChain: Chains.Ethereum,
          srcAsset: Assets.ETH,
          destAsset: Assets.ETH,
          amount: ((Number(fromAmount)) * (10 ** 18) + (nativeTokenNeeded)).toString(),
          destAddress: CONTRACT,
          ccmMetadata: {
            message: data as `0x${string}`,
            gasBudget: (nativeTokenNeeded).toString()
          }
        }
        console.log(swapParams)
        const qoute = await sdk.getQuote(swapParams);
        console.log("qoute", qoute)
        const swapPrice = Number(qoute.quote.egressAmount) / (Number(fromAmount) * 10 ** 18);
        const outAmount = ((Number(qoute.quote.egressAmount) - nativeTokenNeeded)/1e18).toString();
        console.log("out",outAmount)
        const dataApi = await axios.get(
          `http://localhost:3000/${WETH}/${18}/WETH/${PEPE}/${18}/PEPE/${outAmount}/${address}`
        )

        setToAmount(dataApi.data.qoute)
        const updateMessage = abiCoder.encode(["bytes", "address"], [dataApi.data.routeCallData, address]);
        console.log(updateMessage)
        const swapParamsUpdatedData = {
          ...swapParams, ccmMetadata: {
            message: updateMessage as `0x${string}`,
            gasBudget: (Math.floor(nativeTokenNeeded)).toString()
          }
        }
        console.log(swapParamsUpdatedData)
        console.log("swapParamsUpdatedData", swapParamsUpdatedData)
        const tx = await sdk.executeSwap(swapParamsUpdatedData,
          {
            signer: signer,
          }
        )
        console.log(tx)

      }
    }
  }

  return (
    <div className="card bg-base-300 w-[480px] shadow-xl">
      <div className="card-body relative flex flex-col gap-2 justify-center">
        <div className="flex flex-row items-center justify-between mb-2">
          <h1 className="text-2xl">Flip Bridge</h1>
          <ConnectWallet />
        </div>
        <TokenInput type="from" />
        <TokenInput type="to" />
        <TransactionDetails />
        <button className="btn btn-primary" onClick={hanleSwap}>Swap</button>
      </div>
    </div>
  );

}
