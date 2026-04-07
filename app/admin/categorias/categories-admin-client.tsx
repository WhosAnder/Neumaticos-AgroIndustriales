"use client"

import { FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AdminCRUDTable } from "@/components/admin/admin-crud-table"
import { ImageUploadField } from "@/components/admin/image-upload-field"

type Category = {
  id: number
  slug: string
  nombre: string
  descripcion: string
  imagen_url: string
}

type CategoryAction = (data: Partial<Category>) => Promise<unknown>
type UpdateCategoryAction = (id: number, data: Partial<Category>) => Promise<unknown>
type DeleteCategoryAction = (id: number) => Promise<void>

export function CategoriesAdminClient({
  categories,
  createAction,
  updateAction,
  deleteAction,
}: {
  categories: Category[]
  createAction: CategoryAction
  updateAction: UpdateCategoryAction
  deleteAction: DeleteCategoryAction
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categorías</h1>
          <p className="text-gray-500">Gestiona las categorías del catálogo</p>
        </div>
        <CategoryForm action={createAction} />
      </div>

      <AdminCRUDTable
        data={categories}
        columns={[
          { key: "slug", label: "Slug" },
          { key: "nombre", label: "Nombre" },
          { key: "descripcion", label: "Descripción" },
          { key: "imagen_url", label: "Imagen" },
        ]}
        editAction={updateAction}
        deleteAction={deleteAction}
        editForm={CategoryForm}
        deleteMessage="¿Estás seguro de que deseas eliminar esta categoría?"
      />
    </div>
  )
}

function CategoryForm({
  defaultValues,
  action,
  onSuccess,
}: {
  defaultValues?: Partial<Category>
  action: (data: Partial<Category>) => Promise<unknown>
  onSuccess?: () => void
}) {
  const router = useRouter()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const data = {
      slug: formData.get("slug") as string,
      nombre: formData.get("nombre") as string,
      descripcion: formData.get("descripcion") as string,
      imagen_url: formData.get("imagen_url") as string,
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
          <Input
            id="slug"
            name="slug"
            defaultValue={defaultValues?.slug || ""}
            placeholder="agricola"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            name="nombre"
            defaultValue={defaultValues?.nombre || ""}
            placeholder="Agrícola"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="descripcion">Descripción</Label>
        <Input
          id="descripcion"
          name="descripcion"
          defaultValue={defaultValues?.descripcion || ""}
          placeholder="Neumáticos especializados para maquinaria agrícola"
        />
      </div>
      <ImageUploadField
        label="Imagen"
        name="imagen_url"
        defaultValue={defaultValues?.imagen_url}
        folder="categorias"
      />
      <Button type="submit" className="bg-red-600 hover:bg-red-700">
        {defaultValues ? "Actualizar" : "Crear"}
      </Button>
    </form>
  )
}
