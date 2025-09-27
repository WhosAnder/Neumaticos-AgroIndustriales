"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Menu, X } from "lucide-react"

interface HeaderProps {
  currentPage: string
  setCurrentPage: (page: string) => void
  setSelectedCategory: (category: any) => void
  setSelectedMachinery: (machinery: any) => void
  isMenuOpen: boolean
  setIsMenuOpen: (open: boolean) => void
}

export function Header({
  currentPage,
  setCurrentPage,
  setSelectedCategory,
  setSelectedMachinery,
  isMenuOpen,
  setIsMenuOpen,
}: HeaderProps) {
  return (
    <header className="bg-white p-4 flex items-center justify-between w-full">
      <div className="flex items-center gap-3 px-4 md:px-8 lg:px-16 xl:px-24">
        <button
          onClick={() => {
            setCurrentPage("home")
            setSelectedCategory(null)
            setSelectedMachinery(null)
          }}
          className="focus:outline-none"
        >
          <Image
            src="/images/logo-horizontal.png"
            alt="Neumáticos Agroindustriales Logo"
            width={280}
            height={80}
            className="h-14 w-auto cursor-pointer hover:opacity-90 transition-opacity"
          />
        </button>
      </div>
      <div className="px-4 md:px-8 lg:px-16 xl:px-24">
        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
        <nav className="hidden lg:flex items-center gap-6">
          <Button
            onClick={() => {
              setCurrentPage("home")
              setSelectedCategory(null)
              setSelectedMachinery(null)
            }}
            className={`rounded-lg px-6 py-2 font-medium ${
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
            }}
            className={`rounded-lg px-6 py-2 font-medium ${
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
            }}
            className={`rounded-lg px-6 py-2 font-medium ${
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
            }}
            className={`rounded-lg px-6 py-2 font-medium ${
              currentPage === "contact" ? "bg-black text-white" : "bg-white text-black hover:bg-gray-100"
            }`}
          >
            Contacto
          </Button>
        </nav>
      </div>
    </header>
  )
}
