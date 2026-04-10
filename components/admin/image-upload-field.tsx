"use client"

import { type ChangeEvent, type DragEvent, useRef, useState } from "react"
import Image from "next/image"
import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export function ImageUploadField({
  label,
  name,
  defaultValue,
  folder,
}: {
  label: string
  name: string
  defaultValue?: string
  folder: string
}) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [imageUrl, setImageUrl] = useState(defaultValue || "")
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")

  const handleUpload = async (file: File) => {
    setError("")
    setIsUploading(true)

    try {
      const payload = new FormData()
      payload.append("file", file)
      payload.append("folder", folder)

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: payload,
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: "Upload failed" }))
        throw new Error(data.error || "Upload failed")
      }

      const data = (await response.json()) as { url: string }
      setImageUrl(data.url)
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed")
    } finally {
      setIsUploading(false)
    }
  }

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    await handleUpload(file)
    event.target.value = ""
  }

  const onDrop = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files?.[0]
    if (!file) return
    await handleUpload(file)
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <input type="hidden" name={name} value={imageUrl} readOnly />

      {imageUrl ? (
        <div className="rounded-md border p-3 space-y-3">
          <div className="relative w-full h-36 bg-gray-50 rounded-md overflow-hidden">
            <Image src={imageUrl} alt={label} fill className="object-contain" />
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => inputRef.current?.click()}
              disabled={isUploading}
            >
              Reemplazar
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setImageUrl("")}
              disabled={isUploading}
            >
              <X className="h-4 w-4 mr-1" />
              Quitar
            </Button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(event) => event.preventDefault()}
          onDrop={onDrop}
          className="border border-dashed rounded-md p-6 text-center bg-gray-50"
        >
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-5 w-5 text-gray-500" />
            <p className="text-sm text-gray-600">Arrastra una imagen aqui o selecciona un archivo</p>
            <Button
              type="button"
              variant="outline"
              onClick={() => inputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? "Subiendo..." : "Seleccionar imagen"}
            </Button>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={onFileChange}
      />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  )
}
