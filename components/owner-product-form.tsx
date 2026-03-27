"use client";

import { FormEvent, useMemo, useState } from "react";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { marketAbi, marketContractAddress } from "@/lib/market-contract";
import { formatPriceEth, parsePriceEth } from "@/lib/format";
import { WalletButton } from "@/components/wallet-button";
import { StatusChip } from "@/components/status-chip";

export function OwnerProductForm() {
  const { address, isConnected } = useAccount();
  const [title, setTitle] = useState("Vintage Access Pass");
  const [price, setPrice] = useState("0.0001");
  const [resource, setResource] = useState("https://example.com/download");
  const [draftSaved, setDraftSaved] = useState(false);
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash });

  const isKnownOwner = useMemo(
    () => address?.toLowerCase() === "0x0000000000000000000000000000000000000000",
    [address]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDraftSaved(true);
  };

  const handleSetPrice = () => {
    writeContract({
      abi: marketAbi,
      address: marketContractAddress,
      functionName: "setPrice",
      args: [parsePriceEth(price)]
    });
  };

  return (
    <section className="owner-form">
      <div className="helper-card">
        <strong>当前合约说明</strong>
        <p className="helper-line">
          这份合约只管理一个在售商品，适合做简洁售卖。上架表单先保存前端草稿，改价按钮走链上
          <code>setPrice</code>。
        </p>
      </div>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="title">商品标题</label>
          <input id="title" value={title} onChange={(event) => setTitle(event.target.value)} />
        </div>
        <div className="form-row">
          <label htmlFor="price">价格（ETH）</label>
          <input id="price" value={price} onChange={(event) => setPrice(event.target.value)} />
        </div>
        <div className="form-row">
          <label htmlFor="resource">交付链接</label>
          <input id="resource" value={resource} onChange={(event) => setResource(event.target.value)} />
        </div>
        <div className="form-row">
          <label htmlFor="note">店主备注</label>
          <textarea id="note" defaultValue="购买成功后显示下载方式，后续可替换成真实内容资源。" />
        </div>
        <div className="purchase-actions">
          <button type="submit" className="ticket-button">
            保存前端草稿
          </button>
          {isConnected ? (
            <button type="button" className="ticket-button alt" onClick={handleSetPrice} disabled={isPending}>
              链上改价
            </button>
          ) : (
            <WalletButton />
          )}
        </div>
      </form>

      <div className="helper-card">
        <strong>操作状态</strong>
        <div className="status-row">
          <StatusChip variant={draftSaved ? "success" : "preview"}>
            {draftSaved ? `草稿已保存：${title}` : "尚未保存草稿"}
          </StatusChip>
          <StatusChip variant={isKnownOwner ? "live" : "preview"}>
            {isKnownOwner ? "Owner 地址匹配" : "等待真实 owner 地址校准"}
          </StatusChip>
        </div>
        <p className="helper-line">预览价格：{formatPriceEth(parsePriceEth(price))}</p>
        <p className="helper-line">资源链接：{resource}</p>
        {hash ? (
          <p className="helper-line">
            改价交易：
            <code>{hash}</code>
          </p>
        ) : null}
        {receipt.isSuccess ? <StatusChip variant="success">改价交易已确认</StatusChip> : null}
        {error ? <p className="helper-line">错误：{error.message}</p> : null}
      </div>
    </section>
  );
}


