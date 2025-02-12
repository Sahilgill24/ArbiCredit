import { TokenBoxVariant } from "@/lib/types";
import { useCentralStore } from "@/hooks/central-store";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/debounce";
import { getPrice } from "@/lib/dataFetch";
import { useModalStore } from "@/hooks/modal-store";
export default function Metadata({ type }: TokenBoxVariant) {
  return (
    <div className="flex flex-row items-center justify-between">
      <AmountInUSD type={type} />
      <Balance type={type} />
    </div>
  );
}

function AmountInUSD({ type }: TokenBoxVariant) {
  const {
    fromAmount,
    toAmount,
    fromAmountUSD,
    toAmountUSD,
    fromChain,
    toChain,
    fromToken,
    toToken,
    setFromAmountUSD,
    setToAmountUSD,
  } = useCentralStore();
  const { fromToken: ft, toToken: tt } = useModalStore();

  const [loading, setLoading] = useState(false);
  const debounceAmount = useDebounce(
    type === "from" ? fromAmount : toAmount,
    1000
  );
  const token = type === "from" ? fromToken : toToken;
  const tokenPrice = type === "from" ? ft : tt;
  const amount = type === "from" ? fromAmount : toAmount;
  const chain = type === "from" ? fromChain : toChain;
  const setter = type === "from" ? setFromAmountUSD : setToAmountUSD;
  useEffect(() => {
    const fetchAmountInUSD = async () => {
      setLoading(true)
      console.log("called")
      console.log(amount, tokenPrice, chain)
      try {
        if (Number(amount) > 0 && tokenPrice) {
          console.log("here")
          const perToken = await getPrice(tokenPrice);
          setter(Number(amount) * perToken);
        } else {
          setter(0)
        }
      } catch (e) {
        setter(0)
      } finally {
        setLoading(false)
      }
    };
    fetchAmountInUSD();
  }, [debounceAmount, type, tokenPrice, chain]);

  return loading ? (
    <AmountLoadingSkeleton />
  ) : (
    <span className="text-xs">
      ${type === "from" ? fromAmountUSD.toFixed(2) : toAmountUSD.toFixed(2)}
    </span>
  );
}

function Balance({ type }: TokenBoxVariant) {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  const { fromToken, fromAmount, toAmount } = useCentralStore();
  useEffect(() => { }, [fromAmount, toAmount]);
  return loading ? (
    <BalanceLoadingSkeleton />
  ) : (
    <span className="text-xs">
      Balance: {balance.toFixed(2)} {fromToken?.name}{" "}
    </span>
  );
}


function AmountLoadingSkeleton() {
  return <div className="skeleton h-5 w-32" />;
}

function BalanceLoadingSkeleton() {
  return <div className="skeleton h-5 w-48" />;
}