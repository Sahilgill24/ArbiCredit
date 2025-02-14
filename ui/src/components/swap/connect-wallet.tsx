import { Button } from "@/components/ui/button";
import { useAccount, useConnect } from "wagmi";


const ConnectWallet = () => {


  const { connectors, connect } = useConnect();
  const account = useAccount();
  return account.address ?
    (
      <h5 className="text-sm underline">{account.address}</h5>)
    : (<Button onClick={() => connect({ connector: connectors[0] })} className="w-[200px] flex ">
      Connect
    </Button>)


    ;
};

export default ConnectWallet;
