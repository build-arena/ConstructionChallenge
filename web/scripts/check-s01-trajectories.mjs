// Run after npm run build. Optional origin checks deployed HTTP paths as well.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

const root = new URL('../', import.meta.url)
const read = path => readFileSync(new URL(path, root))
const manifest = JSON.parse(read('src/data/s01-trajectories.json'))
const results = JSON.parse(read('src/data/s01-results.json'))
const html = read('dist/index.html').toString()
const mainScript = html.match(/src="([^"]*\/assets\/[^"/]+\.js)"/)[1]
const base = mainScript.slice(0, mainScript.lastIndexOf('/assets/') + 1)
assert.deepEqual(manifest.center, [0, -600, 0])
assert.equal(manifest.radius, 600)
assert.ok(!html.includes('FlightReplay'), 'Replay must not be preloaded by the document')
for (const row of results.ranking) assert.ok(manifest.entries[row.submissionId.split('_')[0]], row.submissionId)
const hash = data => createHash('sha256').update(data).digest('hex')
let total = 0
for (const [id, item] of Object.entries(manifest.entries)) {
  assert.match(item.file, /^trajectories\/s01\/\d+-[a-f0-9]{12}\.bin$/)
  const bytes = read('public/' + item.file)
  assert.equal(bytes.length, item.samples * 16, id)
  assert.equal(hash(bytes), item.sha256, id)
  assert.equal(hash(read('dist/' + item.file)), item.sha256, `Build asset: ${id}`)
  let previous = -Infinity
  for (let i = 0; i < item.samples; i++) {
    const time = bytes.readFloatLE(i * 16)
    assert.ok(time > previous, `Monotonic time: ${id}`)
    previous = time
    for (let k = 1; k < 4; k++) assert.ok(Number.isFinite(bytes.readFloatLE(i * 16 + k * 4)), id)
  }
  if (process.argv[2]) {
    const response = await fetch(new URL(base + item.file, process.argv[2]))
    assert.equal(response.status, 200, item.file)
    assert.equal(hash(Buffer.from(await response.arrayBuffer())), item.sha256, `HTTP asset: ${id}`)
  }
  total += bytes.length
}
console.log(`Verified ${Object.keys(manifest.entries).length} trajectories (${total.toLocaleString()} bytes), all ${results.ranking.length} ranked entries, center/radius, and build paths under ${base}`)
