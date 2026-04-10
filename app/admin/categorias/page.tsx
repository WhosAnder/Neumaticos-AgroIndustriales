import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
} from "@/lib/admin-api"
import { fetchCategories as fetchPublicCategories } from "@/lib/api"
import { frontendFallbackCategories } from "@/lib/frontend-fallback-data"
import { CategoriesAdminClient } from "./categories-admin-client"

export const dynamic = "force-dynamic"

export default async function AdminCategoriasPage() {
  let categories = await getCategories().catch(() => [])

  if (categories.length === 0) {
    categories = await fetchPublicCategories().catch(() => [])
  }

  if (categories.length === 0) {
    categories = frontendFallbackCategories
  }

  return (
    <CategoriesAdminClient
      categories={categories}
      createAction={createCategory}
      updateAction={updateCategory}
      deleteAction={deleteCategory}
    />
  )
}
