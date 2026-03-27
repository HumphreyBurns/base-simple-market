import { ReactNode } from "react";

type Variant = "live" | "preview" | "sold" | "success" | "pending";

export function StatusChip({
  children,
  variant = "preview"
}: {
  children: ReactNode;
  variant?: Variant;
}) {
  return <div className={`status-chip ${variant}`}>{children}</div>;
}

