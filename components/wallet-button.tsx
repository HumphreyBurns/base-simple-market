"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { formatAddress } from "@/lib/format";

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <button type="button" className="wallet-button secondary" onClick={() => disconnect()}>
        {formatAddress(address)}
      </button>
    );
  }

  const connector = connectors[0];

  return (
    <button
      type="button"
      className="wallet-button"
      onClick={() => connector && connect({ connector })}
      disabled={!connector || isPending}
    >
      {isPending ? "连接中" : "连接钱包"}
    </button>
  );
}

