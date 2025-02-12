import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CopyAddress = ({
  address,
  className,
  description,
  iconPlacement = 'right',
}: {
  address: string;
  className?: string;
  description?: string;
  iconPlacement?: 'left' | 'right';
}) => {
  const truncatedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
  const { toast } = useToast();

  return (
    <p
      className={`text-lg text-accent-foreground inline-flex ${iconPlacement === 'left' && 'flex-row-reverse'} items-center gap-2 ${className}`}
    >
      {truncatedAddress}{" "}
      <span
        className="transition-all duration-300 hover:cursor-pointer hover:text-foreground"
        onClick={() => {
          navigator.clipboard.writeText(address);
          toast({
            description: description || "Address copied to clipboard",
          });
        }}
      >
        <Copy className="w-4 h-4" />
      </span>
    </p>
  );
};

export default CopyAddress;
