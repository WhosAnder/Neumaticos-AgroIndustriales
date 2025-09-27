"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, Settings, Truck, Construction } from "lucide-react"

// Import components
import { Header } from "@/components/header"
import { MobileMenu } from "@/components/mobile-menu"
import { Breadcrumb } from "@/components/breadcrumb"
import { Footer } from "@/components/footer"
import { HomePage } from "@/components/pages/home-page"
import { CategoriesPage } from "@/components/pages/categories-page"
import { MachineryPage } from "@/components/pages/machinery-page"
import { TiresPage } from "@/components/pages/tires-page"
import { ServicesPage } from "@/components/pages/services-page"
import { ContactPage } from "@/components/pages/contact-page"

export default function NeumaticoApp() {
  const [currentPage, setCurrentPage] = useState("home")
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedMachinery, setSelectedMachinery] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const categories = [
    {
      id: "agricola",
      name: "Agrícola",
      description: "Neumáticos especializados para maquinaria agrícola",
      image: "/images/agricultural-machinery-new.png",
    },
    {
      id: "industrial",
      name: "Industrial",
      description: "Neumáticos para maquinaria industrial y construcción",
      image: "/images/industrial-machinery.png",
    },
  ]

  const machineryByCategory = {
    agricola: [
      {
        id: "tractor",
        name: "Tractor agrícola",
        icon: Construction,
        description: "Neumáticos para tractores agrícolas",
      },
      { id: "implemento", name: "Implemento (Empacadora)", icon: Truck, description: "Neumáticos para empacadoras" },
      { id: "trilladora", name: "Trilladora", icon: Construction, description: "Neumáticos para trilladoras" },
      {
        id: "minicargador-agricola",
        name: "Minicargador",
        icon: Truck,
        description: "Neumáticos para minicargadores agrícolas",
      },
    ],
    industrial: [
      { id: "grua", name: "Grúa", icon: Construction, description: "Neumáticos para grúas" },
      { id: "montacargas", name: "Montacargas", icon: Truck, description: "Neumáticos para montacargas" },
      { id: "cargador", name: "Cargador", icon: Construction, description: "Neumáticos para cargadores" },
      { id: "retroexcavadora", name: "Retroexcavadora", icon: Truck, description: "Neumáticos para retroexcavadoras" },
      {
        id: "vibrocompactador",
        name: "Vibro compactador",
        icon: Construction,
        description: "Neumáticos para vibro compactadores",
      },
      {
        id: "motoconformadora",
        name: "Motoconformadora",
        icon: Truck,
        description: "Neumáticos para motoconformadoras",
      },
      { id: "camion", name: "Camión", icon: Construction, description: "Neumáticos para camiones" },
      {
        id: "camion-muevetierra",
        name: "Camión muevetierra",
        icon: Truck,
        description: "Neumáticos para camiones muevetierra",
      },
      {
        id: "minicargador-industrial",
        name: "Minicargador",
        icon: Construction,
        description: "Neumáticos para minicargadores industriales",
      },
    ],
  }

  const tiresByMachinery = {
    tractor: [
      {
        id: 1,
        name: "Neumático agrícola 15.5-38 RTW",
        brand: "Seba Ultra",
        size: "15.5-38",
        pattern: "RTW",
        price: "$1,250",
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 2,
        name: "Neumático agrícola 18.4-34",
        brand: "Firestone",
        size: "18.4-34",
        pattern: "R-1",
        price: "$1,450",
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 3,
        name: "Neumático agrícola 16.9-30",
        brand: "Michelin",
        size: "16.9-30",
        pattern: "AGRIBIB",
        price: "$1,350",
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    cosechadora: [
      {
        id: 4,
        name: "Neumático agrícola 1000-16",
        brand: "Prielli",
        size: "1000-16",
        pattern: "F-2",
        price: "$850",
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 5,
        name: "Neumático flotación 73x44.00-32",
        brand: "Alliance",
        size: "73x44.00-32",
        pattern: "550",
        price: "$2,850",
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    retroexcavadora: [
      {
        id: 6,
        name: "Neumático industrial 12.5/80-18",
        brand: "Camso",
        size: "12.5/80-18",
        pattern: "SKS 532",
        price: "$650",
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 7,
        name: "Neumático industrial 17.5L-24",
        brand: "Titan",
        size: "17.5L-24",
        pattern: "LD 250",
        price: "$950",
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    // Add more tires for other machinery types...
  }

  const services = [
    {
      id: 1,
      title: "Asesoría personalizada",
      description: "Te ayudamos a elegir el neumático ideal para tu maquinaria.",
      icon: MessageCircle,
    },
    {
      id: 2,
      title: "Montajes",
      description: "Contamos con personal capacitado para montaje de llantas en sitio o taller.",
      icon: Settings,
    },
  ]

  const renderCurrentPage = () => {
    if (currentPage === "home") {
      return <HomePage setCurrentPage={setCurrentPage} setSelectedCategory={setSelectedCategory} />
    } else if (currentPage === "categories") {
      if (selectedMachinery) {
        return (
          <TiresPage
            selectedCategory={selectedCategory}
            selectedMachinery={selectedMachinery}
            machineryByCategory={machineryByCategory}
            tiresByMachinery={tiresByMachinery}
            setCurrentPage={setCurrentPage}
          />
        )
      } else if (selectedCategory) {
        return (
          <MachineryPage
            selectedCategory={selectedCategory}
            machineryByCategory={machineryByCategory}
            setSelectedMachinery={setSelectedMachinery}
          />
        )
      } else {
        return (
          <CategoriesPage
            categories={categories}
            setSelectedCategory={setSelectedCategory}
            setCurrentPage={setCurrentPage}
          />
        )
      }
    } else if (currentPage === "services") {
      return <ServicesPage services={services} />
    } else if (currentPage === "contact") {
      return <ContactPage />
    }
    return <HomePage setCurrentPage={setCurrentPage} setSelectedCategory={setSelectedCategory} />
  }

  return (
    <div className={`min-h-screen ${currentPage === "home" ? "bg-black" : "bg-white"}`}>
      <div className="w-full">
        <div className={`${currentPage === "home" ? "bg-black" : "bg-white"} overflow-hidden`}>
          <Header
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setSelectedCategory={setSelectedCategory}
            setSelectedMachinery={setSelectedMachinery}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
          <MobileMenu
            isMenuOpen={isMenuOpen}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setSelectedCategory={setSelectedCategory}
            setSelectedMachinery={setSelectedMachinery}
            setIsMenuOpen={setIsMenuOpen}
          />
          <div className="px-4 py-6 md:px-8 lg:px-16 xl:px-24">
            <Breadcrumb
              currentPage={currentPage}
              selectedCategory={selectedCategory}
              selectedMachinery={selectedMachinery}
              setSelectedMachinery={setSelectedMachinery}
              setSelectedCategory={setSelectedCategory}
              setCurrentPage={setCurrentPage}
              machineryByCategory={machineryByCategory}
            />
            {renderCurrentPage()}
          </div>
          <Footer />
        </div>
      </div>
      {/* WhatsApp Fixed Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
          onClick={() => window.open("https://wa.me/1234567890", "_blank")}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}
