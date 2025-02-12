import { Button } from "@/components/ui/button";
import { useAccount, useConnect } from "wagmi";


const ConnectWallet = () => {


  const { connectors, connect } = useConnect();
  const account = useAccount();
  return (
    <div className="flex flex-col w-full absolute pt-4 gap-7 justify-center items-center">
      {account.address ?
        <h5 className="text-sm underline">{account.address}</h5>
        : <Button onClick={() => connect({ connector: connectors[0] })} className="w-[200px] flex ">
          Connect
        </Button>}
    </div>
  );
};

export default ConnectWallet;
