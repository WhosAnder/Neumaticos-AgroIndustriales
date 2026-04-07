export interface Category {
  id: string
  nombre: string
  descripcion: string
  imagen_url: string
}

export interface Machinery {
  id: string
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
  marca_nombre?: string
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
