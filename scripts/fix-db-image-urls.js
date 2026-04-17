#!/usr/bin/env node
/**
 * Script: fix-db-image-urls.js
 * Actualiza en la base de datos todas las URLs de imágenes que aún tienen
 * extensiones .png, .jpg, .jpeg o .JPG por .webp
 *
 * Uso: node scripts/fix-db-image-urls.js
 */

const { Client } = require("pg")

const DB_URL =
  process.env.DATABASE_URL ||
  "postgresql://postgres:LLYpmJWecHIqatheRlTlOdMdRAbKrtPj@interchange.proxy.rlwy.net:19560/railway"

// Tablas y columnas que pueden tener URLs de imagen
const TARGETS = [
  { table: "categoria",   column: "imagen_url" },
  { table: "maquinaria",  column: "imagen_url" },
  { table: "marcas",      column: "logo_url"   },
  { table: "neumaticos",  column: "imagen_url" },
]

async function run() {
  const client = new Client({ connectionString: DB_URL })
  await client.connect()
  console.log("✅ Conectado a la base de datos\n")

  let totalUpdated = 0

  for (const { table, column } of TARGETS) {
    // Verificar que la tabla/columna existan para evitar errores
    const exists = await client.query(`
      SELECT 1 FROM information_schema.columns
      WHERE table_name = $1 AND column_name = $2
      LIMIT 1
    `, [table, column])

    if (exists.rowCount === 0) {
      console.log(`⏭  Tabla '${table}.${column}' no existe, omitiendo`)
      continue
    }

    // Ver cuántos registros tienen URLs con extensión antigua
    const preview = await client.query(`
      SELECT id, ${column} FROM ${table}
      WHERE ${column} ~* '\\.(png|jpg|jpeg)$'
    `)

    if (preview.rowCount === 0) {
      console.log(`✅ ${table}.${column}: sin URLs antiguas`)
      continue
    }

    console.log(`🔄 ${table}.${column}: ${preview.rowCount} URL(s) a actualizar`)
    for (const row of preview.rows) {
      console.log(`   id=${row.id}  ${row[column]}`)
    }

    // Reemplazar extensiones en masa usando regexp_replace
    const result = await client.query(`
      UPDATE ${table}
      SET ${column} = regexp_replace(${column}, '\\.(png|jpg|jpeg|PNG|JPG|JPEG)$', '.webp', 'i')
      WHERE ${column} ~* '\\.(png|jpg|jpeg)$'
    `)

    console.log(`   → ${result.rowCount} fila(s) actualizadas\n`)
    totalUpdated += result.rowCount
  }

  console.log(`\n📊 Resumen: ${totalUpdated} URL(s) actualizadas en total`)
  await client.end()
}

run().catch((err) => {
  console.error("❌ Error:", err.message)
  process.exit(1)
})
