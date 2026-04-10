export interface ApiCategory {
  id: number
  slug: string
  nombre: string
  descripcion: string
  imagen_url: string
}

export interface ApiMachinery {
  id: number
  slug: string
  nombre: string
  icono_nombre: string
  imagen_url: string
  descripcion: string
  categoria_id: number
}

export interface ApiTire {
  id: number
  nombre: string
  medida: string
  patron: string
  precio: string
  imagen_url: string
  marca_id: number
  maquinaria_id: number
}

export interface ApiBrand {
  id: number
  slug: string
  nombre: string
  logo_url: string
}

export interface ApiService {
  id: number
  titulo: string
  descripcion: string
  icono_nombre: string
  texto_boton: string
}
