import { TokenBoxVariant } from "@/lib/types";
import { UI_CHAIN_ICONS, UI_TOKEN_ICONS } from "@/lib/ui-icon-mappings";
import { CHAIN_DATA } from "@/lib/chain-data";
import { ChevronDown } from "lucide-react";
import { useModalStore } from "@/hooks/modal-store";
import { useEffect, useState } from "react";

function titleCase(str: any) {
  str = str.toLowerCase().split(" ");
  for (let i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
}

export default function TokenSelector({ type }: TokenBoxVariant) {
  const {
    fromChain,
    toChain,
    fromToken,
    toToken,
    setFromChain,
    setToChain,
    setFromToken,
    setToToken,
  } = useModalStore();

  const fromTokenData = CHAIN_DATA.find(
    (token) => token.chain === fromChain && token.token === fromToken
  );

  const toTokenData = CHAIN_DATA.find(
    (token) => token.chain === toChain && token.token === toToken
  );
  const tokeIcon = type === "from" ? fromTokenData?.tokenIcon : toTokenData?.tokenIcon;
  const chainIcon = type === "from" ? fromTokenData?.chainIcon : toTokenData?.chainIcon;
  const setter = type === "from" ? setFromToken : setToToken;
  const token = type === "from" ? fromToken : toToken;
  const chainSetter = type === "from" ? setFromChain : setToChain;

  const [search, setSearch] = useState("");

  const searchedData = CHAIN_DATA.filter((item) => {
    return item.token.toLowerCase().includes(search.toLowerCase());
  })

  useEffect(() => {
  }, [fromChain, fromToken, toChain, toToken]);

  return (
    <>
      <button
        className="w-32 py-1.5 bg-base-200 rounded-full relative flex items-center justify-between"
        onClick={() => {
          document.getElementById("token-selector-dialog")?.showModal();
        }}
      >
        {/* Avatar */}
        <div className="self-start">
          <div className="relative my-auto pl-2 flex items-center w-8 h-8">
            <img
              src={tokeIcon}
              className="w-6 h-6"
            />
            <img
              src={chainIcon}
              className="w-4 h-4 border absolute -right-1 bottom-0 rounded-full"
            />
          </div>
        </div>
        <p className="ml-3">
          {token.toUpperCase()}
        </p>
        <ChevronDown className="mr-2" />
      </button>
      <dialog id="token-selector-dialog" className="modal">
        <div className="modal-box">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>

          <div className="h-[20rem] w-full pr-2 overflow-auto mt-4 space-y-1">
            {searchedData.map((item) => {
              return (
                <div
                  key={`${item.token}-${item.chain}`}
                  className={`w-full bg-base-200 rounded-md cursor-pointer transition-all duration-150 hover:bg-base-300 ${type === "from"
                      ? fromToken === item.token && fromChain === item.chain
                        ? "border border-primary bg-base-300"
                        : ""
                      : toToken === item.token && toChain === item.chain
                        ? "border border-primary bg-base-300"
                        : ""
                    }`}
                  onClick={() => {
                    setter(item.token);
                    chainSetter(item.chain);
                    document.getElementById("token-selector-dialog")?.close();
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
                        {titleCase(item.chain)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </dialog>
    </>
  );
}