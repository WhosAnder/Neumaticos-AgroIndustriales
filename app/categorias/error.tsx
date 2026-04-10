"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { WifiOff, RefreshCw } from "lucide-react"
import Link from "next/link"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function CatalogoError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[CatalogoError]", error)
  }, [error])

  return (
    <div className="px-4 py-12 md:px-8 lg:px-16 xl:px-24">
      <Card className="max-w-lg mx-auto">
        <CardContent className="p-8 text-center">
          <WifiOff className="mx-auto mb-4 h-10 w-10 text-red-400" />
          <h2 className="text-xl font-bold mb-2">No se pudo cargar el catálogo</h2>
          <p className="text-gray-500 text-sm mb-6">
            El servicio de catálogo no está disponible en este momento.
            Para consultas inmediatas contáctanos por WhatsApp.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={reset}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Reintentar
            </Button>
            <Link
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                WhatsApp
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
