import {
  createMachinery,
  updateMachinery,
  deleteMachinery,
  getMachinery,
  getCategories,
} from "@/lib/admin-api"
import {
  fetchCategories as fetchPublicCategories,
  fetchMachineryByCategory as fetchPublicMachineryByCategory,
} from "@/lib/api"
import {
  frontendFallbackCategories,
  frontendFallbackMachinery,
} from "@/lib/frontend-fallback-data"
import { MachineryAdminClient } from "./machinery-admin-client"

export const dynamic = "force-dynamic"

export default async function AdminMaquinariaPage() {
  let [machinery, categories] = await Promise.all([
    getMachinery().catch(() => []),
    getCategories().catch(() => []),
  ])

  if (categories.length === 0) {
    categories = await fetchPublicCategories().catch(() => [])
  }

  if (categories.length === 0) {
    categories = frontendFallbackCategories
  }

  if (machinery.length === 0 && categories.length > 0) {
    const machineryByCategory = await Promise.all(
      categories.map((category) => fetchPublicMachineryByCategory(category.slug).catch(() => []))
    )
    machinery = machineryByCategory.flat()
  }

  if (machinery.length === 0) {
    machinery = frontendFallbackMachinery
  }

  return (
    <MachineryAdminClient
      machinery={machinery}
      categories={categories}
      createAction={createMachinery}
      updateAction={updateMachinery}
      deleteAction={deleteMachinery}
    />
  )
}
