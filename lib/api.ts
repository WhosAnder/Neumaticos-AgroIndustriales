import {
  ApiCategory,
  ApiMachinery,
  ApiTire,
  ApiBrand,
  ApiService,
} from "./api-types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"
export const REVALIDATE = 3600

async function fetchAPI<T>(endpoint: string): Promise<T> {
  let res: Response

  try {
    res = await fetch(`${API_URL}${endpoint}`, {
      next: { revalidate: REVALIDATE },
    })
  } catch (cause) {
    const error = new Error(
      `No se pudo conectar con la API (${API_URL}${endpoint}).`
    ) as Error & { cause: unknown }
    error.cause = cause
    throw error
  }

  if (!res.ok) {
    throw new Error(`API Error ${res.status}: ${res.statusText} — ${API_URL}${endpoint}`)
  }

  return res.json()
}

export async function fetchCategories(): Promise<ApiCategory[]> {
  return fetchAPI<ApiCategory[]>("/categorias")
}

export async function fetchMachineryByCategory(
  categorySlug: string
): Promise<ApiMachinery[]> {
  return fetchAPI<ApiMachinery[]>(`/categorias/${categorySlug}/maquinaria`)
}

export async function fetchTiresByMachinery(
  machinerySlug: string
): Promise<ApiTire[]> {
  return fetchAPI<ApiTire[]>(`/maquinaria/${machinerySlug}/neumaticos`)
}

export async function fetchBrands(): Promise<ApiBrand[]> {
  return fetchAPI<ApiBrand[]>("/marcas")
}

export async function fetchServices(): Promise<ApiService[]> {
  return fetchAPI<ApiService[]>("/servicios")
}
