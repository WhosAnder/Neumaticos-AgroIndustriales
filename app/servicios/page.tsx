import { fetchServices } from "@/lib/api"
import { mapService } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Breadcrumb } from "@/components/breadcrumb"
import {
  MessageCircle,
  Settings,
  Truck,
  Construction,
  FileText,
  type LucideIcon
} from "lucide-react"

export const dynamic = "force-dynamic"

const ICON_MAP: Record<string, LucideIcon> = {
  MessageCircle,
  Settings,
  Truck,
  Construction,
  FileText,
}

export default async function ServiciosPage() {
  const services = await fetchServices()
  const mappedServices = services.map(mapService)

  return (
    <div className="px-4 py-6 md:px-8 lg:px-16 xl:px-24">
      <Breadcrumb />
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-black text-center mb-8">Servicios</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mappedServices.map((service) => {
            const IconComponent = ICON_MAP[service.icono_nombre] || FileText
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
                      <Button className="bg-red-600 hover:bg-red-700 text-white">
                        {service.texto_boton || "Solicitar servicio"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
