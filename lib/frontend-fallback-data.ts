export const frontendFallbackCategories = [
  {
    id: 1,
    slug: "agricola",
    nombre: "Agrícola",
    descripcion: "Neumáticos especializados para maquinaria agrícola",
    imagen_url: "/images/agricultural-machinery-new.webp",
  },
  {
    id: 2,
    slug: "industrial",
    nombre: "Industrial",
    descripcion: "Neumáticos para maquinaria industrial y construcción",
    imagen_url: "/images/industrial-machinery.webp",
  },
]

export const frontendFallbackMachinery = [
  { id: 1, slug: "tractor", nombre: "Tractor agrícola", icono_nombre: "Tractor", imagen_url: "/images/Tractor agrícola.webp", descripcion: "Neumáticos para tractores agrícolas", categoria_id: 1 },
  { id: 2, slug: "implemento", nombre: "Implemento (Empacadora)", icono_nombre: "Package", imagen_url: "/images/Implemento (Empacadora).webp", descripcion: "Neumáticos para empacadoras", categoria_id: 1 },
  { id: 3, slug: "trilladora", nombre: "Trilladora", icono_nombre: "Wheat", imagen_url: "/images/trilladora.webp", descripcion: "Neumáticos para trilladoras", categoria_id: 1 },
  { id: 4, slug: "minicargador-agricola", nombre: "Minicargador", icono_nombre: "Truck", imagen_url: "/images/minicargador -agricola.webp", descripcion: "Neumáticos para minicargadores agrícolas", categoria_id: 1 },
  { id: 5, slug: "grua", nombre: "Grúa", icono_nombre: "Crane", imagen_url: "/images/Grúa.webp", descripcion: "Neumáticos para grúas", categoria_id: 2 },
  { id: 6, slug: "montacargas", nombre: "Montacargas", icono_nombre: "Forklift", imagen_url: "/images/montacargas.webp", descripcion: "Neumáticos para montacargas", categoria_id: 2 },
  { id: 7, slug: "cargador", nombre: "Cargador", icono_nombre: "Loader", imagen_url: "/images/cargador.webp", descripcion: "Neumáticos para cargadores", categoria_id: 2 },
  { id: 8, slug: "retroexcavadora", nombre: "Retroexcavadora", icono_nombre: "Shovel", imagen_url: "/images/retroexcavadora.webp", descripcion: "Neumáticos para retroexcavadoras", categoria_id: 2 },
  { id: 9, slug: "vibrocompactador", nombre: "Vibro compactador", icono_nombre: "Drum", imagen_url: "/images/Vibro compactador.webp", descripcion: "Neumáticos para vibro compactadores", categoria_id: 2 },
  { id: 10, slug: "motoconformadora", nombre: "Motoconformadora", icono_nombre: "Ruler", imagen_url: "/images/motoconformadora.webp", descripcion: "Neumáticos para motoconformadoras", categoria_id: 2 },
  { id: 11, slug: "camion", nombre: "Camión", icono_nombre: "Truck", imagen_url: "/images/Camión.webp", descripcion: "Neumáticos para camiones", categoria_id: 2 },
  { id: 12, slug: "camion-muevetierra", nombre: "Camión muevetierra", icono_nombre: "Truck", imagen_url: "/images/Camión muevetierra.webp", descripcion: "Neumáticos para camiones muevetierra", categoria_id: 2 },
  { id: 13, slug: "minicargador-industrial", nombre: "Minicargador", icono_nombre: "Truck", imagen_url: "/images/minicargador.webp", descripcion: "Neumáticos para minicargadores industriales", categoria_id: 2 },
]

export const frontendFallbackBrands = [
  { id: 1, slug: "pirelli", nombre: "Pirelli", logo_url: "/images/marcas/pirelli.webp" },
  { id: 2, slug: "seba", nombre: "SEBA", logo_url: "/images/marcas/seba.webp" },
  { id: 3, slug: "goodyear", nombre: "Goodyear", logo_url: "/images/marcas/goodyear.webp" },
  { id: 4, slug: "eurogrip", nombre: "Eurogrip", logo_url: "/images/marcas/eurogrip.webp" },
  { id: 5, slug: "samson", nombre: "Samson", logo_url: "/images/marcas/samson.webp" },
  { id: 6, slug: "galaxy", nombre: "Galaxy", logo_url: "/images/marcas/galaxy.webp" },
  { id: 7, slug: "numa", nombre: "Numa", logo_url: "/images/marcas/numa.webp" },
]

export const frontendFallbackTires = [
  { id: 1, nombre: "Neumático agrícola 15.5-38 RTW", medida: "15.5-38", patron: "RTW", precio: "$1,250", imagen_url: "/placeholder.svg", marca_id: 2, maquinaria_id: 1 },
  { id: 2, nombre: "Neumático agrícola 18.4-34", medida: "18.4-34", patron: "R-1", precio: "$1,450", imagen_url: "/placeholder.svg", marca_id: 3, maquinaria_id: 1 },
  { id: 3, nombre: "Neumático agrícola 16.9-30", medida: "16.9-30", patron: "AGRIBIB", precio: "$1,350", imagen_url: "/placeholder.svg", marca_id: 1, maquinaria_id: 1 },
  { id: 4, nombre: "Neumático industrial 12.5/80-18", medida: "12.5/80-18", patron: "SKS 532", precio: "$650", imagen_url: "/placeholder.svg", marca_id: 5, maquinaria_id: 8 },
  { id: 5, nombre: "Neumático industrial 17.5L-24", medida: "17.5L-24", patron: "LD 250", precio: "$950", imagen_url: "/placeholder.svg", marca_id: 6, maquinaria_id: 8 },
  { id: 6, nombre: "Neumático industrial 6.50-10", medida: "6.50-10", patron: "LUG", precio: "$420", imagen_url: "/placeholder.svg", marca_id: 3, maquinaria_id: 6 },
  { id: 7, nombre: "Neumático industrial 7.00-12", medida: "7.00-12", patron: "IND", precio: "$520", imagen_url: "/placeholder.svg", marca_id: 1, maquinaria_id: 6 },
]
