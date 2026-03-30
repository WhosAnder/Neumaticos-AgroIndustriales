import { MessageCircle, Settings, Truck, Construction, FileText, type LucideIcon } from "lucide-react"

// ── Types ──────────────────────────────────────────────────────────

export interface Category {
  id: string
  name: string
  description: string
  image: string
}

export interface Machinery {
  id: string
  name: string
  icon: LucideIcon
  image: string
  description: string
}

export interface Tire {
  id: number
  name: string
  brand: string
  size: string
  pattern: string
  price: string
  image: string
}

export interface Service {
  id: number
  title: string
  description: string
  icon: LucideIcon
  buttonText?: string
}

// ── Data ───────────────────────────────────────────────────────────

export const categories: Category[] = [
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

export const machineryByCategory: Record<string, Machinery[]> = {
  agricola: [
    {
      id: "tractor",
      name: "Tractor agrícola",
      icon: Construction,
      image: "/maquinas/Minicargador.png",
      description: "Neumáticos para tractores agrícolas",
    },
    {
      id: "implemento",
      name: "Implemento (Empacadora)",
      icon: Truck,
      image: "/maquinas/cargador.png",
      description: "Neumáticos para empacadoras",
    },
    {
      id: "trilladora",
      name: "Trilladora",
      icon: Construction,
      image: "/images/trilladora.png",
      description: "Neumáticos para trilladoras",
    },
    {
      id: "minicargador-agricola",
      name: "Minicargador",
      icon: Truck,
      image: "/maquinas/Minicargador.png",
      description: "Neumáticos para minicargadores agrícolas",
    },
  ],
  industrial: [
    { id: "grua", name: "Grúa", icon: Construction, image: "/maquinas/grua.png", description: "Neumáticos para grúas" },
    { id: "montacargas", name: "Montacargas", icon: Truck, image: "/maquinas/montacargas.png", description: "Neumáticos para montacargas" },
    { id: "cargador", name: "Cargador", icon: Construction, image: "/maquinas/cargador.png", description: "Neumáticos para cargadores" },
    { id: "retroexcavadora", name: "Retroexcavadora", icon: Truck, image: "/images/retroexcavadora.png", description: "Neumáticos para retroexcavadoras" },
    {
      id: "vibrocompactador",
      name: "Vibro compactador",
      icon: Construction,
      image: "/maquinas/VibroCompactador.png",
      description: "Neumáticos para vibro compactadores",
    },
    {
      id: "motoconformadora",
      name: "Motoconformadora",
      icon: Truck,
      image: "/maquinas/Motoconformadora.png",
      description: "Neumáticos para motoconformadoras",
    },
    { id: "camion", name: "Camión", icon: Construction, image: "/maquinas/camion.png", description: "Neumáticos para camiones" },
    {
      id: "camion-muevetierra",
      name: "Camión muevetierra",
      icon: Truck,
      image: "/maquinas/CamionMuevetierra.png",
      description: "Neumáticos para camiones muevetierra",
    },
    {
      id: "minicargador-industrial",
      name: "Minicargador",
      icon: Construction,
      image: "/maquinas/Minicargador.png",
      description: "Neumáticos para minicargadores industriales",
    },
  ],
}

export const tiresByMachinery: Record<string, Tire[]> = {
  tractor: [
    {
      id: 1,
      name: "Neumático agrícola 15.5-38 RTW",
      brand: "Seba Ultra",
      size: "15.5-38",
      pattern: "RTW",
      price: "$1,250",
      image: "/images/hero-background.png",
    },
    {
      id: 2,
      name: "Neumático agrícola 18.4-34",
      brand: "Firestone",
      size: "18.4-34",
      pattern: "R-1",
      price: "$1,450",
      image: "/images/hero-background.png",
    },
    {
      id: 3,
      name: "Neumático agrícola 16.9-30",
      brand: "Michelin",
      size: "16.9-30",
      pattern: "AGRIBIB",
      price: "$1,350",
      image: "/images/hero-background.png",
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
      image: "/images/hero-background.png",
    },
    {
      id: 5,
      name: "Neumático flotación 73x44.00-32",
      brand: "Alliance",
      size: "73x44.00-32",
      pattern: "550",
      price: "$2,850",
      image: "/images/hero-background.png",
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
      image: "/images/hero-background.png",
    },
    {
      id: 7,
      name: "Neumático industrial 17.5L-24",
      brand: "Titan",
      size: "17.5L-24",
      pattern: "LD 250",
      price: "$950",
      image: "/images/hero-background.png",
    },
  ],
}

export const services: Service[] = [
  {
    id: 3,
    title: "Cotización",
    description: "Solicita precio para neumáticos agrícolas e industriales según medida, maquinaria o aplicación.",
    icon: FileText,
    buttonText: "Solicitar cotización",
  },
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

// ── Helper functions ───────────────────────────────────────────────

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id)
}

export function getMachineryByCategory(categoryId: string): Machinery[] {
  return machineryByCategory[categoryId] || []
}

export function getMachineryById(categoryId: string, machineryId: string): Machinery | undefined {
  return getMachineryByCategory(categoryId).find((m) => m.id === machineryId)
}

export function getTiresByMachinery(machineryId: string): Tire[] {
  return tiresByMachinery[machineryId] || []
}

export function getAllCategoryIds(): string[] {
  return categories.map((c) => c.id)
}

export function getAllMachineryParams(): { categoryId: string; machineryId: string }[] {
  const params: { categoryId: string; machineryId: string }[] = []
  for (const categoryId of getAllCategoryIds()) {
    for (const machine of getMachineryByCategory(categoryId)) {
      params.push({ categoryId, machineryId: machine.id })
    }
  }
  return params
}
