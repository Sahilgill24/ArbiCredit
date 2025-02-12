import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { CHAIN_DATA } from "@/lib/chain-data";
import { TokenBoxVariant } from "@/lib/types";
import { toTitleCase } from "@/lib/utils";
import { useSwapStore } from "@/stores/swap-store";
import { ChevronDown, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

const TokenSelector = ({ type }: TokenBoxVariant) => {
  const {
    fromChain,
    toChain,
    fromToken,
    toToken,
    setFromChain,
    setToChain,
    setFromToken,
    setToToken,
  } = useSwapStore();

  const fromTokenData = CHAIN_DATA.find(
    (token) => token.chain === fromChain && token.token === fromToken
  );

  const toTokenData = CHAIN_DATA.find(
    (token) => token.chain === toChain && token.token === toToken
  );

  const [search, setSearch] = useState("");

  const searchedData = CHAIN_DATA.filter((item) => {
    return item.token.toLowerCase().includes(search.toLowerCase());
  });

  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    console.log(`${fromChain} ${fromToken} ${toChain} ${toToken}`);
  }, [fromChain, fromToken, toChain, toToken]);

  return (
    <Dialog open={openSearch} onOpenChange={setOpenSearch}>
      <DialogTrigger>
        <button
          className="px-0 relative flex items-center justify-between border rounded-full
            bg-gradient-to-tr from-muted via-card to-accent border-b border-t
          "
        >
          {/* Avatar */}
          <div className="self-start">
            <div className="relative my-auto pl-1 flex items-center w-8 h-8">
              <img
                src={
                  type === "from"
                    ? fromTokenData?.tokenIcon
                    : toTokenData?.tokenIcon
                }
                className="w-6 h-6"
              />
              <img
                src={
                  type === "from"
                    ? fromTokenData?.chainIcon
                    : toTokenData?.chainIcon
                }
                className="w-4 h-4 border absolute -right-1 bottom-0 rounded-full"
              />
            </div>
          </div>
          <p className="ml-2 font-medium">
            {type === "from" ? fromToken.toUpperCase() : toToken.toUpperCase()}
          </p>
          <ChevronDown className="mx-1 text-muted-foreground" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Select token to{" "}
            <span className="text-primary font-extrabold tracking-wide uppercase">
              {" "}
              {type === "from" ? "sell" : "buy"}{" "}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="relative flex flex-row items-center">
          <Input
            type="text"
            placeholder="Search.."
            className="font-medium"
            defaultValue={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon className="absolute w-4 h-4 right-3 text-muted-foreground" />
        </div>

        <div className="h-[20rem] w-full overflow-y-scroll mt-2 space-y-2">
          {searchedData.map((item) => {
            return (
              <div
                key={`${item.token}-${item.chain}`}
                className={`w-full bg-card border-2 rounded-md cursor-pointer transition-all duration-150 hover:bg-base-300 ${
                  type === "from"
                    ? fromToken === item.token && fromChain === item.chain
                      ? "border-2 border-primary "
                      : ""
                    : toToken === item.token && toChain === item.chain
                    ? "border-2 border-primary "
                    : ""
                }`}
                onClick={() => {
                  if (type === "to") {
                    setToChain(item.chain);
                    setToToken(item.token);
                    console.log("to token changed");
                  } else {
                    setFromChain(item.chain);
                    setFromToken(item.token);
                    console.log("from token changed");
                  }
                  console.log("clicked", type);
                  setOpenSearch(false);
                }}
              >
                <div className="flex items-center gap-2 p-2">
                  <img
                    src={item.tokenIcon}
                    alt={item.token}
                    className="w-6 h-6 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">
                      {item.token.toUpperCase()}
                    </span>
                    <span className="text-xs text-white/70">
                      {toTitleCase(item.chain)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TokenSelector;
