import { formatToUSD } from "@/lib/utils";

type PNLPercentageProps = {
  amountChangeInPercentage: number;
  totalAmount: number;
  variant?: 'small' | 'large';
};

const PNLPercentage = ({
  amountChangeInPercentage,
  totalAmount,
  variant = 'large',
}: PNLPercentageProps) => {
  const isNegative = amountChangeInPercentage < 0;
  const textClass = isNegative ? 'text-red-500' : 'text-emerald-500';
  const sizeClass = variant === 'small' ? 'text-sm' : 'text-base';
  const formattedAmount = formatToUSD(totalAmount * amountChangeInPercentage / 100);

  return (
    <span className={`${textClass} ${sizeClass} font-semibold`}>
      {isNegative ? (
        <>
          {amountChangeInPercentage.toFixed(2)}% ({formattedAmount})
        </>
      ) : (
        <>
          +{amountChangeInPercentage.toFixed(2)}% ({formattedAmount})
        </>
      )}
    </span>
  );
};

export default PNLPercentage;