import Link from "next/link";
import { WalletButton } from "@/components/wallet-button";

export function RetroHeader() {
  return (
    <header className="retro-header">
      <Link href="/" className="brand-badge">
        <strong>base-simple-market</strong>
        <span>simple goods / quick buy</span>
      </Link>
      <WalletButton />
    </header>
  );
}

