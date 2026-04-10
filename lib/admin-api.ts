"use server"

import { cookies } from "next/headers"
import { headers } from "next/headers"
import { revalidateTag } from "next/cache"
import { createHash } from "crypto"
import { Pool } from "pg"
import { createAdminApiToken } from "@/lib/admin-jwt"
import { auth } from "@/lib/auth"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"
const ALLOW_LOCAL_DB_FALLBACK = process.env.ADMIN_USE_LOCAL_DB_FALLBACK !== "false"

const pool = new Pool({
  connectionString: process.env.DATABASE_PUBLIC_URL || process.env.DATABASE_URL,
})

class ApiUnavailableError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ApiUnavailableError"
  }
}

function isApiUnavailableError(error: unknown): error is ApiUnavailableError {
  return error instanceof ApiUnavailableError
}

function normalizeId(value: unknown): number {
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error("ID inválido")
  }
  return Math.trunc(parsed)
}

function requireText(value: unknown, fieldName: string): string {
  const text = String(value ?? "").trim()
  if (!text) {
    throw new Error(`El campo ${fieldName} es obligatorio`)
  }
  return text
}

function optionalText(value: unknown): string | null {
  if (typeof value !== "string") {
    return null
  }
  const text = value.trim()
  return text.length > 0 ? text : null
}

async function requireSession() {
  const headersList = await headers()
  const session = await auth.api.getSession({
    headers: headersList,
  })

  if (!session?.user?.id) {
    throw new Error("Sesión inválida")
  }

  return session
}

function mapDbError(error: unknown): Error {
  if (error && typeof error === "object" && "code" in error) {
    const code = String((error as { code?: string }).code)
    if (code === "23505") {
      return new Error("Ya existe un registro con ese slug o valor único")
    }
    if (code === "23503") {
      return new Error("No se puede eliminar porque el registro tiene elementos asociados")
    }
  }

  if (error instanceof Error) {
    return error
  }

  return new Error("Error de base de datos")
}

async function getAdminAccessToken() {
  const cookieStore = await cookies()
  const authCookie = cookieStore
    .getAll()
    .find(
      (cookie) =>
        cookie.name.startsWith("better-auth.session_token") ||
        cookie.name.startsWith("__Secure-better-auth.session_token")
    )

  if (!authCookie?.value) {
    throw new Error("Sesión inválida")
  }

  const derivedUserId = createHash("sha256").update(authCookie.value).digest("hex").slice(0, 24)

  return createAdminApiToken({
    userId: derivedUserId,
  })
}

async function getCookieHeader() {
  const cookieStore = await cookies()
  return cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ")
}

export async function adminFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  await requireSession()

  const token = await getAdminAccessToken()
  const cookieHeader = await getCookieHeader()

  let res: Response
  try {
    res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Cookie: cookieHeader,
        ...options.headers,
      },
    })
  } catch {
    throw new ApiUnavailableError(
      `No se pudo conectar con la API (${API_URL}). Verifica que el backend este corriendo.`
    )
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Request failed" }))
    throw new Error(error.error || `API Error: ${res.status}`)
  }

  if (options.method && ["POST", "PUT", "DELETE"].includes(options.method.toUpperCase())) {
    revalidateTag("catalog")
  }

  return res.json()
}

export interface AdminCategory {
  id: number
  slug: string
  nombre: string
  descripcion: string
  imagen_url: string
}

export interface AdminMachinery {
  id: number
  slug: string
  nombre: string
  icono_nombre: string
  imagen_url: string
  descripcion: string
  categoria_id: number
}

export interface AdminTire {
  id: number
  nombre: string
  medida: string
  patron: string
  precio: string
  imagen_url: string
  marca_id: number
  maquinaria_id: number
}

export interface AdminBrand {
  id: number
  slug: string
  nombre: string
  logo_url: string
}

