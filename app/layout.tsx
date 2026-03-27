import type { ReactNode } from "react";
import "./globals.css";
import { AppProviders } from "@/components/app-providers";
import { BottomNav } from "@/components/bottom-nav";
import { RetroHeader } from "@/components/retro-header";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="base:app_id" content="69c4feb9b1b1fd3a23364cde" />
        <meta
          name="talentapp:project_verification"
          content="3faf44b90cfdee4edf21375a819a4f420d94d1cecfa9c6b09d40ac6da5e6035fef0210ec426d195c5ee1dee15e92fe293c8c0cf0e1b527b60e4a5c49a78c2591"
        />
        <title>base-simple-market</title>
        <meta name="description" content="简单商品上架 / 购买" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body>
        <AppProviders>
          <div className="app-shell">
            <RetroHeader />
            <main className="page-shell">{children}</main>
            <BottomNav />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}

