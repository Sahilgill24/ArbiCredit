import { Button } from "@/components/ui/button";

const ConnectWallet = () => {
  const connectToWallet = async () => {
    // TODO: Connect to wallet
  };
  return (
    <Button className="w-full text-base" size={"lg"} onClick={connectToWallet}>
      Connect Wallet
    </Button>
  );
};

export default ConnectWallet;
