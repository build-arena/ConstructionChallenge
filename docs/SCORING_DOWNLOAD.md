# S01 scoring download

The public ZIP contains only the scoring runtime, fixed configurations, empty input/review
templates and a short README. No tests, examples, participant materials or saved results.
Internal scoring development code, tests and packaging tools are kept outside this website repository.

## Validate public assets

From `web/`:

```sh
npm run build
npm run lint
node scripts/check-s01-download.mjs http://127.0.0.1:4173
```

Commit the generated ZIP, guide and SHA-256 sidecar in `web/public/downloads/s01/`
with `web/src/data/s01-scoring-download.json`. Remove superseded generated ZIPs and
sidecars. Runtime config hashes remain unchanged. Generate replacement assets in the private scoring workspace. CI needs only this website repository and Node/npm.

Links use `import.meta.env.BASE_URL` for the `/ConstructionChallenge/` Pages prefix.
The build verifies the ZIP size, hash, guide and checksum; the optional origin argument
also checks actual HTTP downloads. Files are fetched only when requested.
