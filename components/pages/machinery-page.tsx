"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface MachineryPageProps {
  selectedCategory: string | null
  machineryByCategory: any
  setSelectedMachinery: (machinery: string) => void
}

export function MachineryPage({ selectedCategory, machineryByCategory, setSelectedMachinery }: MachineryPageProps) {
  const machinery = machineryByCategory[selectedCategory || ""] || []

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-black text-center mb-8">Catálogo</h2>

      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
        {machinery.map((machine: any) => {
          return (
            <Card
              key={machine.id}
              className="bg-white hover:shadow-lg transition-shadow cursor-pointer rounded-2xl border-0 shadow-md"
              onClick={() => setSelectedMachinery(machine.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="h-24 flex items-center justify-center mb-4">
                  <Image
                    src={`/images/${machine.name}.png`}
                    alt={machine.id}
                    width={100}
                    height={80}
                    className="h-auto max-h-24 w-auto"
                  />
                </div>
                <h3 className="font-semibold text-lg text-black">{machine.name}</h3>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
