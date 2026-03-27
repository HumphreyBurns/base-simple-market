import { parseEther } from "viem";
import { marketContractAddress } from "@/lib/market-contract";

export type ProductVariant = "live" | "preview";
export type ProductState = "live" | "preview" | "sold";

export type MarketProduct = {
  id: string;
  name: string;
  teaser: string;
  description: string;
  image: string;
  priceWei: bigint;
  category: string;
  delivery: string;
  note: string;
  badge: string;
  variant: ProductVariant;
  stockStatus: ProductState;
  stockText: string;
  kind: "onchain" | "mock";
  contractAddress?: `0x${string}`;
};

export const onchainProduct: MarketProduct = {
  id: "vintage-access-pass",
  name: "Vintage Access Pass",
  teaser: "一张主打快速购买的数字通行票，链上在售。",
  description: "这是当前接入真实合约的在售商品。价格、已购状态、已售数量都会从 Base 合约读取。",
  image: "/images/product-live.svg",
  priceWei: parseEther("0.0001"),
  category: "数字通行票",
  delivery: "购买后链上记账，后续可扩展内容下载或权益展示。",
  note: "当前合约只支持单商品售卖，所以这件商品是柜台主卖款。",
  badge: "LIVE ONCHAIN",
  variant: "live",
  stockStatus: "live",
  stockText: "正在售卖",
  kind: "onchain",
  contractAddress: marketContractAddress
};

export const allProducts: MarketProduct[] = [
  onchainProduct,
  {
    id: "roadside-catalog",
    name: "Roadside Catalog Card",
    teaser: "复古目录卡风格数字藏品，作为下一件商品预留位。",
    description: "这个详情页保留完整购买布局，但目前是展示位。后续接真实多商品合约时，直接替换数据源即可。",
    image: "/images/product-catalog.svg",
    priceWei: parseEther("0.0003"),
    category: "目录卡",
    delivery: "预留展示位",
    note: "为了保持多页面结构完整，这里提供真实可访问详情页。",
    badge: "SHELF PREVIEW",
    variant: "preview",
    stockStatus: "preview",
    stockText: "即将上架",
    kind: "mock"
  },
  {
    id: "receipt-club",
    name: "Receipt Club Stub",
    teaser: "像收银小票一样的数字凭证，轻量可收藏。",
    description: "用于展示小票式商品详情布局与价格信息层级，当前不触发合约支付。",
    image: "/images/product-receipt.svg",
    priceWei: parseEther("0.0002"),
    category: "票据凭证",
    delivery: "预留展示位",
    note: "后续可切换成真实第二件商品。",
    badge: "COUNTER HOLD",
    variant: "preview",
    stockStatus: "preview",
    stockText: "柜台保留",
    kind: "mock"
  },
  {
    id: "motel-poster",
    name: "Motel Poster Download",
    teaser: "老式汽车旅馆海报下载券，适合做内容售卖入口。",
    description: "页面继续复用购买区与状态区，但按钮会显示为展示位，方便未来扩展内容型商品。",
    image: "/images/product-poster.svg",
    priceWei: parseEther("0.0004"),
    category: "下载券",
    delivery: "预留展示位",
    note: "用于丰富货架视觉层次，不让页面退化成单商品官网。",
    badge: "PREVIEW SLOT",
    variant: "preview",
    stockStatus: "preview",
    stockText: "目录展示",
    kind: "mock"
  }
];

export const featuredProducts = allProducts.slice(0, 3);

export const storefrontMetrics = {
  liveCount: 1,
  previewCount: allProducts.length - 1
};

export function getProductById(id: string) {
  return allProducts.find((product) => product.id === id);
}

