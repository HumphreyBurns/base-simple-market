"use client";

import Link from "next/link";
import { useAccount } from "wagmi";
import { getProductById, onchainProduct } from "@/lib/products";
import { useMarketProduct } from "@/lib/use-market-product";
import { formatAddress, formatRelativeTime } from "@/lib/format";
import { loadTrackedOrders } from "@/lib/local-orders";
import { StatusChip } from "@/components/status-chip";
import { WalletButton } from "@/components/wallet-button";

export function OrderList() {
  const { address, isConnected } = useAccount();
  const market = useMarketProduct(onchainProduct);
  const localOrders = loadTrackedOrders();

  if (!isConnected) {
    return (
      <section className="receipt-list">
        <div className="empty-state">
          <strong>先连钱包，再翻收据夹。</strong>
          <p>连接后会检查你是否已购买链上商品。</p>
          <WalletButton />
        </div>
      </section>
    );
  }

  const hasOnchainOrder = Boolean(market.hasPurchased);
  const orders = localOrders
    .filter((item) => item.userAddress === address?.toLowerCase())
    .sort((a, b) => Number(new Date(b.timestamp)) - Number(new Date(a.timestamp)));

  return (
    <section className="receipt-list">
      <div className="panel-head">
        <div>
          <strong>{formatAddress(address)}</strong>
          <div className="receipt-meta">钱包已连接</div>
        </div>
        <StatusChip variant={hasOnchainOrder ? "success" : "preview"}>
          {hasOnchainOrder ? "已购链上商品" : "暂无链上购买"}
        </StatusChip>
      </div>

      <div className="order-cards">
        {hasOnchainOrder ? (
          <article className="receipt-row">
            <div className="receipt-head">
              <div>
                <strong>{market.productName || onchainProduct.name}</strong>
                <div className="receipt-meta">合约商品</div>
              </div>
              <StatusChip variant="success">链上已确认</StatusChip>
            </div>
            <div className="receipt-line" />
            <div className="receipt-meta">合约：{onchainProduct.contractAddress}</div>
            <div className="receipt-meta">购买人：{formatAddress(address)}</div>
          </article>
        ) : null}

        {orders.map((order) => {
          const product = getProductById(order.productId);
          return (
            <article key={order.txHash} className="receipt-row">
              <div className="receipt-head">
                <div>
                  <strong>{product?.name ?? "base-simple-market 商品"}</strong>
                  <div className="receipt-meta">{formatRelativeTime(order.timestamp)}</div>
                </div>
                <StatusChip variant="success">交易已记录</StatusChip>
              </div>
              <div className="receipt-line" />
              <div className="receipt-meta">
                Tx：<code>{order.txHash}</code>
              </div>
            </article>
          );
        })}
      </div>

      {!hasOnchainOrder && orders.length === 0 ? (
        <div className="empty-state">
          <strong>这本收据夹还是空的。</strong>
          <p>去货架挑一个商品，买完会回到这里。</p>
          <Link href="/products" className="ticket-button">
            去选商品
          </Link>
        </div>
      ) : null}
    </section>
  );
}

