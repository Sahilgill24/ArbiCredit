import { type UserTransaction } from "@/lib/types";
import { Calendar, Clock } from "lucide-react";
import { CopyAddress } from "@/components/portfolio/commons";
import { formatDate, formatTime } from "@/lib/utils";

const TxnMetadata = (props: UserTransaction) => {
  return (
    <div className="flex flex-row items-center justify-between w-full border-t bg-accent/40 text-accent-foreground py-3 pl-8 pr-9">
      <div className="flex flex-row gap-4 text-xs">
        <div className="flex flex-row gap-2 items-center">
          <span className="font-medium">
            <Calendar className="w-4 h-4" />
          </span>
          <span className="font-medium">{formatDate(props.timestamp)}</span>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <span className="font-medium">
            <Clock className="w-4 h-4" />
          </span>
          <span className="font-medium">{formatTime(props.timestamp)}</span>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <CopyAddress
          className="text-xs font-mono"
          address={props.address}
          iconPlacement="left"
        />
      </div>
    </div>
  );
};

export default TxnMetadata;