import { auth } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { headers } from "next/headers"

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
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar user={session.user} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
