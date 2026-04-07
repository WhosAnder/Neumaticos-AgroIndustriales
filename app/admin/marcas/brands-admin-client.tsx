"use client"

import { FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AdminCRUDTable } from "@/components/admin/admin-crud-table"
import { ImageUploadField } from "@/components/admin/image-upload-field"

type Brand = {
  id: number
  slug: string
  nombre: string
  logo_url: string
}

type BrandAction = (data: Partial<Brand>) => Promise<unknown>
type UpdateBrandAction = (id: number, data: Partial<Brand>) => Promise<unknown>
type DeleteBrandAction = (id: number) => Promise<void>

export function BrandsAdminClient({
  brands,
  createAction,
  updateAction,
  deleteAction,
}: {
  brands: Brand[]
  createAction: BrandAction
  updateAction: UpdateBrandAction
  deleteAction: DeleteBrandAction
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marcas</h1>
          <p className="text-gray-500">Gestiona las marcas de neumáticos</p>
        </div>
        <BrandForm action={createAction} />
      </div>

      <AdminCRUDTable
        data={brands}
        columns={[
          { key: "id", label: "ID" },
          { key: "slug", label: "Slug" },
          { key: "nombre", label: "Nombre" },
          { key: "logo_url", label: "Logo URL" },
        ]}
        editAction={updateAction}
        deleteAction={deleteAction}
        editForm={BrandForm}
        deleteMessage="¿Estás seguro de que deseas eliminar esta marca?"
      />
    </div>
  )
}

function BrandForm({
  defaultValues,
  action,
  onSuccess,
}: {
  defaultValues?: Partial<Brand>
  action: (data: Partial<Brand>) => Promise<unknown>
  onSuccess?: () => void
}) {
  const router = useRouter()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const data = {
      slug: formData.get("slug") as string,
      nombre: formData.get("nombre") as string,
      logo_url: formData.get("logo_url") as string,
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
          <Input id="slug" name="slug" defaultValue={defaultValues?.slug || ""} placeholder="pirelli" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input id="nombre" name="nombre" defaultValue={defaultValues?.nombre || ""} placeholder="Pirelli" required />
        </div>
      </div>
      <ImageUploadField
        label="Logo"
        name="logo_url"
        defaultValue={defaultValues?.logo_url}
        folder="marcas"
      />
      <Button type="submit" className="bg-red-600 hover:bg-red-700">
        {defaultValues ? "Actualizar" : "Crear"}
      </Button>
    </form>
  )
}
