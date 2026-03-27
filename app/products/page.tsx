import { ProductGrid } from "@/components/product-grid";
import { SectionStamp } from "@/components/section-stamp";
import { allProducts } from "@/lib/products";

export default function ProductsPage() {
  return (
    <div className="page products-page">
      <section className="catalog-heading">
        <SectionStamp label="货架目录" />
        <h1>今日商品牌</h1>
        <p>点进商品卡，查看价格、简介和购买状态。</p>
      </section>
      <section className="catalog-board">
        <ProductGrid products={allProducts} />
      </section>
    </div>
  );
}

