# S01 trajectory replay

The leaderboard loads a Three.js replay only when a row is expanded. One panel is mounted at a time; closing it aborts pending requests and disposes the renderer, geometries, materials and controls. Rendering runs on interaction or playback and stops outside the viewport or in a hidden tab. Playback is user-initiated (no autoplay or camera spin).

The globe has world center `[0,-600,0]` and radius `600`. The scene subtracts that center from the recorded world positions solely for rendering. There are no scoring planes or fitted/flattened trajectories. The faint path shows the whole recording; the brighter trail and orange marker show playback progress. Long records explicitly note the scoring time cap. This display does not change scoring, eligibility or rankings.

## Assets and GitHub Pages

- Commit `src/data/s01-trajectories.json`, **all referenced files** under `public/trajectories/s01/`, the replay components, the dependency lockfile and the leaderboard/content changes together.
- Assets contain only timestamp and x/y/z, in little-endian Float32 records (16 bytes/sample). No local paths, histories or participant scripts are shipped. All samples are retained, with Float32 precision for visual display only.
- Content-hashed ASCII filenames prevent stale-cache collisions and filename encoding problems. SHA-256 of the source CSV and exported data are recorded in the manifest.
- URLs use `import.meta.env.BASE_URL`, matching the current `/ConstructionChallenge/` GitHub Pages base. Three.js and OrbitControls are bundled locally in a dynamic chunk, with no CDN imports.
- Normal `npm ci` / `npm run build` needs **only this website repository**, not the scorer, Python, local servers or the original submissions. Vite copies the committed assets into `dist/trajectories/s01/`.
- All 40 ranked entries have trajectories. One Human Boss entry also has a replay; the other lacks a usable recording and displays an unavailable message.

After building, validate the committed data and deployment paths:

```sh
node scripts/check-s01-trajectories.mjs
# With npm run preview running, also verify every HTTP asset:
node scripts/check-s01-trajectories.mjs http://127.0.0.1:4173
```

Trajectory export is performed outside this website repository in the private scoring
workspace. Only the public trajectory assets and their manifest belong here. Refresh
them only when selected submissions or source trajectories change; publish the manifest
and all referenced assets together. Normal website builds require no export tool.
