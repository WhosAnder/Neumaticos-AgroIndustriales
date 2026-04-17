"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Facebook, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black text-white p-6 mt-0 w-full border-t border-gray-900">
      <div className="px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Company Info */}
          <div>
            <Image
              src="/images/logo-horizontal-new.webp"
              alt="Neumáticos Agroindustriales"
              width={200}
              height={0}
              className="h-auto w-[200px] mb-4 brightness-0 invert"
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
                <span className="text-gray-400">Prolongación 42 oriente 1417, San Pedro Cholula</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-500" />
                <span className="text-gray-400">+52 222 563 7019</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-500" />
                <span className="text-gray-400">contacto@nei.com</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4">Síguenos</h4>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-14 w-14 text-gray-400 hover:text-white hover:bg-red-600"
                onClick={() => window.open("https://www.facebook.com/NeumaticosAgricolaseIndustriales/", "_blank")}
              >
                <Facebook className="h-15 w-15" />
              </Button>
              <a
                href="https://www.facebook.com/NeumaticosAgricolaseIndustriales/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Neumáticos Agro Industriales
              </a>
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
