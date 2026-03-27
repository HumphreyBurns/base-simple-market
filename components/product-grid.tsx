import { MarketProduct } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export function ProductGrid({ products, compact = false }: { products: MarketProduct[]; compact?: boolean }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} compact={compact} />
      ))}
    </div>
  );
}

