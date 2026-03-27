export type TrackedOrder = {
  productId: string;
  txHash: string;
  userAddress: string;
  timestamp: string;
};

const STORAGE_KEY = "base-simple-market-orders";

export function loadTrackedOrders(): TrackedOrder[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TrackedOrder[]) : [];
  } catch {
    return [];
  }
}

export function saveTrackedOrder(order: TrackedOrder) {
  if (typeof window === "undefined") {
    return;
  }

  const current = loadTrackedOrders();
  const next = [order, ...current.filter((item) => item.txHash !== order.txHash)].slice(0, 12);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

