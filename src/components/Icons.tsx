import type { PurposeSlug } from "@/lib/types";

const common = { width: 30, height: 30, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export function PurposeIcon({ slug }: { slug: PurposeSlug }) {
  switch (slug) {
    case "work":
      return <svg {...common}><rect x="4" y="5" width="16" height="10" rx="1.5" /><path d="M2 19h20" /><path d="M10 9.5l-1.5 1.5 1.5 1.5M14 9.5l1.5 1.5-1.5 1.5" /></svg>;
    case "dog":
      return <svg {...common}><path d="M5 5.5 3.5 11l3 1" /><path d="M19 5.5 20.5 11l-3 1" /><path d="M6.5 7.5C8 5.8 9.8 5 12 5s4 .8 5.5 2.5V15a5.5 5.5 0 0 1-11 0z" /><circle cx="9.6" cy="11" r=".9" fill="currentColor" /><circle cx="14.4" cy="11" r=".9" fill="currentColor" /><path d="M11 14.5h2l-1 1.2z" fill="currentColor" /></svg>;
    case "kids":
      return <svg {...common}><path d="M4 6h3l2.5 8h9.5" /><path d="M9 6a7 7 0 0 1 11 6H10.5" /><circle cx="10" cy="18.5" r="1.6" /><circle cx="17" cy="18.5" r="1.6" /></svg>;
    case "party":
      return <svg {...common}><path d="M4 20h16" /><rect x="5" y="12" width="14" height="8" rx="1.5" /><path d="M5 15.5c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0" /><path d="M12 12V8.5" /><path d="M12 4.5c.9 1 .9 2.2 0 3-.9-.8-.9-2 0-3z" fill="currentColor" /></svg>;
  }
}
