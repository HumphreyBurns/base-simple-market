import Link from "next/link";
import { ProductGrid } from "@/components/product-grid";
import { SectionStamp } from "@/components/section-stamp";
import { StoreTicker } from "@/components/store-ticker";
import { featuredProducts, storefrontMetrics } from "@/lib/products";

export default function HomePage() {
  return (
    <div className="page home-page">
      <section className="motel-sign">
        <div className="sign-topline">BASE MINI MARKET</div>
        <h1>柜台今日开张</h1>
        <p>挑一个数字商品，钱包付款，马上收据入夹。</p>
        <div className="sign-actions">
          <Link href="/products" className="ticket-button">
            进店看看
          </Link>
          <Link href="/orders" className="ticket-button alt">
            我的票据
          </Link>
        </div>
      </section>

      <StoreTicker />

      <section className="counter-panel">
        <SectionStamp label="精选货架" />
        <div className="counter-grid">
          <article className="counter-note">
            <span>今日在售</span>
            <strong>{storefrontMetrics.liveCount}</strong>
          </article>
          <article className="counter-note">
            <span>小店风格</span>
            <strong>复古目录</strong>
          </article>
          <article className="counter-note">
            <span>购买方式</span>
            <strong>Base 付款</strong>
          </article>
        </div>
      </section>

      <section className="paper-stack">
        <div className="section-row">
          <SectionStamp label="本周精选" />
          <Link href="/products" className="inline-link">
            全部商品
          </Link>
        </div>
        <ProductGrid products={featuredProducts} compact />
      </section>

      <section className="receipt-banner">
        <div>
          <span>店主想上新？</span>
          <strong>去上架台填写商品信息</strong>
        </div>
        <Link href="/owner" className="mini-link">
          Owner 页面
        </Link>
      </section>
    </div>
  );
}

