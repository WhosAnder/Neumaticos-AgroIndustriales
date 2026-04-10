"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Pencil, Trash2 } from "lucide-react"

interface Column {
  key: string
  label: string
}

interface AdminCRUDTableProps {
  data: any[]
  columns: Column[]
  editAction: (id: number, data: any) => Promise<any>
  deleteAction: (id: number) => Promise<void>
  editForm: React.ComponentType<{
    defaultValues?: any
    action: any
    onSuccess?: () => void
  }>
  deleteMessage?: string
}

export function AdminCRUDTable({
  data,
  columns,
  editAction,
  deleteAction,
  editForm: EditForm,
  deleteMessage = "¿Estás seguro de que deseas eliminar este elemento?",
}: AdminCRUDTableProps) {
  const router = useRouter()
  const [editOpen, setEditOpen] = useState<number | null>(null)
  const [deleteOpen, setDeleteOpen] = useState<number | null>(null)
  const [editValues, setEditValues] = useState<any>(null)

  const handleEdit = (item: any) => {
    setEditValues(item)
    setEditOpen(item.id)
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteAction(id)
      router.refresh()
      setDeleteOpen(null)
    } catch (error) {
      console.error(error)
    }
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No hay datos disponibles
      </div>
    )
  }

  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.key}>{col.label}</TableHead>
              ))}
              <TableHead className="w-32">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    <span className="truncate max-w-xs block">
                      {item[col.key] || "-"}
                    </span>
                  </TableCell>
                ))}
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(item)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteOpen(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={editOpen !== null} onOpenChange={(open) => !open && setEditOpen(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar</DialogTitle>
            <DialogDescription>
              Modifica los datos del elemento
            </DialogDescription>
          </DialogHeader>
          <EditForm
            defaultValues={editValues}
            action={(data: any) => editAction(editValues.id, data)}
            onSuccess={() => {
              setEditOpen(null)
              router.refresh()
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen !== null} onOpenChange={(open) => !open && setDeleteOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>{deleteMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteOpen && handleDelete(deleteOpen)}
            >
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
