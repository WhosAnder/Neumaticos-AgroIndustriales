/**
 * Tipos del dominio — usados por los componentes de la UI.
 *
 * Nota: Son distintos de ApiTypes (api-types.ts) que reflejan la respuesta cruda de nei-api.
 * Los mappers en utils.ts transforman ApiType → Type.
 * La diferencia principal: `id` en Category y Machinery usa el `slug` (string) como identificador
 * para la navegación por URL, mientras que en los datos de la API es un número autoincremental.
 */

export interface Category {
  id: string        // slug — usado como parámetro de URL
  nombre: string
  descripcion: string
  imagen_url: string
}

export interface Machinery {
  id: string        // slug — usado como parámetro de URL
  nombre: string
  icono_nombre: string
  imagen_url: string
  descripcion: string
}

export interface Tire {
  id: number
  nombre: string
  medida: string
  patron: string
  precio: string
  imagen_url: string
  marca_id: number
  maquinaria_id: number
  marca_nombre?: string  // resuelto en el cliente vía join con Brand
}

export interface Brand {
  id: number
  slug: string
  nombre: string
  logo_url: string
}

export interface Service {
  id: number
  titulo: string
  descripcion: string
  icono_nombre: string
  texto_boton?: string
}