async function localGetCategories(): Promise<AdminCategory[]> {
  await requireSession()
  const { rows } = await pool.query<AdminCategory>(
    `SELECT
      id::int AS id,
      slug,
      nombre,
      COALESCE(descripcion, '') AS descripcion,
      COALESCE(imagen_url, '') AS imagen_url
    FROM categoria
    WHERE deleted_at IS NULL
    ORDER BY id DESC`
  )
  return rows
}

async function localGetMachinery(): Promise<AdminMachinery[]> {
  await requireSession()
  const { rows } = await pool.query<AdminMachinery>(
    `SELECT
      id::int AS id,
      slug,
      nombre,
      COALESCE(icono_nombre, '') AS icono_nombre,
      COALESCE(imagen_url, '') AS imagen_url,
      COALESCE(descripcion, '') AS descripcion,
      categoria_id::int AS categoria_id
    FROM maquinaria
    WHERE deleted_at IS NULL
    ORDER BY id DESC`
  )
  return rows
}

async function localGetTires(): Promise<AdminTire[]> {
  await requireSession()
  const { rows } = await pool.query<AdminTire>(
    `SELECT
      id::int AS id,
      nombre,
      COALESCE(medida, '') AS medida,
      COALESCE(patron, '') AS patron,
      COALESCE(precio, '') AS precio,
      COALESCE(imagen_url, '') AS imagen_url,
      COALESCE(marca_id, 0)::int AS marca_id,
      maquinaria_id::int AS maquinaria_id
    FROM neumaticos
    WHERE deleted_at IS NULL
    ORDER BY id DESC`
  )
  return rows
}

async function localGetBrands(): Promise<AdminBrand[]> {
  await requireSession()
  const { rows } = await pool.query<AdminBrand>(
    `SELECT
      id::int AS id,
      slug,
      nombre,
      COALESCE(logo_url, '') AS logo_url
    FROM marcas
    WHERE deleted_at IS NULL
    ORDER BY id DESC`
  )
  return rows
}

export async function getCategories(): Promise<AdminCategory[]> {
  try {
    return await adminFetch<AdminCategory[]>("/categorias")
  } catch (error) {
    if (ALLOW_LOCAL_DB_FALLBACK && isApiUnavailableError(error)) {
      return localGetCategories()
    }
    throw error
  }
}

export async function getMachinery(): Promise<AdminMachinery[]> {
  try {
    return await adminFetch<AdminMachinery[]>("/maquinaria")
  } catch (error) {
    if (ALLOW_LOCAL_DB_FALLBACK && isApiUnavailableError(error)) {
      return localGetMachinery()
    }
    throw error
  }
}

export async function getTires(): Promise<AdminTire[]> {
  try {
    return await adminFetch<AdminTire[]>("/neumaticos")
  } catch (error) {
    if (ALLOW_LOCAL_DB_FALLBACK && isApiUnavailableError(error)) {
      return localGetTires()
    }
    throw error
  }
}

export async function getBrands(): Promise<AdminBrand[]> {
  try {
    return await adminFetch<AdminBrand[]>("/marcas")
  } catch (error) {
    if (ALLOW_LOCAL_DB_FALLBACK && isApiUnavailableError(error)) {
      return localGetBrands()
    }
    throw error
  }
}

export async function createCategory(data: Partial<AdminCategory>): Promise<AdminCategory> {
  try {
    return await adminFetch<AdminCategory>("/admin/categorias", {
      method: "POST",
      body: JSON.stringify(data),
    })
  } catch (error) {
    if (!ALLOW_LOCAL_DB_FALLBACK || !isApiUnavailableError(error)) {
      throw error
    }

    await requireSession()
    try {
      const { rows } = await pool.query<AdminCategory>(
        `INSERT INTO categoria (slug, nombre, descripcion, imagen_url, created_at, updated_at)
         VALUES ($1, $2, $3, $4, NOW(), NOW())
         RETURNING id::int AS id, slug, nombre, COALESCE(descripcion, '') AS descripcion, COALESCE(imagen_url, '') AS imagen_url`,
        [
          requireText(data.slug, "slug"),
          requireText(data.nombre, "nombre"),
          optionalText(data.descripcion),
          optionalText(data.imagen_url),
        ]
      )
      return rows[0]
    } catch (dbError) {
      throw mapDbError(dbError)
    }
  }
}

