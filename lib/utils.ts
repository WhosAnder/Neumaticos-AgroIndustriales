import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ApiCategory, ApiMachinery, ApiTire, ApiService, ApiBrand } from "./api-types"
import { Category, Machinery, Tire, Service, Brand } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mapCategory(api: ApiCategory): Category {
  return {
    id: api.slug,
    nombre: api.nombre,
    descripcion: api.descripcion,
    imagen_url: api.imagen_url,
  }
}

export function mapMachinery(api: ApiMachinery): Machinery {
  return {
    id: api.slug,
    nombre: api.nombre,
    icono_nombre: api.icono_nombre,
    imagen_url: api.imagen_url,
    descripcion: api.descripcion,
  }
}

export function mapTire(api: ApiTire, brands: Brand[] = []): Tire {
  const brand = brands.find((b) => b.id === api.marca_id)
  return {
    id: api.id,
    nombre: api.nombre,
    medida: api.medida,
    patron: api.patron,
    precio: api.precio,
    imagen_url: api.imagen_url,
    marca_id: api.marca_id,
    maquinaria_id: api.maquinaria_id,
    marca_nombre: brand?.nombre,
  }
}

export function mapService(api: ApiService): Service {
  return {
    id: api.id,
    titulo: api.titulo,
    descripcion: api.descripcion,
    icono_nombre: api.icono_nombre,
    texto_boton: api.texto_boton,
  }
}
