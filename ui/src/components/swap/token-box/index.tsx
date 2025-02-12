import { TokenBoxVariant } from "@/lib/types";
import TokenInput from "./token-input";
import Metadata from "./metadata";

const TokenBox = ({ type }: TokenBoxVariant) => {
  return (
    <div className="p-3 border bg-transparent rounded-md">
      <TokenInput type={type} />
      <Metadata type={type} />
    </div>
  );
};

export default TokenBox;
