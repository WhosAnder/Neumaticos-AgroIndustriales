import { Pool } from "pg"
import {
  ApiCategory,
  ApiMachinery,
  ApiTire,
  ApiBrand,
  ApiService,
} from "./api-types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"
export const REVALIDATE = 3600
const ALLOW_LOCAL_DB_FALLBACK = process.env.PUBLIC_USE_LOCAL_DB_FALLBACK !== "false"

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

async function fetchAPI<T>(endpoint: string): Promise<T> {
  let res: Response

  try {
    res = await fetch(`${API_URL}${endpoint}`, {
      next: { revalidate: REVALIDATE },
    })
  } catch (cause) {
    const error = new Error(`No se pudo conectar con la API (${API_URL}).`) as Error & { cause: unknown }
    error.cause = cause
    throw error
  }

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

async function localFetchCategories(): Promise<ApiCategory[]> {
  const { rows } = await pool.query<ApiCategory>(
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

async function localFetchBrands(): Promise<ApiBrand[]> {
  const { rows } = await pool.query<ApiBrand>(
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

async function localFetchServices(): Promise<ApiService[]> {
  const { rows } = await pool.query<ApiService>(
    `SELECT
      id::int AS id,
      titulo,
      COALESCE(descripcion, '') AS descripcion,
      COALESCE(icono_nombre, '') AS icono_nombre,
      COALESCE(texto_boton, '') AS texto_boton
    FROM servicios
    WHERE deleted_at IS NULL
    ORDER BY id DESC`
  )
  return rows
}

async function localFetchMachineryByCategory(categorySlug: string): Promise<ApiMachinery[]> {
  const { rows } = await pool.query<ApiMachinery>(
    `SELECT
      m.id::int AS id,
      m.slug,
      m.nombre,
      COALESCE(m.icono_nombre, '') AS icono_nombre,
      COALESCE(m.imagen_url, '') AS imagen_url,
      COALESCE(m.descripcion, '') AS descripcion,
      m.categoria_id::int AS categoria_id
    FROM maquinaria m
    JOIN categoria c ON c.id = m.categoria_id
    WHERE m.deleted_at IS NULL
      AND c.deleted_at IS NULL
      AND c.slug = $1
    ORDER BY m.id DESC`,
    [categorySlug]
  )
  return rows
}

async function localFetchTiresByMachinery(machinerySlug: string): Promise<ApiTire[]> {
  const { rows } = await pool.query<ApiTire>(
    `SELECT
      n.id::int AS id,
      n.nombre,
      COALESCE(n.medida, '') AS medida,
      COALESCE(n.patron, '') AS patron,
      COALESCE(n.precio, '') AS precio,
      COALESCE(n.imagen_url, '') AS imagen_url,
      COALESCE(n.marca_id, 0)::int AS marca_id,
      n.maquinaria_id::int AS maquinaria_id
    FROM neumaticos n
    JOIN maquinaria m ON m.id = n.maquinaria_id
    WHERE n.deleted_at IS NULL
      AND m.deleted_at IS NULL
      AND m.slug = $1
    ORDER BY n.id DESC`,
    [machinerySlug]
  )
  return rows
}

export async function fetchCategories(): Promise<ApiCategory[]> {
  return localFetchCategories()
}

export async function fetchMachineryByCategory(categorySlug: string): Promise<ApiMachinery[]> {
  return localFetchMachineryByCategory(categorySlug)
}

export async function fetchTiresByMachinery(machinerySlug: string): Promise<ApiTire[]> {
  return localFetchTiresByMachinery(machinerySlug)
}

export async function fetchBrands(): Promise<ApiBrand[]> {
  return localFetchBrands()
}

export async function fetchServices(): Promise<ApiService[]> {
  return localFetchServices()
}
