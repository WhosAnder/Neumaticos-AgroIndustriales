import { HomePage } from "@/components/pages/home-page"
import { fetchBrands, fetchCategories } from "@/lib/api"
import { frontendFallbackBrands, frontendFallbackCategories } from "@/lib/frontend-fallback-data"

export default async function Home() {
  let [brands, categories] = await Promise.all([
    fetchBrands().catch(() => []),
    fetchCategories().catch(() => [])
  ])
  
  if (brands.length === 0) {
    brands = frontendFallbackBrands
  }

  if (categories.length === 0) {
    categories = frontendFallbackCategories
  }

  return <HomePage brands={brands} categories={categories} />
}
