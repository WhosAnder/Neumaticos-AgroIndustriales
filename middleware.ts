import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("better-auth.session_token")
  const pathname = request.nextUrl.pathname

  if (pathname === "/admin/login") {
    return NextResponse.next()
  }

  if (pathname.startsWith("/admin") && !sessionCookie) {
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
