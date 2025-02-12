import { FuelIcon } from "lucide-react";
import { useState } from "react";
import { useCentralStore } from "@/hooks/central-store";
import { useModalStore } from "@/hooks/modal-store";


export default function TransactionDetails() {
  const [gasFees, setGasFees] = useState(0);

  const { fromToken, toToken } = useModalStore();
  const { fromAmount, toAmount } = useCentralStore();
  // central state se nikal
  const [dataFetched, setDataFetched] = useState(false);

  return (
    <>
      {dataFetched && (
        <div className="flex flex-row justify-between items-center text-sm py-2 px-3">
          <div>
            <span>{fromAmount} {fromToken} = {toAmount} {toToken}</span>
          </div>
          <div className="flex flex-row items-center gap-1">
            <FuelIcon size={12} />
            <span className="text-xs">${gasFees}</span>
          </div>
        </div>
      )}
    </>
  );
}
