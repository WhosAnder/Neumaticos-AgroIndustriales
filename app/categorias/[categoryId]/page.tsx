import { getMachineryByCategory, getCategoryById, getAllCategoryIds } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumb } from "@/components/breadcrumb"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ categoryId: string }>
}

export function generateStaticParams() {
  return getAllCategoryIds().map((id) => ({ categoryId: id }))
}

export default async function MachineryPage({ params }: PageProps) {
  const { categoryId } = await params
  const category = getCategoryById(categoryId)

  if (!category) {
    notFound()
  }

  const machinery = getMachineryByCategory(categoryId)

  return (
    <div className="px-4 py-6 md:px-8 lg:px-16 xl:px-24">
      <Breadcrumb />
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-black text-center mb-8">Catálogo</h2>

        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {machinery.map((machine) => (
            <Link key={machine.id} href={`/categorias/${categoryId}/${machine.id}`}>
              <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer rounded-2xl border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="h-24 flex items-center justify-center mb-4">
                    <Image
                      src={`/images/${machine.name}.png`}
                      alt={machine.id}
                      width={100}
                      height={80}
                      className="h-auto max-h-24 w-auto"
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-black">{machine.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
