"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "首页", icon: "门头" },
  { href: "/products", label: "商品", icon: "货架" },
  { href: "/orders", label: "订单", icon: "票据" },
  { href: "/owner", label: "店主", icon: "上架" },
  { href: "/about", label: "说明", icon: "告示" }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" aria-label="主导航">
      {items.map((item) => {
        const isActive = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} className={`nav-link${isActive ? " active" : ""}`}>
            <span>{item.icon}</span>
            <strong>{item.label}</strong>
          </Link>
        );
      })}
    </nav>
  );
}

