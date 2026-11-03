import type { NextConfig } from "next";

// EXPORT=1 のときは静的HTMLとして書き出す（プレビュー共有用）
const isExport = process.env.EXPORT === "1";

const config: NextConfig = {
  ...(isExport ? { output: "export", trailingSlash: true, images: { unoptimized: true } } : {}),
};

export default config;
