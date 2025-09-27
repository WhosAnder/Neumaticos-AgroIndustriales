"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Construction, Truck } from "lucide-react"

interface HomePageProps {
  setCurrentPage: (page: string) => void
  setSelectedCategory: (category: string) => void
}

export function HomePage({ setCurrentPage, setSelectedCategory }: HomePageProps) {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="overflow-hidden">
        <div className="relative">
          <Image
            src="/images/hero-main.png"
            alt="Neumáticos Agroindustriales - Llantas para maquinaria"
            width={1200}
            height={600}
            className="w-full h-48 md:h-64 lg:h-80 object-cover"
          />
        </div>
      </Card>

      {/* Main Content */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Neumáticos para maquinaria industrial y agrícola
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-3xl mx-auto">
            Ofrecemos una amplia gama de neumáticos de alta calidad para todo tipo de maquinaria. Más de 15 años de
            experiencia respaldando tu trabajo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg rounded-full"
              onClick={() => setCurrentPage("categories")}
            >
              Explorar productos
            </Button>
            <Button
              className="bg-white border-white text-gray-800 hover:bg-gray-100 hover:text-gray-900 px-8 py-3 text-lg rounded-full"
              onClick={() =>
                window.open("https://wa.me/1234567890?text=Hola, me gustaría solicitar una cotización", "_blank")
              }
            >
              Solicitar cotización
            </Button>
          </div>
        </div>

        {/* Featured Products */}
        <Card className="bg-white">
          <CardContent className="p-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Productos destacados</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <Construction className="w-12 h-12 text-red-600" />
                  <div>
                    <h4 className="text-xl font-semibold">Neumáticos Agrícolas</h4>
                    <p className="text-gray-600">Para tractores, cosechadoras y más</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Diseñados para maximizar la tracción y minimizar la compactación del suelo en aplicaciones agrícolas.
                </p>
                <Button
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                  onClick={() => {
                    setSelectedCategory("agricola")
                    setCurrentPage("categories")
                  }}
                >
                  Ver catálogo agrícola
                </Button>
              </div>
              <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <Truck className="w-12 h-12 text-red-600" />
                  <div>
                    <h4 className="text-xl font-semibold">Neumáticos Industriales</h4>
                    <p className="text-gray-600">Para construcción y minería</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Resistentes y duraderos, ideales para las condiciones más exigentes en construcción e industria.
                </p>
                <Button
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent"
                  onClick={() => {
                    setSelectedCategory("industrial")
                    setCurrentPage("categories")
                  }}
                >
                  Ver catálogo industrial
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <Card className="bg-gray-50">
          <CardContent className="p-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Lo que dicen nuestros clientes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold">JM</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Juan Martínez</h4>
                    <p className="text-gray-600 text-sm">Agricultor - Finca El Progreso</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Excelente calidad y servicio. Los neumáticos han durado mucho más de lo esperado y el equipo siempre
                  está disponible para asesorarme."
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 font-bold">CR</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Carlos Rodríguez</h4>
                    <p className="text-gray-600 text-sm">Constructora Rodríguez S.A.</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Proveedor confiable para nuestra flota de maquinaria pesada. Siempre cumplen con los tiempos de
                  entrega y la calidad es excepcional."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blog Section */}
        <Card className="bg-white">
          <CardContent className="p-8">
            <h3 className="text-4xl font-bold text-gray-900 mb-8 text-center">Blog y noticias</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border-l-4 border-red-600 pl-4">
                <h4 className="text-xl font-semibold mb-2">Mantenimiento de Neumáticos Agrícolas</h4>
                <p className="text-gray-600 mb-3">
                  Descubre las mejores prácticas para mantener tus neumáticos agrícolas en óptimas condiciones y
                  extender su vida útil.
                </p>
                <span className="text-sm text-gray-500">15 de Noviembre, 2024</span>
              </div>
              <div className="border-l-4 border-red-600 pl-4">
                <h4 className="text-xl font-semibold mb-2">Neumáticos para Construcción: Guía Completa</h4>
                <p className="text-gray-600 mb-3">
                  Todo lo que necesitas saber sobre la selección de neumáticos para maquinaria de construcción y
                  minería.
                </p>
                <span className="text-sm text-gray-500">10 de Noviembre, 2024</span>
              </div>
              <div className="border-l-4 border-red-600 pl-4">
                <h4 className="text-xl font-semibold mb-2">Nuevas Tecnologías en Neumáticos</h4>
                <p className="text-gray-600 mb-3">
                  Conoce las últimas innovaciones en tecnología de neumáticos que están revolucionando la industria.
                </p>
                <span className="text-sm text-gray-500">5 de Noviembre, 2024</span>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent">
                Ver más artículos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-gray-900 to-black text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-3xl font-bold mb-4">¿Necesitas asesoría personalizada?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Nuestro equipo de expertos está listo para ayudarte a encontrar la solución perfecta para tu maquinaria.
              Contáctanos hoy mismo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
                onClick={() => setCurrentPage("contact")}
              >
                Contactar ahora
              </Button>
              <Button
                className="bg-white border-white text-gray-800 hover:bg-gray-100 hover:text-gray-900 px-8 py-3"
                onClick={() =>
                  window.open("https://wa.me/1234567890?text=Hola, necesito asesoría personalizada", "_blank")
                }
              >
                WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
