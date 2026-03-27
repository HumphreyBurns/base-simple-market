import { formatPriceEth } from "@/lib/format";

export function PriceTag({ priceWei, label = "Price" }: { priceWei: bigint; label?: string }) {
  return (
    <div className="price-tag">
      <span>{label}</span>
      <strong>{formatPriceEth(priceWei)}</strong>
    </div>
  );
}

