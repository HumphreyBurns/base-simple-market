import { OwnerProductForm } from "@/components/owner-product-form";
import { SectionStamp } from "@/components/section-stamp";

export default function OwnerPage() {
  return (
    <div className="page owner-page">
      <section className="owner-counter">
        <SectionStamp label="店主上架台" />
        <h1>店主操作区</h1>
        <p>当前合约是单商品售卖模式，这里保留改价与后续上新结构。</p>
      </section>
      <OwnerProductForm />
    </div>
  );
}

