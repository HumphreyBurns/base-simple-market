"use client";

import { useEffect, useState } from "react";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { PriceTag } from "@/components/price-tag";
import { StatusChip } from "@/components/status-chip";
import { WalletButton } from "@/components/wallet-button";
import { formatAddress } from "@/lib/format";
import { saveTrackedOrder } from "@/lib/local-orders";
import { marketAbi, marketContractAddress } from "@/lib/market-contract";
import { MarketProduct } from "@/lib/products";
import { useMarketProduct } from "@/lib/use-market-product";
import { trackTransaction } from "@/utils/track";

export function PurchasePanel({ product }: { product: MarketProduct }) {
  const { address, isConnected } = useAccount();
  const market = useMarketProduct(product);
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash });
  const [trackedHash, setTrackedHash] = useState<string | null>(null);

  useEffect(() => {
    if (!receipt.isSuccess || !hash || !address || trackedHash === hash) {
      return;
    }

    trackTransaction("app-001", "base-simple-market", address, hash);
    saveTrackedOrder({
      productId: product.id,
      txHash: hash,
      userAddress: address.toLowerCase(),
      timestamp: new Date().toISOString()
    });
    market.refetch();
    setTrackedHash(hash);
  }, [address, hash, market, product.id, receipt.isSuccess, trackedHash]);

  const handlePurchase = () => {
    writeContract({
      abi: marketAbi,
      address: marketContractAddress,
      functionName: "buy",
      value: market.priceWei || product.priceWei
    });
  };

  const isMockOnly = product.kind !== "onchain";
  const isPurchased = product.kind === "onchain" ? market.hasPurchased : false;

  return (
    <aside className="purchase-panel">
      <div>
        <StatusChip variant={isPurchased ? "success" : product.variant}>
          {isPurchased ? "你已经买过" : product.badge}
        </StatusChip>
      </div>
      <PriceTag priceWei={market.priceWei || product.priceWei} label="收银台" />
      <p className="purchase-copy">
        {isMockOnly
          ? "这张目录卡是展示位，保留路由和结构，后续可接新合约。"
          : "当前商品走真实合约 buy()，支付成功后会刷新状态并写入埋点。"}
      </p>

      <div className="purchase-summary">
        <div className="summary-row">
          <span>钱包</span>
          <strong>{isConnected && address ? formatAddress(address) : "未连接"}</strong>
        </div>
        <div className="summary-row">
          <span>已售</span>
          <strong>{market.soldCountText}</strong>
        </div>
        <div className="summary-row">
          <span>合约状态</span>
          <strong>{market.isLive ? "链上读取中/可用" : "目录预览"}</strong>
        </div>
      </div>

      {isMockOnly ? (
        <div className="txn-dialog">
          <StatusChip variant="preview">当前商品为预留展示位</StatusChip>
          <p className="helper-line">等后续拿到更多商品合约时，直接替换数据源即可。</p>
        </div>
      ) : !isConnected ? (
        <WalletButton />
      ) : (
        <div className="purchase-actions">
          <button
            type="button"
            className="status-button"
            onClick={handlePurchase}
            disabled={isPending || receipt.isLoading || isPurchased}
          >
            {isPurchased ? "已购买" : isPending || receipt.isLoading ? "支付处理中" : "立即购买"}
          </button>
        </div>
      )}

      {(hash || error || receipt.isSuccess) && !isMockOnly ? (
        <div className="txn-dialog">
          {isPending || receipt.isLoading ? <StatusChip variant="pending">等待链上确认</StatusChip> : null}
          {receipt.isSuccess ? <StatusChip variant="success">购买成功，收据已更新</StatusChip> : null}
          {error ? <StatusChip variant="sold">{error.message}</StatusChip> : null}
          {hash ? (
            <p className="helper-line">
              Tx Hash:
              <code>{hash}</code>
            </p>
          ) : null}
        </div>
      ) : null}
    </aside>
  );
}


