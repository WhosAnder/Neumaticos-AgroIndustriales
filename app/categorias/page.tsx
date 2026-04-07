import { fetchCategories } from "@/lib/api"
import { mapCategory } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumb } from "@/components/breadcrumb"
import Image from "next/image"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function CategoriasPage() {
  const categories = await fetchCategories()
  const mappedCategories = categories.map(mapCategory)

  return (
    <div className="px-4 py-6 md:px-8 lg:px-16 xl:px-24">
      <Breadcrumb />
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-black text-center mb-8">Categorías</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mappedCategories.map((category) => (
            <Link key={category.id} href={`/categorias/${category.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl font-bold">{category.nombre}</CardTitle>
                  <p className="text-gray-600">{category.descripcion}</p>
                </CardHeader>
                <CardContent className="p-0">
                  <Image
                    src={category.imagen_url || "/placeholder.svg"}
                    alt={`Maquinaria ${category.nombre.toLowerCase()}`}
                    width={600}
                    height={300}
                    className="w-full h-48 md:h-64 object-cover"
                  />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
