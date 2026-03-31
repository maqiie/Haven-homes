import puppeteer from 'puppeteer'
import { preview } from 'vite'
import fs from 'fs'
import path from 'path'

const routes = [
  '/',
  '/properties',
  '/about',
  '/contact',
  '/services',
  '/sellproperty',
  '/developer',
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