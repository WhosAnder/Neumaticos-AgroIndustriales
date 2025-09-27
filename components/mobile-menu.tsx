"use client"

import { Button } from "@/components/ui/button"

interface MobileMenuProps {
  isMenuOpen: boolean
  currentPage: string
  setCurrentPage: (page: string) => void
  setSelectedCategory: (category: any) => void
  setSelectedMachinery: (machinery: any) => void
  setIsMenuOpen: (open: boolean) => void
}

export function MobileMenu({
  isMenuOpen,
  currentPage,
  setCurrentPage,
  setSelectedCategory,
  setSelectedMachinery,
  setIsMenuOpen,
}: MobileMenuProps) {
  if (!isMenuOpen) return null

  return (
    <div className="lg:hidden bg-white p-4 shadow-lg mb-4">
      <nav className="flex flex-col gap-2">
        <Button
          onClick={() => {
            setCurrentPage("home")
            setSelectedCategory(null)
            setSelectedMachinery(null)
            setIsMenuOpen(false)
          }}
          className={`rounded-lg px-6 py-2 font-medium justify-start ${
            currentPage === "home" ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          Inicio
        </Button>
        <Button
          onClick={() => {
            setCurrentPage("categories")
            setSelectedCategory(null)
            setSelectedMachinery(null)
            setIsMenuOpen(false)
          }}
          className={`rounded-lg px-6 py-2 font-medium justify-start ${
            currentPage === "categories" ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          Categorías
        </Button>
        <Button
          onClick={() => {
            setCurrentPage("services")
            setSelectedCategory(null)
            setSelectedMachinery(null)
            setIsMenuOpen(false)
          }}
          className={`rounded-lg px-6 py-2 font-medium justify-start ${
            currentPage === "services" ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          Servicios
        </Button>
        <Button
          onClick={() => {
            setCurrentPage("contact")
            setSelectedCategory(null)
            setSelectedMachinery(null)
            setIsMenuOpen(false)
          }}
          className={`rounded-lg px-6 py-2 font-medium justify-start ${
            currentPage === "contact" ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          Contacto
        </Button>
      </nav>
    </div>
  )
}
