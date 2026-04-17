#!/usr/bin/env node
/**
 * Script: revert-webp-to-png.js
 * Convierte todos los .webp de public/images de regreso a .png y los elimina.
 */
const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

const IMAGES_DIR = path.join(__dirname, "..", "public", "images")

const SKIP_DIRS = new Set(["neumaticos", "categorias"]) // UUID uploads - quedan como están

let converted = 0, errors = 0

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walkDir(fullPath)
    } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === ".webp") {
      const outPath = fullPath.replace(/\.webp$/i, ".png")
      pendingConversions.push({ from: fullPath, to: outPath })
    }
  }
}

const pendingConversions = []
walkDir(IMAGES_DIR)

;(async () => {
  for (const { from, to } of pendingConversions) {
    const rel = path.relative(IMAGES_DIR, from)
    try {
      await sharp(from).png().toFile(to)
      fs.unlinkSync(from)
      console.log(`✅ ${rel} → ${path.basename(to)}`)
      converted++
    } catch (err) {
      console.error(`❌ ${rel}: ${err.message}`)
      errors++
    }
  }
  console.log(`\n📊 ${converted} convertidas, ${errors} errores`)
})()
