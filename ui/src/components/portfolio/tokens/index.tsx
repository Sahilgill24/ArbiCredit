import { DataTable } from "@/components/ui/data-table";
import { usePortfolioStore } from "@/stores/portfolio-store";
import { TableLoadingSkeleton } from "@/components/portfolio/commons";

import { TokenColumns } from "./token-columns";

const Tokens = () => {
  const { assets, isLoading } = usePortfolioStore();
  return isLoading ? (
    <TableLoadingSkeleton />
  ) : (
    <DataTable columns={TokenColumns} data={assets} />
  );
};

export default Tokens;
