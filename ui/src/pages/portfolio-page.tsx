import Layout from "@/components/utils/layout";
import Portfolio from "@/components/portfolio";
import { useAccount, useConnect } from "wagmi";
import { Button } from "@/components/ui/button";

const PortfolioPage = () => {
  const { connectors, connect } = useConnect();
  const account = useAccount();

  return (
    <Layout>
      <div className="flex flex-col w-full absolute pt-4 gap-7 justify-center items-center">
        {account.address ?
          <h5 className="text-sm underline">Wallet Address: {account.address}</h5>
          : <Button onClick={() => connect({ connector: connectors[0] })} className="w-[200px] flex ">
            Connect
          </Button>}
      </div>
      <Portfolio />
    </Layout>
  );
};

export default PortfolioPage;
