"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { getCategoryById, getMachineryById } from "@/lib/data"

export function Breadcrumb() {
  const pathname = usePathname()

  if (pathname === "/") return null

  const segments = pathname.split("/").filter(Boolean)

  // Build the back link
  const getBackHref = () => {
    if (segments.length <= 1) return "/"
    return "/" + segments.slice(0, -1).join("/")
  }

  // Build breadcrumb label
  const getBreadcrumbLabel = () => {
    if (segments[0] === "categorias") {
      const categoryId = segments[1]
      const machineryId = segments[2]

      if (machineryId && categoryId) {
        const category = getCategoryById(categoryId)
        const machinery = getMachineryById(categoryId, machineryId)
        return `${category?.name || categoryId} > ${machinery?.name || machineryId} > Neumáticos`
      }
      if (categoryId) {
        const category = getCategoryById(categoryId)
        return `${category?.name || categoryId} > Maquinarias`
      }
      return "Categorías"
    }
    if (segments[0] === "servicios") return "Servicios"
    if (segments[0] === "contacto") return "Contacto"
    return ""
  }

  return (
    <div className="flex items-center gap-2 mb-6 text-black">
      <Link
        href={getBackHref()}
        className="text-black hover:text-gray-600 p-0 h-auto inline-flex items-center text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Volver
      </Link>
      <span className="text-gray-500">|</span>
      <span className="text-sm text-gray-700">{getBreadcrumbLabel()}</span>
    </div>
  )
}
