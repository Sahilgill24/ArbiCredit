import { Skeleton } from "@/components/ui/skeleton";

export const PortfolioOverviewSkeleton = () => {
  return (
    <>
      <Skeleton className="h-14 w-[60%] mb-4" />
      <Skeleton className="h-6 w-[40%] mb-8" />
      <Skeleton className="h-6 " />
    </>
  );
};

export const AssetChartSkeleton = () => {
  return (
    <Skeleton className="h-48 w-full" />
  );
}
