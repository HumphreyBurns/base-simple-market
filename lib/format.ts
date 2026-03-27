import { formatEther, parseEther } from "viem";

export function formatPriceEth(value: bigint) {
  return `${Number(formatEther(value)).toFixed(4)} ETH`;
}

export function parsePriceEth(value: string) {
  try {
    return parseEther(value || "0");
  } catch {
    return 0n;
  }
}

export function formatAddress(address?: string) {
  if (!address) {
    return "未连接";
  }

  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatRelativeTime(timestamp: string) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 1000 / 60);

  if (minutes < 1) {
    return "刚刚";
  }

  if (minutes < 60) {
    return `${minutes} 分钟前`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} 小时前`;
  }

  return `${Math.floor(hours / 24)} 天前`;
}

