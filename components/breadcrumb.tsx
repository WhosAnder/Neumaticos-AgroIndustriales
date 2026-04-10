"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft } from "lucide-react"

interface BreadcrumbProps {
  categoryName?: string
  machineryName?: string
}

export function Breadcrumb({ categoryName, machineryName }: BreadcrumbProps) {
  const pathname = usePathname()

  if (pathname === "/") return null

  const segments = pathname.split("/").filter(Boolean)

  const getBackHref = () => {
    if (segments.length <= 1) return "/"
    return "/" + segments.slice(0, -1).join("/")
  }

  const getBreadcrumbLabel = () => {
    if (segments[0] === "categorias") {
      if (machineryName && categoryName) {
        return `${categoryName} > ${machineryName} > Neumáticos`
      }
      if (categoryName) {
        return `${categoryName} > Maquinarias`
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
