"use client";

import { useMemo } from "react";
import { useAccount, useReadContracts } from "wagmi";
import { marketAbi } from "@/lib/market-contract";
import { MarketProduct } from "@/lib/products";

export function useMarketProduct(product: MarketProduct) {
  const { address } = useAccount();
  const enabled = product.kind === "onchain" && Boolean(product.contractAddress);

  const result = useReadContracts({
    allowFailure: true,
    query: { enabled },
    contracts: enabled
      ? [
          {
            abi: marketAbi,
            address: product.contractAddress!,
            functionName: "itemName"
          },
          {
            abi: marketAbi,
            address: product.contractAddress!,
            functionName: "price"
          },
          {
            abi: marketAbi,
            address: product.contractAddress!,
            functionName: "soldCount"
          },
          {
            abi: marketAbi,
            address: product.contractAddress!,
            functionName: "bought",
            args: [address ?? "0x0000000000000000000000000000000000000000"]
          }
        ]
      : []
  });

  const values = useMemo(() => {
    const [nameResult, priceResult, soldResult, boughtResult] = result.data ?? [];

    return {
      productName:
        enabled && nameResult?.status === "success" && typeof nameResult.result === "string"
          ? nameResult.result
          : product.name,
      priceWei:
        enabled && priceResult?.status === "success" && typeof priceResult.result === "bigint"
          ? priceResult.result
          : product.priceWei,
      soldCountText:
        enabled && soldResult?.status === "success" && typeof soldResult.result === "bigint"
          ? soldResult.result.toString()
          : "0",
      hasPurchased:
        enabled && boughtResult?.status === "success" && typeof boughtResult.result === "boolean"
          ? boughtResult.result
          : false
    };
  }, [enabled, product.name, product.priceWei, result.data]);

  return {
    ...values,
    isLive: enabled,
    refetch: result.refetch
  };
}

