import { History } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TransactionHistory() {
  return (
    <>
      <Button size={"icon"} className="rounded-full" variant={"secondary"}>
        <History className="w-6 h-6" />
      </Button>
    </>
  );
}