import { randomUUID } from "crypto"
import { mkdir, writeFile } from "fs/promises"
import { join } from "path"
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"])

export async function POST(request: Request) {
  const headersList = await import("next/headers").then((m) => m.headers())
  const session = await auth.api.getSession({ headers: headersList as Headers })

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get("file")
  const folderValue = formData.get("folder")
  const folder = typeof folderValue === "string" && folderValue.trim().length > 0 ? folderValue : "uploads"

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File is required" }, { status: 400 })
  }

  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 })
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File too large" }, { status: 400 })
  }

  const ext = file.name.includes(".") ? file.name.split(".").pop() : "png"
  const safeFolder = folder.replace(/[^a-zA-Z0-9/_-]/g, "")
  const relativeDir = join("images", safeFolder)
  const uploadDir = join(process.cwd(), "public", relativeDir)
  const filename = `${randomUUID()}.${ext}`
  const filePath = join(uploadDir, filename)
  const fileBuffer = Buffer.from(await file.arrayBuffer())

  await mkdir(uploadDir, { recursive: true })
  await writeFile(filePath, fileBuffer)

  return NextResponse.json({ url: `/${relativeDir}/${filename}` })
}
