const items = [
  "精选货架已更新",
  "单商品合约已接入",
  "支持钱包购买",
  "订单页可回看收据",
  "店主页预留改价入口"
];

export function StoreTicker() {
  const content = [...items, ...items];

  return (
    <section className="ticker" aria-label="店铺播报">
      <div className="ticker-track">
        {content.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </section>
  );
}

