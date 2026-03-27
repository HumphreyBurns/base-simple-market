import Image from "next/image";
import Link from "next/link";
import { MarketProduct } from "@/lib/products";
import { PriceTag } from "@/components/price-tag";
import { StatusChip } from "@/components/status-chip";

export function ProductCard({ product, compact = false }: { product: MarketProduct; compact?: boolean }) {
  return (
    <Link href={`/products/${product.id}`} className="product-card">
      <div className="product-card-media">
        <Image src={product.image} alt={product.name} fill sizes={compact ? "50vw" : "100vw"} />
      </div>
      <header>
        <StatusChip variant={product.variant}>{product.badge}</StatusChip>
        <h3>{product.name}</h3>
        <p>{product.teaser}</p>
      </header>
      <div className="product-card-footer">
        <PriceTag priceWei={product.priceWei} label="柜台价" />
        <StatusChip variant={product.stockStatus}>{product.stockText}</StatusChip>
      </div>
    </Link>
  );
}

