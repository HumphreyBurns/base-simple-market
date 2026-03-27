import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductHero } from "@/components/product-hero";
import { PurchasePanel } from "@/components/purchase-panel";
import { SectionStamp } from "@/components/section-stamp";
import { getProductById } from "@/lib/products";

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="page detail-page">
      <div className="detail-back">
        <Link href="/products" className="mini-link">
          返回货架
        </Link>
      </div>
      <ProductHero product={product} />
      <section className="detail-columns">
        <article className="detail-copy paper-card">
          <SectionStamp label="商品说明" />
          <p>{product.description}</p>
          <dl className="detail-specs">
            <div>
              <dt>类型</dt>
              <dd>{product.category}</dd>
            </div>
            <div>
              <dt>交付</dt>
              <dd>{product.delivery}</dd>
            </div>
            <div>
              <dt>备注</dt>
              <dd>{product.note}</dd>
            </div>
          </dl>
        </article>
        <PurchasePanel product={product} />
      </section>
    </div>
  );
}

