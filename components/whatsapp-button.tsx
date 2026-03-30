"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="icon"
        className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg"
        onClick={() => window.open("https://wa.me/2221283294", "_blank")}
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </div>
  )
}
