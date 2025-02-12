import { ArrowDownUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SwapIcon() {
  return (
    <>
      <Button className="mx-auto w-12 h-12 -mb-10 z-10 rounded-full mt-1" variant={'metal'}>
        <ArrowDownUpIcon className="w-10" />
      </Button>
    </>
  );
}