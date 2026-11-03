import Link from "next/link";
import type { ReactNode } from "react";
import { Buddy } from "./Illustrations";

/** 相棒の吹き出し */
export function BuddySays({ children, size = 56, href }: { children: ReactNode; size?: number; href?: string }) {
  const bubble = <div className="bubble">{children}</div>;
  return (
    <div className="buddy-says">
      <Buddy size={size} />
      {href ? <Link href={href} className="bubble-link">{bubble}</Link> : bubble}
    </div>
  );
}
