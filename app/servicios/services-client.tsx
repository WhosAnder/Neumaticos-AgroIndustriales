"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  MessageCircle,
  Settings,
  Truck,
  Construction,
  FileText,
  type LucideIcon
} from "lucide-react"

const ICON_MAP: Record<string, LucideIcon> = {
  MessageCircle,
  Settings,
  Truck,
  Construction,
  FileText,
}

const WA_URL =
  "https://wa.me/522225637019?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20una%20cotizaci%C3%B3n.%20%C2%BFMe%20pueden%20ayudar%3F"

function resolveButtonAction(texto: string): { type: "link" | "wa" | "none"; href?: string } {
  const t = texto.toLowerCase()
  if (t.includes("catálogo") || t.includes("catalogo") || t.includes("ver catálogo")) {
    return { type: "link", href: "/categorias" }
  }
  if (
    t.includes("contáctanos") ||
    t.includes("contactanos") ||
    t.includes("cotización") ||
    t.includes("cotizacion") ||
    t.includes("contáct")
  ) {
    return { type: "wa" }
  }
  if (t.includes("solicitar servicio")) {
    return { type: "none" }
  }
  // fallback: WhatsApp
  return { type: "wa" }
}

interface Service {
  id: number
  titulo: string
  descripcion: string
  icono_nombre: string
  texto_boton?: string
}

export function ServicesClient({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {services.map((service) => {
        const IconComponent = ICON_MAP[service.icono_nombre] || FileText
        const label = service.texto_boton || "Solicitar servicio"
        const action = resolveButtonAction(label)

        return (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  <IconComponent className="w-8 h-8 text-gray-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{service.titulo}</h3>
                  <p className="text-gray-600 mb-4">{service.descripcion}</p>

                  {action.type === "link" && (
                    <Button className="bg-red-600 hover:bg-red-700 text-white" asChild>
                      <Link href={action.href!}>{label}</Link>
                    </Button>
                  )}

                  {action.type === "wa" && (
                    <Button className="bg-red-600 hover:bg-red-700 text-white" asChild>
                      <a href={WA_URL} target="_blank" rel="noopener noreferrer">
                        {label}
                      </a>
                    </Button>
                  )}

                  {/* action.type === "none" → botón eliminado */}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
