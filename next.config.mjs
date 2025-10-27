/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repo = "Neumaticos-AgroIndustriales";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
};

export default nextConfig;
