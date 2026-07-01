/** Pure-CSS retro space backdrop: pixel grid + starfield. */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="bg-pixel-grid absolute inset-0 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.85),transparent_92%)]" />
      <div className="bg-starfield absolute inset-0 opacity-50" />
    </div>
  )
}
