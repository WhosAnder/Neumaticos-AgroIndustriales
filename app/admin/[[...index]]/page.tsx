import {
  fetchBrands,
  fetchCategories,
  fetchMachinery,
  fetchTires,
} from "@/lib/api"
import {
  frontendFallbackBrands,
  frontendFallbackCategories,
  frontendFallbackMachinery,
  frontendFallbackTires,
} from "@/lib/frontend-fallback-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Layers, Truck, CircleDot, Tag } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  let [categories, brands] = await Promise.all([
    fetchCategories().catch(() => []),
    fetchBrands().catch(() => []),
  ])

  let machinery: Array<{ slug: string }> = []
  let tires: Array<{ id: number }> = []

  if (categories.length === 0) {
    categories = frontendFallbackCategories
  }

  if (machinery.length === 0) {
    machinery = await fetchMachinery().catch(() => [])
  }
  if (machinery.length === 0) {
    machinery = frontendFallbackMachinery
  }

  if (tires.length === 0) {
    tires = await fetchTires().catch(() => [])
  }
  if (tires.length === 0) {
    tires = frontendFallbackTires
  }

  if (brands.length === 0) {
    brands = frontendFallbackBrands
  }

  const totalCategories = categories.length
  const totalMachinery = machinery.length
  const totalTires = tires.length
  const totalBrands = brands.length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Bienvenido al panel de administración</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/admin/categorias">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Categorías
              </CardTitle>
              <Layers className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCategories}</div>
              <p className="text-xs text-gray-500">Gestionar categorías</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/maquinaria">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Maquinaria
              </CardTitle>
              <Truck className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMachinery}</div>
              <p className="text-xs text-gray-500">Gestionar maquinaria</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/neumaticos">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Neumáticos
              </CardTitle>
              <CircleDot className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTires}</div>
              <p className="text-xs text-gray-500">Gestionar neumáticos</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/marcas">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Marcas
              </CardTitle>
              <Tag className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBrands}</div>
              <p className="text-xs text-gray-500">Gestionar marcas</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
