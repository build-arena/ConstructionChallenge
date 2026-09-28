import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

const root = new URL('../', import.meta.url)
const read = name => readFileSync(new URL(name, root))
const meta = JSON.parse(read('src/data/s01-scoring-download.json'))
assert.equal(meta.contents, 'source-only', 'Only source/configurations/synthetic tests are approved for this download')
const html = read('dist/index.html').toString()
const main = html.match(/src="([^"]*\/assets\/[^"/]+\.js)"/)[1]
const base = main.slice(0, main.lastIndexOf('/assets/') + 1)
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
for (const [file, sha] of [[meta.file,meta.sha256],[meta.guide,meta.guideSha256]]) {
  const bytes = read('dist/' + file)
  assert.equal(hash(bytes), sha, file)
  if (file === meta.file) { assert.equal(bytes.length,meta.bytes); assert.equal(bytes.subarray(0,2).toString(),'PK') }
  if (process.argv[2]) {
    const url = new URL(base + file, process.argv[2])
    const response = await fetch(url)
    assert.equal(response.status,200,url.href)
    assert.equal(hash(Buffer.from(await response.arrayBuffer())),sha,url.href)
    console.log(`HTTP verified: ${url.href}`)
  }
}
const checksum = read('dist/' + meta.checksum).toString().trim()
assert.equal(checksum.split(/\s+/)[0],meta.sha256)
if (process.argv[2]) {
  const response = await fetch(new URL(base + meta.checksum, process.argv[2]))
  assert.equal(response.status,200)
  assert.equal((await response.text()).trim(),checksum)
}
console.log(`Verified ZIP, guide and SHA-256 sidecar under ${base}; complete bundle ${meta.bytes.toLocaleString()} bytes.`)
