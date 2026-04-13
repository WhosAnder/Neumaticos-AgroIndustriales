import { auth } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { headers } from "next/headers"

import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export const dynamic = "force-dynamic"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const session = await auth.api.getSession({
    headers: headersList,
  })

  if (!session || !session.user) {
    return <>{children}</>
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Navbar Movel */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 md:hidden">
        <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-2 -mr-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <Menu className="w-6 h-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 bg-white">
            <AdminSidebar user={session.user} className="w-full h-full border-r-0" />
          </SheetContent>
        </Sheet>
      </div>

      {/* Sidebar Desktop */}
      <div className="hidden md:flex">
        <AdminSidebar user={session.user} className="w-64 min-h-screen" />
      </div>

      {/* Contenido Principal */}
      <main className="flex-1 p-4 md:p-8 overflow-hidden">{children}</main>
    </div>
  )
}
