import puppeteer from 'puppeteer'
import { preview } from 'vite'
import fs from 'fs'
import path from 'path'

const routes = [
  // Main pages
  '/',
  '/properties',
  '/about',
  '/contact',
  '/services',
  '/sellproperty',
  '/developer',

  // For Sale — Apartments
  '/property/2',   // A-One Pandora — 3 Bed + Study (155sqm) — Lavington
  '/property/5',   // Panorama West — Standard 1BR (74sqm) — Westlands
  '/property/8',   // Balkis Residences — 2 Bedroom (109-114sqm) — Riverside
  '/property/9',   // Balkis Residences — 2 Bed + DSQ (128-133sqm) — Riverside
  '/property/13',  // Amethyst Springs — 1 Bedroom (62sqm) — Kilimani
  '/property/17',  // Lesto Residences — 1 Bedroom (83sqm) — Westlands
  '/property/47',  // Luna Oak Residency — 3 Bed (158sqm) — Kilimani
  '/property/48',  // Luna Oak Residency — 3 Bed (160sqm) — Kilimani
  '/property/49',  // Luna Oak Residency — 3 Bed + DSQ (209sqm) — Kilimani
  '/property/50',  // Luna Oak Residency — 3 Bed + DSQ (211sqm) — Kilimani
  '/property/51',  // Luna Oak Residency — 4 Bed + DSQ (247sqm) — Kilimani
  '/property/52',  // Luna Oak Residency — 4 Bed + DSQ (256sqm) — Kilimani

  // For Sale — Houses & Villas
  '/property/53',  // Garden Villas Lavington — 5 Bed Luxury Villa
  '/property/56',  // Runda — Iconic 4 Bed Luxury Villa
  '/property/57',  // Lavington — 5 Bed Townhouse For Sale

  // For Rent
  '/property/54',  // 4 Bedroom Villa + DSQ — Kiambu Road
  '/property/55',  // Lavington — 5 Bed Townhouse + Pool
  '/property/58',  // Lower Kabete — 5 Bed Smart Home + Sauna
]

const server = await preview({ preview: { port: 3333, strictPort: true } })

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/google-chrome-stable',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

for (const route of routes) {
  const page = await browser.newPage()
  await page.goto(`http://localhost:3333${route}`, { waitUntil: 'networkidle0', timeout: 15000 })
  const html = await page.content()
  const dir = path.join('dist', route === '/' ? '' : route)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), html)
  console.log(`✅  prerendered ${route}`)
  await page.close()
}

await browser.close()
server.httpServer.close()
console.log('🎉  all routes prerendered!')