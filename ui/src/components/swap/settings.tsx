import { SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Settings() {
  return (
    <>
      <Button size={"icon"} className="rounded-full" variant={"secondary"}>
        {" "}
        <SettingsIcon className="w-6 h-6" />{" "}
      </Button>
    </>
  );
}