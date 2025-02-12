import { Button } from "@/components/ui/button";
import { useSwapStore } from "@/stores/swap-store";
import { useState } from "react";

const FromAddress = () => {
  const {
    walletConnected,
    activeAddress,
    setWalletConnected,
    setActiveAddress,
  } = useSwapStore();

  const handleConnect = () => {
    // TODO: connect wallet from thirdweb
    setWalletConnected(true);
    setActiveAddress("0x1234567890");
  };

  const handleOpenModal = () => {
    // TODO: open thirdweb modal
  };

  const [truncate, setTruncate] = useState<string>("");

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <p className="text-lg font-medium">From</p>
        {walletConnected ? (
          <>
            {activeAddress !== "" ? (
              <Button
                className="w-32 rounded-full border border-accent bg-gradient-to-tr from-secondary via-muted to-accent shadow-lg text-foreground"
                variant={"linkHover2"}
                size={"sm"}
                onClick={handleOpenModal}
              >
                {truncate}
              </Button>
            ) : (
              <></>
            )}
          </>
        ) : (
          <Button
            className="w-32 rounded-full"
            size={"sm"}
            onClick={handleConnect}
          >
            Connect Wallet
          </Button>
        )}
      </div>
    </>
  );
};

export default FromAddress;
