/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production"
// Si tu Pages será: https://WhosAnder.github.io/Neumaticos-AgroIndustriales
const repo = "Neumaticos-AgroIndustriales"

module.exports = {
  output: "export",
  images: { unoptimized: true },
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
}
