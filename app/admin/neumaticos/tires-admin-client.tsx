"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AdminCRUDTable } from "@/components/admin/admin-crud-table"
import { ImageUploadField } from "@/components/admin/image-upload-field"

type Tire = {
  id: number
  nombre: string
  medida: string
  patron: string
  precio: string
  imagen_url: string
  marca_id: number
  maquinaria_id: number
}

type Machinery = {
  id: number
  nombre: string
}

type Brand = {
  id: number
  nombre: string
}

type TireAction = (data: Partial<Tire>) => Promise<unknown>
type UpdateTireAction = (id: number, data: Partial<Tire>) => Promise<unknown>
type DeleteTireAction = (id: number) => Promise<void>

export function TiresAdminClient({
  tires,
  machinery,
  brands,
  createAction,
  updateAction,
  deleteAction,
}: {
  tires: Tire[]
  machinery: Machinery[]
  brands: Brand[]
  createAction: TireAction
  updateAction: UpdateTireAction
  deleteAction: DeleteTireAction
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Neumáticos</h1>
          <p className="text-gray-500">Gestiona los neumáticos del catálogo</p>
        </div>
        <TireForm machinery={machinery} brands={brands} action={createAction} />
      </div>

      <AdminCRUDTable
        data={tires}
        columns={[
          { key: "id", label: "ID" },
          { key: "nombre", label: "Nombre" },
          { key: "medida", label: "Medida" },
          { key: "patron", label: "Patrón" },
          { key: "precio", label: "Precio" },
        ]}
        editAction={updateAction}
        deleteAction={deleteAction}
        editForm={(props) => <TireForm machinery={machinery} brands={brands} {...props} />}
        deleteMessage="¿Estás seguro de que deseas eliminar este neumático?"
      />
    </div>
  )
}

function TireForm({
  machinery,
  brands,
  defaultValues,
  action,
  onSuccess,
}: {
  machinery: Machinery[]
  brands: Brand[]
  defaultValues?: Partial<Tire>
  action: (data: Partial<Tire>) => Promise<unknown>
  onSuccess?: () => void
}) {
  const router = useRouter()
  const [submitError, setSubmitError] = useState("")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitError("")
    const formData = new FormData(event.currentTarget)

    const data = {
      nombre: formData.get("nombre") as string,
      medida: formData.get("medida") as string,
      patron: formData.get("patron") as string,
      precio: formData.get("precio") as string,
      imagen_url: formData.get("imagen_url") as string,
      marca_id: parseInt(formData.get("marca_id") as string, 10) || 0,
      maquinaria_id: parseInt(formData.get("maquinaria_id") as string, 10),
    }

    try {
      await action(data)
      onSuccess?.()
      router.refresh()
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error al guardar el neumatico"
      setSubmitError(message)
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nombre">Nombre</Label>
        <Input id="nombre" name="nombre" defaultValue={defaultValues?.nombre || ""} required />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="medida">Medida</Label>
          <Input id="medida" name="medida" defaultValue={defaultValues?.medida || ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="patron">Patrón</Label>
          <Input id="patron" name="patron" defaultValue={defaultValues?.patron || ""} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="precio">Precio</Label>
          <Input id="precio" name="precio" defaultValue={defaultValues?.precio || ""} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="maquinaria_id">Maquinaria</Label>
          <select
            id="maquinaria_id"
            name="maquinaria_id"
            defaultValue={defaultValues?.maquinaria_id || ""}
            className="w-full h-10 px-3 border rounded-md"
            required
          >
            <option value="">Seleccionar maquinaria</option>
            {machinery.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="marca_id">Marca</Label>
          <select
            id="marca_id"
            name="marca_id"
            defaultValue={defaultValues?.marca_id || ""}
            className="w-full h-10 px-3 border rounded-md"
          >
            <option value="">Sin marca</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ImageUploadField
        label="Imagen"
        name="imagen_url"
        defaultValue={defaultValues?.imagen_url}
        folder="neumaticos"
      />
      <Button type="submit" className="bg-red-600 hover:bg-red-700">
        {defaultValues ? "Actualizar" : "Crear"}
      </Button>
      {submitError ? <p className="text-sm text-red-600">{submitError}</p> : null}
    </form>
  )
}
