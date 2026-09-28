/**
 * One-off script: generate public/img/qr-drive.svg from links.memoriesDrive.
 * Not part of the build — run manually whenever the Drive link changes:
 *   node scripts/gen-qr.mjs
 */
import { writeFile } from 'node:fs/promises'
import QRCode from 'qrcode'
import { links } from '../src/content.ts'

const svg = await QRCode.toString(links.memoriesDrive, {
  type: 'svg',
  margin: 1,
  color: { dark: '#441828', light: '#fcf8f100' },
})

await writeFile(new URL('../public/img/qr-drive.svg', import.meta.url), svg)
console.log('Wrote public/img/qr-drive.svg for', links.memoriesDrive)
