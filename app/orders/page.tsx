import { OrderList } from "@/components/order-list";
import { SectionStamp } from "@/components/section-stamp";

export default function OrdersPage() {
  return (
    <div className="page orders-page">
      <section className="receipt-header">
        <SectionStamp label="收据夹" />
        <h1>我的购买记录</h1>
        <p>连接钱包后会显示你买过的商品和最新交易状态。</p>
      </section>
      <OrderList />
    </div>
  );
}

