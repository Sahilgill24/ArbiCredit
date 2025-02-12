import { TokenBoxVariant } from "@/lib/types";
import TokenSelector from "./token-selector";
import Metadata from "./metadata";
import { useCentralStore } from "@/hooks/central-store";
import { useState } from "react";

export default function TokenInput({ type }: TokenBoxVariant) {
  const { fromAmount, toAmount, setFromAmount, setToAmount } =
    useCentralStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <div className="flex-1 bg-base-100 rounded-md p-3">
      <div className="flex gap-2 items-center">
        <>
          {type === "from" ? (
            <AmountInput
              placeholder={"0.00"}
              type="number"
              onChange={(e) => setFromAmount(e.target.value)}
              value={fromAmount}
              error={error}
              errorMessage={errorMessage}
            />
          ) : loading ? (
            <SwapAmountSkeleton />
          ) : (
            <AmountInput
              placeholder="0.00"
              value={toAmount === "--" ? "--" : Number(toAmount).toFixed(4)}
              readOnly
            />
          )}
        </>
        <TokenSelector type={type} />
      </div>
      <Metadata type={type} />
    </div>
  );
}

interface AmountInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: boolean;
  errorMessage?: string;
}

function AmountInput({
  className,
  error = false,
  errorMessage,
  ...props
}: AmountInputProps) {
  return (
    <div className="my-2">
      <input
        className={`bg-transparent font-medium w-full text-3xl py-2 outline-none transition-all duration-300 disabled:cursor-not-allowed disabled:text-muted-foreground disabled:brightness-50 ${className} ${
          error && "border-b-2 border-b-error text-error"
        }`}
        type="number"
        pattern="^-?[0-9]\d*\.?\d*$"
        {...props}
      />
      {error && errorMessage && (
        <span className="text-error text-xs mt-1">{errorMessage}</span>
      )}
    </div>
  );
}

function SwapAmountSkeleton() {
  return <div className="skeleton h-10 my-4 w-[250px]" />;
}