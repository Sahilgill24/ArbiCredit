import Layout from "@/components/utils/layout";
import Portfolio from "@/components/portfolio";
import { useAccount, useConnect } from "wagmi";
import { Button } from "@/components/ui/button";

const PortfolioPage = () => {
  

  return (
    <Layout>

      <Portfolio />
    </Layout>
  );
};

export default PortfolioPage;
