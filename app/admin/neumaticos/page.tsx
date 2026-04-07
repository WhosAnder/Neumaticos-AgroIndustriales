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
  fetchCategories as fetchPublicCategories,
  fetchMachineryByCategory as fetchPublicMachineryByCategory,
  fetchTiresByMachinery as fetchPublicTiresByMachinery,
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
    let categories = await fetchPublicCategories().catch(() => [])
    if (categories.length === 0) {
      categories = frontendFallbackCategories
    }
    const machineryByCategory = await Promise.all(
      categories.map((category) => fetchPublicMachineryByCategory(category.slug).catch(() => []))
    )
    machinery = machineryByCategory.flat()
  }

  if (machinery.length === 0) {
    machinery = frontendFallbackMachinery
  }

  if (tires.length === 0 && machinery.length > 0) {
    const tiresByMachinery = await Promise.all(
      machinery.map((machine) => fetchPublicTiresByMachinery(machine.slug).catch(() => []))
    )
    tires = tiresByMachinery.flat()
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
