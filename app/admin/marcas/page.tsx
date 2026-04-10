import {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrands,
} from "@/lib/admin-api"
import { fetchBrands as fetchPublicBrands } from "@/lib/api"
import { frontendFallbackBrands } from "@/lib/frontend-fallback-data"
import { BrandsAdminClient } from "./brands-admin-client"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function AdminMarcasPage() {
  let brands = await getBrands().catch(() => [])

  if (brands.length === 0) {
    brands = await fetchPublicBrands().catch(() => [])
  }

  if (brands.length === 0) {
    brands = frontendFallbackBrands
  }

  return (
    <BrandsAdminClient
      brands={brands}
      createAction={createBrand}
      updateAction={updateBrand}
      deleteAction={deleteBrand}
    />
  )
}
