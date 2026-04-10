# Neumáticos Agroindustriales — Frontend

Landing page e interfaz de administración para el catálogo de neumáticos agrícolas e industriales. Construida con **Next.js 14**, **TypeScript**, **Tailwind CSS** y **Better Auth**.

---

## Stack

| Capa            | Tecnología                                      |
|-----------------|-------------------------------------------------|
| Framework       | Next.js 14 (App Router)                         |
| Lenguaje        | TypeScript 5                                    |
| Estilos         | Tailwind CSS 3 + shadcn/ui (Radix UI)           |
| Autenticación   | Better Auth v1.5                                |
| ORM / DB        | Drizzle ORM + PostgreSQL (pg driver)            |
| Formularios     | React Hook Form + Zod                           |
| Iconos          | Lucide React                                    |
| Animaciones     | tailwindcss-animate                             |
| Analytics       | Vercel Analytics                                |
| Despliegue      | Vercel (frontend) + Railway (base de datos)     |

---

## Estructura del proyecto

```
Neumaticos-AgroIndustriales/
├── app/
│   ├── layout.tsx               # Layout raíz (fuentes, providers)
│   ├── page.tsx                 # Home → <HomePage />
│   ├── loading.tsx              # Loading UI global
│   ├── globals.css              # Variables CSS y estilos base
│   ├── admin/                   # Panel de administración (protegido)
│   │   ├── layout.tsx
│   │   ├── (auth)/              # Login admin
│   │   ├── categorias/          # CRUD categorías
│   │   ├── maquinaria/          # CRUD maquinaria
│   │   ├── marcas/              # CRUD marcas
│   │   └── neumaticos/          # CRUD neumáticos
│   ├── api/
│   │   ├── admin/               # API routes admin (proxy hacia nei-api)
│   │   └── auth/                # Endpoints de Better Auth
│   ├── categorias/              # Páginas públicas de catálogo por categoría
│   ├── contacto/                # Página de contacto
│   └── servicios/               # Página de servicios
├── components/
│   ├── pages/                   # Componentes de página completa (home-page, etc.)
│   ├── admin/                   # Componentes del panel admin
│   ├── header.tsx               # Navegación principal
│   ├── footer.tsx               # Pie de página
│   ├── mobile-menu.tsx          # Menú hamburguesa (responsive)
│   ├── breadcrumb.tsx           # Navegación contextual
│   ├── whatsapp-button.tsx      # Botón flotante de WhatsApp
│   ├── theme-provider.tsx       # Proveedor de tema (next-themes)
│   └── ui/                      # Componentes shadcn/ui
├── hooks/
│   ├── use-mobile.tsx           # Detección de viewport mobile
│   └── use-toast.ts             # Sistema de notificaciones
├── lib/
│   ├── api.ts                   # Cliente de datos (PostgreSQL directo + fetch a nei-api)
│   ├── api-types.ts             # Tipos TypeScript que reflejan respuestas de nei-api
│   ├── types.ts                 # Tipos del dominio (Category, Machinery, Tire, Brand, Service)
│   ├── admin-api.ts             # Cliente HTTP para operaciones CRUD admin
│   ├── admin-jwt.ts             # Generación de JWT para autenticar con nei-api
│   ├── auth.ts                  # Configuración Better Auth (cliente)
│   ├── auth-schema.ts           # Esquema Drizzle para tablas de Better Auth
│   ├── db.ts                    # Conexión PostgreSQL (Drizzle)
│   ├── data.ts                  # Re-exportaciones de datos
│   ├── frontend-fallback-data.ts # Datos estáticos de respaldo
│   └── utils.ts                 # Utilidades (cn, formatters)
├── middleware.ts                # Protección de rutas /admin/*
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## Funcionalidades

### Catálogo público
- **Home**: Hero section, servicios, marcas y enlace al catálogo.
- **Categorías**: Listado de categorías (Agrícola / Industrial) con imagen.
- **Maquinaria**: Lista de maquinaria por categoría, con ícono y descripción.
- **Neumáticos**: Neumáticos disponibles por tipo de maquinaria, con medida, patrón, marca y precio.
- **Servicios**: Cotización, asesoría personalizada y montajes.
- **Contacto**: Formulario de contacto.

### Panel Admin (`/admin`)
Requiere sesión activa (protegido por `middleware.ts`):
- CRUD completo de **Categorías**, **Maquinaria**, **Neumáticos** y **Marcas**.
- Login con Better Auth.
- Las operaciones se comunican con `nei-api` usando JWT.

---

## Autenticación

### Usuarios públicos
No requieren autenticación. Todas las páginas del catálogo son públicas.

### Administradores
- Autenticación vía **Better Auth** (`/admin/login`).
- El middleware `middleware.ts` redirige cualquier ruta `/admin/*` al login si no existe el cookie `better-auth.session_token`.
- Las API routes de administración generan un **JWT** firmado con `ADMIN_API_JWT_SECRET` para autenticarse con `nei-api`.

---

## Capa de datos (`lib/api.ts`)

El frontend se conecta directamente a **PostgreSQL** (sin pasar por `nei-api`) para las páginas del catálogo público, usando el driver `pg` con `Pool`:

```typescript
const pool = new Pool({
  connectionString: process.env.DATABASE_PUBLIC_URL || process.env.DATABASE_URL,
})
```

Las consultas SQL usan `deleted_at IS NULL` para respetar el soft delete de GORM.

| Función                            | Descripción                              |
|------------------------------------|------------------------------------------|
| `fetchCategories()`                | Lista todas las categorías               |
| `fetchMachineryByCategory(slug)`   | Maquinaria filtrada por slug de categoría|
| `fetchTiresByMachinery(slug)`      | Neumáticos filtrados por slug de máquina |
| `fetchBrands()`                    | Lista todas las marcas                   |
| `fetchServices()`                  | Lista todos los servicios                |

> **Nota:** La variable `ALLOW_LOCAL_DB_FALLBACK` (env `PUBLIC_USE_LOCAL_DB_FALLBACK`) permite habilitar o deshabilitar el fallback a DB local. Actualmente todas las funciones de lectura usan consulta directa a PostgreSQL.

---

## Variables de entorno

Copia `.env.local.example` a `.env.local` y configura:

| Variable                  | Descripción                                       | Ejemplo                              |
|---------------------------|---------------------------------------------------|--------------------------------------|
| `DATABASE_URL`            | PostgreSQL privado (Railway producción)           | `postgresql://...`                   |
| `DATABASE_PUBLIC_URL`     | PostgreSQL público (desarrollo local)             | `postgresql://...`                   |
| `NEXT_PUBLIC_API_URL`     | URL base de `nei-api`                             | `http://localhost:8080/api/v1`       |
| `PUBLIC_USE_LOCAL_DB_FALLBACK` | Habilitar DB directa (`true`/`false`)        | `true`                               |
| `ADMIN_API_JWT_SECRET`    | Secret para firmar JWTs admin                     | —                                    |
| `BETTER_AUTH_SECRET`      | Secret de Better Auth                             | —                                    |
| `BETTER_AUTH_URL`         | URL base de la app para Better Auth               | `http://localhost:3000`              |

---

## Desarrollo local

### Requisitos

- Node.js 22+
- npm o pnpm
- PostgreSQL accesible (o Railway public proxy)

### Iniciar el servidor de desarrollo

```bash
npm install
npm run dev
```

La app estará disponible en `http://localhost:3000`.

### Scripts disponibles

| Script        | Descripción                    |
|---------------|--------------------------------|
| `npm run dev` | Servidor de desarrollo (HMR)  |
| `npm run build` | Build de producción          |
| `npm start`   | Servidor de producción         |
| `npm run lint`| Lint con ESLint                |

---

## Relación con nei-api

El frontend interactúa con `nei-api` en dos contextos:

1. **Panel admin** (`lib/admin-api.ts`): Todas las operaciones de escritura (POST, PUT, DELETE) se envían a `nei-api` con un JWT de admin en el header `Authorization`.  
2. **Catálogo público** (`lib/api.ts`): Se conecta directamente a PostgreSQL para lecturas (sin pasar por `nei-api`), aprovechando Next.js ISR con `revalidate: 3600`.

---

## Despliegue

### Vercel (Frontend)

1. Importar el repositorio en Vercel.
2. Configurar variables de entorno en el dashboard de Vercel.
3. El build se ejecuta automáticamente con `next build`.

### Railway (Base de datos)

Railway provee PostgreSQL. El frontend usa `DATABASE_PUBLIC_URL` en desarrollo y `DATABASE_URL` en producción (red privada de Railway).
