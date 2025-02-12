import { ColumnDef } from "@tanstack/react-table";
import { UserAsset } from "@/lib/types";
import { formatToUSD } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const TokenColumns: ColumnDef<UserAsset>[] = [
  {
    header: "Token",
    cell: ({ row }) => {
      return (
        <div className="flex flex-row gap-4">
          <Avatar>
            {/* Make it dynamic as per the token */}
            <AvatarImage src="https://ethereum.org/_next/static/media/eth-diamond-purple-white.3e872b05.jpg" />
            <AvatarFallback>{row.original.token.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <p className="text-sm font-bold">
              {row.original.token.toUpperCase()}
            </p>
            <p className="text-xs font-medium text-muted-foreground">
              {row.original.chain}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    header: "Portfolio %",
    cell: ({ row, table }) => {
      const total = table
        .getCoreRowModel()
        .rows.reduce((acc, row) => acc + row.original.balanceUSD, 0);
      const percentage = (row.original.balanceUSD / total) * 100;
      return (
        <p className="text-accent-foreground font-semibold">
          {percentage.toFixed(2)}%
        </p>
      );
    },
  },
  {
    header: "Price (24h)",
    cell: ({ row }) => {
      return (
        <p className="text-muted-foreground font-semibold">
          {formatToUSD(row.original.balanceUSD / row.original.balance)}
        </p>
      );
    },
  },
  {
    header: "Balance",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-bold">
            {formatToUSD(row.original.balanceUSD)}
          </p>
          <p className="text-xs font-semibold text-accent-foreground">
            {row.original.balance.toFixed(3)} {row.original.token}
          </p>
        </div>
      );
    },
  },
];
