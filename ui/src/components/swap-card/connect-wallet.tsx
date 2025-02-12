import { useAccount, useConnect } from "wagmi";

export default function ConnectWallet() {
  const { connect, connectors } = useConnect();
  const { address } = useAccount();

  return (
    <button
      className="btn btn-sm btn-primary rounded-full"
      onClick={() => connect({ connector: connectors[0] })}
    >
      {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect Wallet"}
    </button>
  );
}
