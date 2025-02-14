import { Button } from "@/components/ui/button";
import { useSwapStore } from "@/stores/swap-store";
import { useState } from "react";
import ConnectWallet from "../connect-wallet";

const FromAddress = () => {
  const {
    walletConnected,
    activeAddress,
    setWalletConnected,
    setActiveAddress,
  } = useSwapStore();



  const handleOpenModal = () => {
    // TODO: open thirdweb modal
  };

  const [truncate, setTruncate] = useState<string>("sfgd");

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <p className="text-lg font-medium">Address</p>
        {walletConnected ? (
          <>       
          </>
        ) : (
          <ConnectWallet />
        )}
      </div>
    </>
  );
};

export default FromAddress;
