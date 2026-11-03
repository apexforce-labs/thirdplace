/** ロゴマーク：にっこり笑う地図のピン */
export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path d="M16 30.5c-1-1.6-11-11.2-11-17.8a11 11 0 0 1 22 0c0 6.6-10 16.2-11 17.8z" fill="var(--pink)" stroke="var(--edge)" strokeWidth="2.2" strokeLinejoin="round" />
      <circle cx="12.3" cy="11.5" r="1.7" fill="#ffffff" />
      <circle cx="19.7" cy="11.5" r="1.7" fill="#ffffff" />
      <path d="M11.8 15.6a4.6 4.6 0 0 0 8.4 0" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
