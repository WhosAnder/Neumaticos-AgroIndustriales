"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Facebook, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-6 mt-8 w-full">
      <div className="px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Company Info */}
          <div>
            <Image
              src="/images/logo-horizontal-new.png"
              alt="Neumáticos Agroindustriales"
              width={350}
              height={75}
              className="h-14 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-gray-400 text-sm">
              Especialistas en neumáticos para maquinaria agrícola e industrial. Calidad y servicio garantizado.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                <span className="text-gray-400">Av. Industrial 123, Ciudad</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500" />
                <span className="text-gray-400">info@neumaticosagroindustriales.com</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4">Síguenos</h4>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-red-600">
                <Facebook className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2025 Neumáticos Agroindustriales. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
