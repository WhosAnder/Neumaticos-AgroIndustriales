"use client"

import { FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AdminCRUDTable } from "@/components/admin/admin-crud-table"
import { ImageUploadField } from "@/components/admin/image-upload-field"

type Machinery = {
  id: number
  slug: string
  nombre: string
  icono_nombre: string
  imagen_url: string
  descripcion: string
  categoria_id: number
}

type Category = {
  id: number
  nombre: string
}

type MachineryAction = (data: Partial<Machinery>) => Promise<unknown>
type UpdateMachineryAction = (id: number, data: Partial<Machinery>) => Promise<unknown>
type DeleteMachineryAction = (id: number) => Promise<void>

export function MachineryAdminClient({
  machinery,
  categories,
  createAction,
  updateAction,
  deleteAction,
}: {
  machinery: Machinery[]
  categories: Category[]
  createAction: MachineryAction
  updateAction: UpdateMachineryAction
  deleteAction: DeleteMachineryAction
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maquinaria</h1>
          <p className="text-gray-500">Gestiona la maquinaria del catálogo</p>
        </div>
        <MachineryForm categories={categories} action={createAction} />
      </div>

      <AdminCRUDTable
        data={machinery}
        columns={[
          { key: "id", label: "ID" },
          { key: "slug", label: "Slug" },
          { key: "nombre", label: "Nombre" },
          { key: "descripcion", label: "Descripción" },
        ]}
        editAction={updateAction}
        deleteAction={deleteAction}
        editForm={(props) => <MachineryForm categories={categories} {...props} />}
        deleteMessage="¿Estás seguro de que deseas eliminar esta maquinaria?"
      />
    </div>
  )
}

function MachineryForm({
  categories,
  defaultValues,
  action,
  onSuccess,
}: {
  categories: Category[]
  defaultValues?: Partial<Machinery>
  action: (data: Partial<Machinery>) => Promise<unknown>
  onSuccess?: () => void
}) {
  const router = useRouter()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const data = {
      slug: formData.get("slug") as string,
      nombre: formData.get("nombre") as string,
      icono_nombre: formData.get("icono_nombre") as string,
      imagen_url: formData.get("imagen_url") as string,
      descripcion: formData.get("descripcion") as string,
      categoria_id: parseInt(formData.get("categoria_id") as string, 10),
    }

    try {
      await action(data)
      onSuccess?.()
      router.refresh()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" defaultValue={defaultValues?.slug || ""} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input id="nombre" name="nombre" defaultValue={defaultValues?.nombre || ""} required />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="categoria_id">Categoría</Label>
          <select
            id="categoria_id"
            name="categoria_id"
            defaultValue={defaultValues?.categoria_id || ""}
            className="w-full h-10 px-3 border rounded-md"
            required
          >
            <option value="">Seleccionar categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="icono_nombre">Icono (Lucide)</Label>
          <Input id="icono_nombre" name="icono_nombre" defaultValue={defaultValues?.icono_nombre || ""} />
        </div>
      </div>
      <ImageUploadField
        label="Imagen"
        name="imagen_url"
        defaultValue={defaultValues?.imagen_url}
        folder="maquinaria"
      />
      <div className="space-y-2">
        <Label htmlFor="descripcion">Descripción</Label>
        <Input id="descripcion" name="descripcion" defaultValue={defaultValues?.descripcion || ""} />
      </div>
      <Button type="submit" className="bg-red-600 hover:bg-red-700">
        {defaultValues ? "Actualizar" : "Crear"}
      </Button>
    </form>
  )
}
