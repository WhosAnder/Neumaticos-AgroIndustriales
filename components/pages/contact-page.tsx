"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Facebook } from "lucide-react"

export function ContactPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-black text-center mb-8">Contacto</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Información de Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-red-600" />
                <span>Prolongación 42 oriente 1417, San Pedro Cholula</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-600" />
                <span>+52 (222) 128-3294</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-600" />
                <span>gfa_ww@outlook.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Facebook className="w-5 h-5 text-red-600" />
                <span>@Neumáticos Agro Industriales </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Envíanos un Mensaje</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mensaje</label>
                <textarea
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Escribe tu mensaje aquí..."
                ></textarea>
              </div>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Enviar Mensaje</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
