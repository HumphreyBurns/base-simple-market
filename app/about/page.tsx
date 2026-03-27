import { SectionStamp } from "@/components/section-stamp";

const rules = [
  "付款金额与商品标价一致后，合约立即记账。",
  "每个钱包地址当前商品只可购买一次。",
  "链上交易成功后，订单页会刷新状态。",
  "更多 builder code / encoded string 位置已在代码中预留。"
];

export default function AboutPage() {
  return (
    <div className="page about-page">
      <section className="notice-board">
        <SectionStamp label="店规小告示" />
        <h1>购买说明</h1>
        <div className="rule-list">
          {rules.map((rule) => (
            <article key={rule} className="rule-card">
              {rule}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

