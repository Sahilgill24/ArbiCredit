import { type UserTransaction } from "@/lib/types";
import TxnOverview from "./txn-overview";
import TxnMetadata from "./txn-metadata";

const Transaction = (props: UserTransaction) => {
    return (
      <div className="w-full rounded-md border bg-gradient-to-bl from-accent/40 via-card to-muted/40 to-[100%] my-4">
        <TxnOverview {...props} />
        <TxnMetadata {...props} />
      </div>
    );
  };

export default Transaction