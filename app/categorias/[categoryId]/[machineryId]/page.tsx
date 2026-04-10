import { fetchCategories, fetchMachineryByCategory, fetchTiresByMachinery, fetchBrands } from "@/lib/api"
import { mapCategory, mapMachinery, mapTire } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/breadcrumb"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

interface PageProps {
  params: Promise<{ categoryId: string; machineryId: string }>
}

export default async function TiresPage({ params }: PageProps) {
  const { categoryId, machineryId } = await params
  
  const [categories, machinery, tires, brands] = await Promise.all([
    fetchCategories(),
    fetchMachineryByCategory(categoryId),
    fetchTiresByMachinery(machineryId),
    fetchBrands()
  ])

  const category = categories.find(c => c.slug === categoryId)
  const machine = machinery.find(m => m.slug === machineryId)

  if (!category || !machine) {
    notFound()
  }

  const mappedCategory = mapCategory(category)
  const mappedMachinery = mapMachinery(machine)
  const mappedTires = tires.map(t => mapTire(t, brands))

  return (
    <div className="px-4 py-6 md:px-8 lg:px-16 xl:px-24">
      <Breadcrumb categoryName={mappedCategory.nombre} machineryName={mappedMachinery.nombre} />
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-black text-center mb-8">Neumáticos para {mappedMachinery.nombre}</h2>

        <div className="space-y-4">
          {mappedTires.map((tire) => (
            <Card key={tire.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 flex items-center gap-4">
                <Image
                  src={tire.imagen_url || "/placeholder.svg"}
                  alt={tire.nombre}
                  width={80}
                  height={80}
                  className="rounded-lg bg-gray-100"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-1">{tire.nombre}</h4>
                  <p className="text-gray-600 mb-1">{tire.marca_nombre}</p>
                  <div className="flex gap-2 mb-2">
                    <Badge variant="secondary">{tire.medida}</Badge>
                    <Badge variant="outline">{tire.patron}</Badge>
                  </div>
                  <div className="flex items-center justify-end">
                    <Button variant="link" className="text-red-600 p-0 h-auto font-semibold">
                      Ver detalles <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {mappedTires.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">No hay neumáticos disponibles para esta maquinaria en este momento.</p>
              <Link href="/servicios">
                <Button className="mt-4 bg-red-600 hover:bg-red-700 text-white">
                  Solicitar asesoría
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
