import Image from "next/image";
import { MarketProduct } from "@/lib/products";
import { PriceTag } from "@/components/price-tag";
import { StatusChip } from "@/components/status-chip";

export function ProductHero({ product }: { product: MarketProduct }) {
  return (
    <section className="product-hero">
      <div className="hero-paper">
        <div className="hero-art">
          <Image src={product.image} alt={product.name} fill sizes="100vw" priority />
        </div>
        <div className="hero-meta">
          <StatusChip variant={product.variant}>{product.badge}</StatusChip>
          <h1>{product.name}</h1>
          <div className="meta-row">
            <PriceTag priceWei={product.priceWei} label="今日标价" />
            <StatusChip variant={product.stockStatus}>{product.stockText}</StatusChip>
          </div>
        </div>
      </div>
    </section>
  );
}

