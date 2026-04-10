import {
  createTire,
  updateTire,
  deleteTire,
  getTires,
  getMachinery,
  getBrands,
} from "@/lib/admin-api"
import {
  fetchBrands as fetchPublicBrands,
  fetchMachinery as fetchPublicMachinery,
  fetchTires as fetchPublicTires,
} from "@/lib/api"
import {
  frontendFallbackBrands,
  frontendFallbackCategories,
  frontendFallbackMachinery,
  frontendFallbackTires,
} from "@/lib/frontend-fallback-data"
import { TiresAdminClient } from "./tires-admin-client"

export const dynamic = "force-dynamic"

export default async function AdminNeumaticosPage() {
  let [tires, machinery, brands] = await Promise.all([
    getTires().catch(() => []),
    getMachinery().catch(() => []),
    getBrands().catch(() => []),
  ])

  if (brands.length === 0) {
    brands = await fetchPublicBrands().catch(() => [])
  }

  if (brands.length === 0) {
    brands = frontendFallbackBrands
  }

  if (machinery.length === 0) {
    machinery = await fetchPublicMachinery().catch(() => [])
  }

  if (machinery.length === 0) {
    machinery = frontendFallbackMachinery
  }

  if (tires.length === 0) {
    tires = await fetchPublicTires().catch(() => [])
  }

  if (tires.length === 0) {
    tires = frontendFallbackTires
  }

  return (
    <TiresAdminClient
      tires={tires}
      machinery={machinery}
      brands={brands}
      createAction={createTire}
      updateAction={updateTire}
      deleteAction={deleteTire}
    />
  )
}
