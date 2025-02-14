import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { CheckCircle, AlertTriangle, PlusIcon } from "lucide-react";
import { useSwapStore } from "@/stores/swap-store";
import { useState } from "react";

const ToAddress = () => {
  const { toChain, toToken } = useSwapStore();
  const isToTokenSelected = toChain && toToken !== "";

  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [verificationError, setVerificationError] = useState(false);

  return (
    <div className="flex flex-row justify-between items-end">
      <p className="text-lg">Lend</p>
      <Dialog>
        <DialogTrigger disabled={!isToTokenSelected}>
        
            
          

          
        </DialogTrigger>
        <DialogContent className="bg-card/20 *:bg-card/20 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle>Add Address</DialogTitle>
            <DialogDescription>
              Add a wallet address on <span>{toChain}</span> Chain
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-row gap-2">
            
          </div>
          {verificationError ? (
            <Alert
              className="transition-all duration-150"
              variant="destructive"
            >
              <AlertTriangle className="w-4 h-4" />
              <AlertDescription>Invalid {toChain} Address</AlertDescription>
            </Alert>
          ) : verified ? (
            <Alert className="transition-all duration-150">
              <CheckCircle className="w-4 h-4" />
              <AlertDescription className="text-sm">
                The address is a valid {toChain} address{" "}
                {/* <a href={getExplorerLink(toChain as Chain, address, sdk.testnet)}>
                  <u>here</u>
                </a> */}
              </AlertDescription>
            </Alert>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
};

function VerifiedSwapAddress({ address }: { address: string }) {
  const truncatedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
  return (
    <Button
      className="w-32 rounded-full border border-accent bg-gradient-to-tr from-secondary via-muted to-accent shadow-lg text-foreground"
      variant={"linkHover2"}
      size={"sm"}
    >
      {truncatedAddress}
    </Button>
  );
}

export default ToAddress;
