import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { usePortfolioStore } from "@/stores/portfolio-store";
import { useMemo } from "react";
import { AssetChartSkeleton } from "./loading-skeletons";

export function AssetChart() {
  const { assets, isLoading } = usePortfolioStore();
  const totalBalanceUSD = assets.reduce(
    (acc, asset) => acc + asset.balanceUSD,
    0
  );
  
  // Ye dynamic hai, bahut maatha phoda hai iske liye
  const chartData = useMemo(() => {
    return assets.map((asset, index) => ({
      name: `${asset.token}`,
      value: asset.balanceUSD,
      fill: `hsl(${229 - ((index * 25) % 50)}, ${80 + ((index * 20) % 100)}%, ${
        60 + ((index * 50) % 50)
      }%)`,
    }));
  }, [assets]);

  return (
    <Card className="w-1/2 bg-gradient-to-br from-accent/40 via-card to-muted/40 to-[120%]">
      <CardHeader className={`${!isLoading && 'pb-0'}`}>
        <CardDescription className="font-semibold">
          Asset Overview
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        {isLoading ? (
          <AssetChartSkeleton />
        ) : (
          <ChartContainer config={{}} className="mx-auto">
            <PieChart>
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={62}
                strokeWidth={8}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalBalanceUSD}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total Value (in USD)
                          </tspan>
                        </text>
                      );
                    }
                    return null;
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
