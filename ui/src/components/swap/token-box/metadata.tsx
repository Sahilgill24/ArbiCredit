import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/useDebounce";
import { TokenBoxVariant } from "@/lib/types";
import { useSwapStore } from "@/stores/swap-store";
import { useState } from "react";

const Metadata = ({ type }: TokenBoxVariant) => {
  return (
    <div className="flex flex-row justify-between">
      <AmountInUSD type={type} />
      <Balance type={type} />
    </div>
  );
};

const AmountInUSD = ({ type }: TokenBoxVariant) => {
  const {
    fromChain,
    fromToken,
    toChain,
    toToken,
    fromAmount,
    toAmount,
    setFromAmountUSD,
    setToAmountUSD,
    fromAmountUSD,
    toAmountUSD,
  } = useSwapStore();

  const [amountInUSD, setAmountInUSD] = useState(0);
  const [slippage, setSlippage] = useState(0);
  const debounceAmount = useDebounce(
    type === "from" ? fromAmount : toAmount,
    1000
  );

  const [loading, setLoading] = useState(false);

  const token = type === "from" ? fromToken : toToken;
  const amount = type === "from" ? fromAmount : toAmount;
  const chain = type === "from" ? fromChain : toChain;
  const setter = type === "from" ? setFromAmountUSD : setToAmountUSD;

  return (
    <>
      {loading ? (
        <AmountLoadingSkeleton />
      ) : (
        <p className="text-muted-foreground font-medium text-sm">
          ${amountInUSD.toFixed(2)}{" "}
          {type === "to" && (
            <span
              className={slippage > 0 ? "text-primary" : "text-destructive"}
            >
              ({slippage.toFixed(2)}%)
            </span>
          )}
        </p>
      )}
    </>
  );
};

const Balance = ({ type }: TokenBoxVariant) => {
  const [loading, setLoading] = useState(false);
  const { fromToken, toToken } = useSwapStore();
  const [balance, setBalance] = useState(0);

  return (
    <>
      {loading ? (
        <BalanceLoadingSkeleton />
      ) : (
        type === "from" && (
          <p className="text-sm font-medium text-muted-foreground">
            
            <span className="text-foreground font-bold">
              {balance.toFixed(4)}{" "}
              {type === "from" ? fromToken : toToken || "--"}
            </span>
          </p>
        )
      )}
    </>
  );
};

const AmountLoadingSkeleton = () => {
  return <Skeleton className="h-5 w-32" />;
};

const BalanceLoadingSkeleton = () => {
  return <Skeleton className="h-5 w-48" />;
};

export default Metadata;
