"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[GlobalError]", error)
  }, [error])

  const isApiDown = error.message.includes("No se pudo conectar con la API")

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-red-500" />
        <h2 className="text-2xl font-bold mb-2">
          {isApiDown ? "Servicio no disponible" : "Algo salió mal"}
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          {isApiDown
            ? "No pudimos cargar el catálogo en este momento. Por favor intenta de nuevo en unos minutos."
            : error.message}
        </p>
        <Button
          onClick={reset}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Intentar de nuevo
        </Button>
      </div>
    </div>
  )
}