export async function updateCategory(id: number, data: Partial<AdminCategory>): Promise<AdminCategory> {
  try {
    return await adminFetch<AdminCategory>(`/admin/categorias/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  } catch (error) {
    if (!ALLOW_LOCAL_DB_FALLBACK || !isApiUnavailableError(error)) {
      throw error
    }

    await requireSession()
    try {
      const { rows } = await pool.query<AdminCategory>(
        `UPDATE categoria
         SET slug = COALESCE($2, slug),
             nombre = COALESCE($3, nombre),
             descripcion = COALESCE($4, descripcion),
             imagen_url = COALESCE($5, imagen_url),
             updated_at = NOW()
         WHERE id = $1 AND deleted_at IS NULL
         RETURNING id::int AS id, slug, nombre, COALESCE(descripcion, '') AS descripcion, COALESCE(imagen_url, '') AS imagen_url`,
        [
          normalizeId(id),
          optionalText(data.slug),
          optionalText(data.nombre),
          optionalText(data.descripcion),
          optionalText(data.imagen_url),
        ]
      )

      if (!rows[0]) {
        throw new Error("Categoría no encontrada")
      }

      return rows[0]
    } catch (dbError) {
      throw mapDbError(dbError)
    }
  }
}

export async function deleteCategory(id: number): Promise<void> {
  try {
    await adminFetch<void>(`/admin/categorias/${id}`, {
      method: "DELETE",
    })
  } catch (error) {
    if (!ALLOW_LOCAL_DB_FALLBACK || !isApiUnavailableError(error)) {
      throw error
    }

    await requireSession()
    try {
      await pool.query(`DELETE FROM categoria WHERE id = $1`, [normalizeId(id)])
    } catch (dbError) {
      throw mapDbError(dbError)
    }
  }
}

export async function createMachinery(data: Partial<AdminMachinery>): Promise<AdminMachinery> {
  try {
    return await adminFetch<AdminMachinery>("/admin/maquinaria", {
      method: "POST",
      body: JSON.stringify(data),
    })
  } catch (error) {
    if (!ALLOW_LOCAL_DB_FALLBACK || !isApiUnavailableError(error)) {
      throw error
    }

    await requireSession()
    try {
      const { rows } = await pool.query<AdminMachinery>(
        `INSERT INTO maquinaria (slug, nombre, icono_nombre, imagen_url, descripcion, categoria_id, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
         RETURNING id::int AS id, slug, nombre, COALESCE(icono_nombre, '') AS icono_nombre,
                   COALESCE(imagen_url, '') AS imagen_url, COALESCE(descripcion, '') AS descripcion,
                   categoria_id::int AS categoria_id`,
        [
          requireText(data.slug, "slug"),
          requireText(data.nombre, "nombre"),
          optionalText(data.icono_nombre),
          optionalText(data.imagen_url),
          optionalText(data.descripcion),
          normalizeId(data.categoria_id),
        ]
      )
      return rows[0]
    } catch (dbError) {
      throw mapDbError(dbError)
    }
  }
}

export async function updateMachinery(id: number, data: Partial<AdminMachinery>): Promise<AdminMachinery> {
  try {
    return await adminFetch<AdminMachinery>(`/admin/maquinaria/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  } catch (error) {
    if (!ALLOW_LOCAL_DB_FALLBACK || !isApiUnavailableError(error)) {
      throw error
    }

    await requireSession()
    try {
      const { rows } = await pool.query<AdminMachinery>(
        `UPDATE maquinaria
         SET slug = COALESCE($2, slug),
             nombre = COALESCE($3, nombre),
             icono_nombre = COALESCE($4, icono_nombre),
             imagen_url = COALESCE($5, imagen_url),
             descripcion = COALESCE($6, descripcion),
             categoria_id = COALESCE($7, categoria_id),
             updated_at = NOW()
         WHERE id = $1 AND deleted_at IS NULL
         RETURNING id::int AS id, slug, nombre, COALESCE(icono_nombre, '') AS icono_nombre,
                   COALESCE(imagen_url, '') AS imagen_url, COALESCE(descripcion, '') AS descripcion,
                   categoria_id::int AS categoria_id`,
        [
          normalizeId(id),
          optionalText(data.slug),
          optionalText(data.nombre),
          optionalText(data.icono_nombre),
          optionalText(data.imagen_url),
          optionalText(data.descripcion),
          data.categoria_id ? normalizeId(data.categoria_id) : null,
        ]
      )

      if (!rows[0]) {
        throw new Error("Maquinaria no encontrada")
      }

      return rows[0]
    } catch (dbError) {
      throw mapDbError(dbError)
    }
  }
}

export async function deleteMachinery(id: number): Promise<void> {
  try {
    await adminFetch<void>(`/admin/maquinaria/${id}`, {
      method: "DELETE",
    })
  } catch (error) {
    if (!ALLOW_LOCAL_DB_FALLBACK || !isApiUnavailableError(error)) {
      throw error
    }

    await requireSession()
    try {
      await pool.query(`DELETE FROM maquinaria WHERE id = $1`, [normalizeId(id)])
    } catch (dbError) {
      throw mapDbError(dbError)
    }
  }
}

export async function createTire(data: Partial<AdminTire>): Promise<AdminTire> {
  try {
    return await adminFetch<AdminTire>("/admin/neumaticos", {
      method: "POST",
      body: JSON.stringify(data),
    })
  } catch (error) {
    if (!ALLOW_LOCAL_DB_FALLBACK || !isApiUnavailableError(error)) {
      throw error
    }

    await requireSession()
    try {
      const { rows } = await pool.query<AdminTire>(
        `INSERT INTO neumaticos (nombre, medida, patron, precio, imagen_url, marca_id, maquinaria_id, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
         RETURNING id::int AS id, nombre, COALESCE(medida, '') AS medida, COALESCE(patron, '') AS patron,
                   COALESCE(precio, '') AS precio, COALESCE(imagen_url, '') AS imagen_url,
                   COALESCE(marca_id, 0)::int AS marca_id, maquinaria_id::int AS maquinaria_id`,
        [
          requireText(data.nombre, "nombre"),
          optionalText(data.medida),
          optionalText(data.patron),
          optionalText(data.precio),
          optionalText(data.imagen_url),
          data.marca_id ? normalizeId(data.marca_id) : null,
          normalizeId(data.maquinaria_id),
        ]
      )
      return rows[0]
    } catch (dbError) {
      throw mapDbError(dbError)
    }
  }
}

export async function updateTire(id: number, data: Partial<AdminTire>): Promise<AdminTire> {
  try {
    return await adminFetch<AdminTire>(`/admin/neumaticos/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  } catch (error) {
    if (!ALLOW_LOCAL_DB_FALLBACK || !isApiUnavailableError(error)) {
      throw error
    }

    await requireSession()
    try {
      const { rows } = await pool.query<AdminTire>(
        `UPDATE neumaticos
         SET nombre = COALESCE($2, nombre),
             medida = COALESCE($3, medida),
             patron = COALESCE($4, patron),
             precio = COALESCE($5, precio),
             imagen_url = COALESCE($6, imagen_url),
             marca_id = COALESCE($7, marca_id),
             maquinaria_id = COALESCE($8, maquinaria_id),
             updated_at = NOW()
         WHERE id = $1 AND deleted_at IS NULL
         RETURNING id::int AS id, nombre, COALESCE(medida, '') AS medida, COALESCE(patron, '') AS patron,
                   COALESCE(precio, '') AS precio, COALESCE(imagen_url, '') AS imagen_url,
                   COALESCE(marca_id, 0)::int AS marca_id, maquinaria_id::int AS maquinaria_id`,
        [
          normalizeId(id),
          optionalText(data.nombre),
          optionalText(data.medida),
          optionalText(data.patron),
          optionalText(data.precio),
          optionalText(data.imagen_url),
          data.marca_id ? normalizeId(data.marca_id) : null,
          data.maquinaria_id ? normalizeId(data.maquinaria_id) : null,
        ]
      )

      if (!rows[0]) {
        throw new Error("Neumático no encontrado")
      }

      return rows[0]
    } catch (dbError) {
      throw mapDbError(dbError)
    }
  }
}

export async function deleteTire(id: number): Promise<void> {
  try {
    await adminFetch<void>(`/admin/neumaticos/${id}`, {
      method: "DELETE",
    })
  } catch (error) {
    if (!ALLOW_LOCAL_DB_FALLBACK || !isApiUnavailableError(error)) {
      throw error
    }

    await requireSession()
    try {
      await pool.query(`DELETE FROM neumaticos WHERE id = $1`, [normalizeId(id)])
    } catch (dbError) {
      throw mapDbError(dbError)
    }
  }
}

export async function createBrand(data: Partial<AdminBrand>): Promise<AdminBrand> {
  try {
    return await adminFetch<AdminBrand>("/admin/marcas", {
      method: "POST",
      body: JSON.stringify(data),
    })
  } catch (error) {
    if (!ALLOW_LOCAL_DB_FALLBACK || !isApiUnavailableError(error)) {
      throw error
    }

    await requireSession()
    try {
      const { rows } = await pool.query<AdminBrand>(
        `INSERT INTO marcas (slug, nombre, logo_url, created_at, updated_at)
         VALUES ($1, $2, $3, NOW(), NOW())
         RETURNING id::int AS id, slug, nombre, COALESCE(logo_url, '') AS logo_url`,
        [requireText(data.slug, "slug"), requireText(data.nombre, "nombre"), optionalText(data.logo_url)]
      )
      return rows[0]
    } catch (dbError) {
      throw mapDbError(dbError)
    }
  }
}

export async function updateBrand(id: number, data: Partial<AdminBrand>): Promise<AdminBrand> {
  try {
    return await adminFetch<AdminBrand>(`/admin/marcas/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  } catch (error) {
    if (!ALLOW_LOCAL_DB_FALLBACK || !isApiUnavailableError(error)) {
      throw error
    }

    await requireSession()
    try {
      const { rows } = await pool.query<AdminBrand>(
        `UPDATE marcas
         SET slug = COALESCE($2, slug),
             nombre = COALESCE($3, nombre),
             logo_url = COALESCE($4, logo_url),
             updated_at = NOW()
         WHERE id = $1 AND deleted_at IS NULL
         RETURNING id::int AS id, slug, nombre, COALESCE(logo_url, '') AS logo_url`,
        [normalizeId(id), optionalText(data.slug), optionalText(data.nombre), optionalText(data.logo_url)]
      )

      if (!rows[0]) {
        throw new Error("Marca no encontrada")
      }

      return rows[0]
    } catch (dbError) {
      throw mapDbError(dbError)
    }
  }
}

export async function deleteBrand(id: number): Promise<void> {
  try {
    await adminFetch<void>(`/admin/marcas/${id}`, {
      method: "DELETE",
    })
  } catch (error) {
    if (!ALLOW_LOCAL_DB_FALLBACK || !isApiUnavailableError(error)) {
      throw error
    }

    await requireSession()
    try {
      await pool.query(`DELETE FROM marcas WHERE id = $1`, [normalizeId(id)])
    } catch (dbError) {
      throw mapDbError(dbError)
    }
  }
}
