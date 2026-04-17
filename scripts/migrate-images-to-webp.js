#!/usr/bin/env node
/**
 * Script: migrate-images-to-webp.js
 * Convierte todas las imágenes PNG/JPG/JPEG/GIF en public/images a WebP.
 * Las originales se eliminan tras la conversión exitosa.
 *
 * Uso: node scripts/migrate-images-to-webp.js
 */

const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

const IMAGES_DIR = path.join(__dirname, "..", "public", "images")
const EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".gif"])
// Archivos a preservar sin convertir (logos usados en <Image> con rutas hardcodeadas)
const SKIP_FILES = new Set([
  "favicon.png",    // favicon del navegador
  "icon-180.png",   // apple touch icon
  "icon-512.png",   // PWA icon
])

let converted = 0
let skipped = 0
let errors = 0

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walkDir(fullPath)
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase()
      if (EXTENSIONS.has(ext)) {
        if (SKIP_FILES.has(entry.name)) {
          console.log(`⏭  Skipped (reserved): ${entry.name}`)
          skipped++
          continue
        }
        convertToWebP(fullPath)
      }
    }
  }
}

function convertToWebP(filePath) {
  const parsed = path.parse(filePath)
  const outPath = path.join(parsed.dir, parsed.name + ".webp")

  // Si ya existe un .webp con el mismo nombre, omitir
  if (fs.existsSync(outPath)) {
    console.log(`⏭  Already exists: ${path.relative(IMAGES_DIR, outPath)}`)
    skipped++
    return
  }

  try {
    // sharp es async pero usamos spawnSync-compatible approach vía promises — 
    // para script Node usamos execFileSync con un sub-proceso inline.
    // En su lugar, acumulamos y ejecutamos en Promise.all al final.
    pendingConversions.push({ filePath, outPath })
  } catch (err) {
    console.error(`❌ Error queuing ${filePath}: ${err.message}`)
    errors++
  }
}

const pendingConversions = []
walkDir(IMAGES_DIR)

;(async () => {
  for (const { filePath, outPath } of pendingConversions) {
    const rel = path.relative(IMAGES_DIR, filePath)
    try {
      await sharp(filePath).webp({ quality: 85 }).toFile(outPath)
      fs.unlinkSync(filePath)
      const origSize = fs.existsSync(outPath) ? fs.statSync(outPath).size : 0
      console.log(`✅ Converted: ${rel} → ${path.basename(outPath)} (${(origSize / 1024).toFixed(1)} KB)`)
      converted++
    } catch (err) {
      console.error(`❌ Failed: ${rel} — ${err.message}`)
      errors++
    }
  }

  console.log(`\n📊 Resumen: ${converted} convertidas, ${skipped} omitidas, ${errors} errores`)
})()
