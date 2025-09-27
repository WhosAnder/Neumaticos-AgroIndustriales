"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface BreadcrumbProps {
  currentPage: string
  selectedCategory: string | null
  selectedMachinery: string | null
  setSelectedMachinery: (machinery: any) => void
  setSelectedCategory: (category: any) => void
  setCurrentPage: (page: string) => void
  machineryByCategory: any
}

export function Breadcrumb({
  currentPage,
  selectedCategory,
  selectedMachinery,
  setSelectedMachinery,
  setSelectedCategory,
  setCurrentPage,
  machineryByCategory,
}: BreadcrumbProps) {
  if (currentPage === "home") return null

  return (
    <div className={`flex items-center gap-2 mb-6 ${currentPage === "home" ? "text-white" : "text-black"}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          if (selectedMachinery) {
            setSelectedMachinery(null)
          } else if (selectedCategory) {
            setSelectedCategory(null)
          } else {
            setCurrentPage("home")
          }
        }}
        className={`${currentPage === "home" ? "text-white hover:text-gray-300" : "text-black hover:text-gray-600"} p-0 h-auto`}
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Volver
      </Button>
      <span className={currentPage === "home" ? "text-gray-400" : "text-gray-500"}>|</span>
      <span className={`text-sm ${currentPage === "home" ? "text-white" : "text-gray-700"}`}>
        {selectedMachinery
          ? `${selectedCategory?.charAt(0).toUpperCase() + selectedCategory?.slice(1)} > ${machineryByCategory[selectedCategory]?.find((m: any) => m.id === selectedMachinery)?.name} > Neumáticos`
          : selectedCategory
            ? `${selectedCategory?.charAt(0).toUpperCase() + selectedCategory?.slice(1)} > Maquinarias`
            : currentPage === "categories"
              ? "Categorías"
              : currentPage === "services"
                ? "Servicios"
                : currentPage === "contact"
                  ? "Contacto"
                  : ""}
      </span>
    </div>
  )
}
