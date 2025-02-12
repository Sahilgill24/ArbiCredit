import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PNLPercentage, CopyAddress } from "@/components/portfolio/commons";
import { formatToUSD } from "@/lib/utils";
import { PortfolioOverviewSkeleton } from "./loading-skeletons";
import { Badge } from "@/components/ui/badge";
import { usePortfolioStore } from "@/stores/portfolio-store";
import { useState } from "react";

const PortfolioOverview = () => {
  const { assets, isLoading } = usePortfolioStore();
  const totalBalanceUSD = assets.reduce(
    (acc, asset) => acc + asset.balanceUSD,
    0
  );
  const tokens = assets.map((asset) => asset.token);
  
  // TODO: Update it dynamically
  const [pnlPercentageChange, setPnlPercentageChange] = useState(0.08);

  return (
    <Card className="w-3/5 bg-gradient-to-bl from-accent/40 via-card to-muted/40 to-[120%]">
      <CardHeader>
        <CardDescription className="font-semibold">
          Your Portfolio
        </CardDescription>
        <CardTitle>
          <CopyAddress address="0x1234567890" />
        </CardTitle>
      </CardHeader>
      {isLoading ? (
        <CardContent>
          <PortfolioOverviewSkeleton />
        </CardContent>
      ) : (
        <>
          <CardContent>
            <CardTitle className="text-6xl font-extrabold mb-2">
              {formatToUSD(totalBalanceUSD)}
            </CardTitle>
            <PNLPercentage
              totalAmount={totalBalanceUSD}
              amountChangeInPercentage={pnlPercentageChange}
            />
          </CardContent>
          <CardFooter className="flex flex-row gap-2">
            {tokens.map((token) => (
              <Badge key={token} variant={"outline"}>
                {token}
              </Badge>
            ))}
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default PortfolioOverview;
