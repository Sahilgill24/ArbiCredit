import PortfolioOverview from "./portfolio-overview";
import { AssetChart } from "./asset-chart";

const Overview = () => {
  return (
    <div className="flex flex-row gap-2 h-[18rem]">
      <PortfolioOverview />
      <AssetChart />
    </div>
  );
};

export default Overview;
