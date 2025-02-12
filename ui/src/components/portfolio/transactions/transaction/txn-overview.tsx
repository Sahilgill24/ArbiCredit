import { type UserTransaction } from "@/lib/types";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Download, Upload } from "lucide-react";
import { CopyAddress } from "@/components/portfolio/commons";
import { formatToUSD } from "@/lib/utils";

const TxnOverview = (props: UserTransaction) => {
  const txnColor =
    props.type === "receive"
      ? "text-teal-500 brightness-[112%]"
      : "text-yellow-500 brightness-[88%]";
  const txnSign = props.type === "receive" ? "+" : "-";

  return (
    <div className="flex flex-row items-center justify-between p-4">
      {/* Send/Receive Section */}
      <div className="flex flex-row gap-4 items-center">
        {/* Glassy Avatar */}
        <div className="w-12 h-12 relative">
          <div
            className={`w-full h-full rounded-full 
                bg-gradient-to-tr from-muted via-card to-accent border-b border-t
                grid place-items-center
                ${txnColor}`}
          >
            {props.type === "receive" ? (
              <Download className="w-5 h-5" />
            ) : (
              <Upload className="w-5 h-5" />
            )}
          </div>
        </div>

        {/* Send/Recieve head along with txn hash*/}
        <div className="flex flex-col">
          <span className="text-sm tracking-wider uppercase font-medium">
            {props.type === "receive" ? "Receive" : "Send"}
          </span>
          <div className="flex flex-row gap-1 items-baseline *:font-medium">
            <span className="text-muted-foreground text-sm">TxN Hash: </span>
            <CopyAddress
              className="font-mono text-xs"
              address={props.txHash}
              description="Txn Hash copied to clipboard"
            />
          </div>
        </div>
      </div>

      {/* Amount Details section */}
      <div className="flex flex-row gap-4 items-center">
        {/* Token & Chain Avatar */}
        <div className="w-10 h-10 relative">
          {/* TODO: Fetch it from the desired source and put it here. aur fallback laga diya hai */}
          {/* Token */}
          <Avatar className="w-full h-full">
            <AvatarImage src="https://ethereum.org/_next/static/media/eth-diamond-purple-white.3e872b05.jpg" />
            <AvatarFallback>{props.token.toUpperCase()}</AvatarFallback>
          </Avatar>
          {/* Chain */}
          <Avatar className="w-5 h-5 absolute -right-1 -bottom-1 border">
            <AvatarImage src="https://ethereum.org/_next/static/media/eth-diamond-purple-white.3e872b05.jpg" />
            <AvatarFallback>{props.token.toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>

        {/* Amount */}
        <div className="flex flex-col min-w-24 ">
          <span className={`text-sm font-bold ${txnColor}`}>
            {txnSign}
            {formatToUSD(props.amountUSD)}
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            {props.amount} {props.token}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TxnOverview;