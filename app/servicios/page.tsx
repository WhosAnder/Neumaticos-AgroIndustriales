import { fetchServices } from "@/lib/api"
import { mapService } from "@/lib/utils"
import { Breadcrumb } from "@/components/breadcrumb"
import { ServicesClient } from "./services-client"

export const dynamic = "force-dynamic"

export default async function ServiciosPage() {
  const services = await fetchServices()
  const mappedServices = services.map(mapService)

  return (
    <div className="px-4 py-6 md:px-8 lg:px-16 xl:px-24">
      <Breadcrumb />
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-black text-center mb-8">Servicios</h2>
        <ServicesClient services={mappedServices} />
      </div>
    </div>
  )
}
