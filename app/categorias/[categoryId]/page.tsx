import { fetchCategories, fetchMachineryByCategory } from "@/lib/api"
import { mapCategory, mapMachinery } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumb } from "@/components/breadcrumb"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ categoryId: string }>
}

export default async function MachineryPage({ params }: PageProps) {
  const { categoryId } = await params
  
  const [categories, machinery] = await Promise.all([
    fetchCategories(),
    fetchMachineryByCategory(categoryId)
  ])

  const category = categories.find(c => c.slug === categoryId)
  if (!category) {
    notFound()
  }

  const mappedCategory = mapCategory(category)
  const mappedMachinery = machinery.map(mapMachinery)

  return (
    <div className="px-4 py-6 md:px-8 lg:px-16 xl:px-24">
      <Breadcrumb categoryName={mappedCategory.nombre} />
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-black text-center mb-8">Catálogo</h2>

        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {mappedMachinery.map((machine) => (
            <Link key={machine.id} href={`/categorias/${categoryId}/${machine.id}`}>
              <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer rounded-2xl border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="h-24 flex items-center justify-center mb-4">
                    <Image
                      src={machine.imagen_url || "/placeholder.svg"}
                      alt={machine.nombre}
                      width={100}
                      height={80}
                      className="h-auto max-h-24 w-auto object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-black">{machine.nombre}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
