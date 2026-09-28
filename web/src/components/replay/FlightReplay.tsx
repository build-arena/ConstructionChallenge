import { useEffect, useRef, useState } from "react"
import { Pause, Play, RotateCcw, Minus, Plus } from "lucide-react"
import { useI18n } from "@/i18n/I18nContext"
import trajectories from "@/data/s01-trajectories.json"
import { createFlightScene } from "./flight-scene"

type Entry = { file: string; samples: number; start: number; end: number; sha256: string }
const entries: Record<string, Entry> = trajectories.entries
const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson-bright"
const button = `inline-flex min-h-10 min-w-10 items-center justify-center gap-2 border border-border px-3 text-xs uppercase text-cyan hover:border-cyan hover:text-paper disabled:opacity-40 ${focus}`
const clock = (time: number) => `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, "0")}`

export default function FlightReplay({ submissionId, title }: { submissionId: string; title: string }) {
  const { t } = useI18n()
  const c = t.season1Results.replay
  const entry = entries[submissionId.split("_")[0]]
  const host = useRef<HTMLDivElement>(null)
  const scene = useRef<ReturnType<typeof createFlightScene> | null>(null)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")
  const [attempt, setAttempt] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(entry?.start ?? 0)
  const [rate, setRate] = useState(12)

  useEffect(() => {
    const abort = new AbortController()
    const element = host.current
    if (!entry || !element) return
    let instance: ReturnType<typeof createFlightScene> | null = null
    const lost = (event: Event) => { event.preventDefault(); scene.current?.play(false); setPlaying(false); setStatus("error") }
    element.addEventListener("webglcontextlost", lost, true)
    async function load() {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}${entry.file}`, { signal: abort.signal })
        if (!response.ok) throw new Error("Trajectory unavailable")
        const buffer = await response.arrayBuffer()
        if (buffer.byteLength !== entry.samples * 16) throw new Error("Invalid sample count")
        const view = new DataView(buffer), samples = new Float32Array(entry.samples * 4)
        for (let i = 0; i < samples.length; i++) {
          samples[i] = view.getFloat32(i * 4, true)
          if (!Number.isFinite(samples[i])) throw new Error("Invalid sample")
        }
        for (let i = 1; i < entry.samples; i++) if (samples[i * 4] <= samples[(i - 1) * 4]) throw new Error("Invalid timestamp")
        if (abort.signal.aborted || !element) return
        instance = createFlightScene(element, samples, trajectories.center, trajectories.radius, setTime, () => setPlaying(false))
        scene.current = instance
        setStatus("ready")
      } catch {
        if (!abort.signal.aborted) setStatus("error")
      }
    }
    void load()
    return () => {
      abort.abort()
      element.removeEventListener("webglcontextlost", lost, true)
      instance?.dispose()
      scene.current = null
    }
  }, [entry, attempt])

  const ready = status === "ready"
  return (
    <div className="border-l-2 border-cyan/50 bg-space-900 text-paper" data-flight-replay={submissionId}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
        <div><p className="text-[10px] uppercase tracking-[0.18em] text-ba-orange">{c.title}</p><p className="mt-1 text-sm font-bold">{title}</p></div>
        <p className="text-xs tabular-nums text-cyan"><span className="mr-2 inline-block size-2 bg-ba-orange" />{clock(time)} / {clock(entry?.end ?? 0)}</p>
      </div>
      <div className="relative">
        <div ref={host} role="group" aria-label={`${c.scene}: ${title}`} aria-describedby={`replay-help-${submissionId.split("_")[0]}`} tabIndex={ready ? 0 : -1}
          className={`h-[300px] w-full cursor-grab bg-[radial-gradient(ellipse_at_center,#102c39_0%,#07111f_70%)] active:cursor-grabbing sm:h-[380px] [&_canvas]:block [&_canvas]:touch-none ${focus}`}
          onKeyDown={e => {
            const rotations: Record<string, [number, number]> = { ArrowLeft: [-0.12, 0], ArrowRight: [0.12, 0], ArrowUp: [0, -0.12], ArrowDown: [0, 0.12] }
            if (rotations[e.key]) { e.preventDefault(); scene.current?.rotate(...rotations[e.key]) }
            if (e.key === "+" || e.key === "=") { e.preventDefault(); scene.current?.zoom(0.8) }
            if (e.key === "-") { e.preventDefault(); scene.current?.zoom(1.25) }
          }} />
        {!ready && <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center text-sm text-mist" role="status">
          <p>{!entry ? c.unavailable : status === "error" ? c.error : c.loading}</p>
          {status === "error" && <button className={button} onClick={() => { setStatus("loading"); setPlaying(false); setRate(12); setTime(entry.start); setAttempt(a => a + 1) }}>{c.retry}</button>}
        </div>}
        <div className="pointer-events-none absolute bottom-3 left-4 flex gap-4 text-[10px] uppercase tracking-wide text-mist"><span><span className="mr-2 inline-block h-px w-5 bg-cyan" />{c.path}</span><span><span className="mr-2 inline-block size-1.5 bg-ba-orange" />{c.position}</span></div>
      </div>
      <div className="space-y-3 border-t border-border p-4">
        <input aria-label={c.timeline} type="range" min={entry?.start ?? 0} max={entry?.end ?? 1} step="0.1" value={time} disabled={!ready}
          onChange={e => scene.current?.seek(Number(e.target.value))} className={`block h-6 w-full cursor-pointer accent-cyan ${focus}`} />
        <div className="flex flex-wrap items-center gap-2">
          <button className={`${button} min-w-24 border-cyan/50`} disabled={!ready} onClick={() => { scene.current?.play(!playing); setPlaying(!playing) }}>{playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}{playing ? c.pause : c.play}</button>
          <label className="flex min-h-10 items-center gap-2 pl-2 text-xs text-mist">{c.speed}<select aria-label={c.speed} value={rate} disabled={!ready} onChange={e => { setRate(Number(e.target.value)); scene.current?.rate(Number(e.target.value)) }} className={`min-h-10 border border-border bg-space-900 px-2 text-cyan ${focus}`}>{[1, 4, 12, 30].map(n => <option key={n} value={n}>{n}×</option>)}</select></label>
          <div className="ml-auto flex gap-2">
            <button aria-label={c.zoomIn} title={c.zoomIn} className={button} disabled={!ready} onClick={() => scene.current?.zoom(0.8)}><Plus className="size-4" /></button>
            <button aria-label={c.zoomOut} title={c.zoomOut} className={button} disabled={!ready} onClick={() => scene.current?.zoom(1.25)}><Minus className="size-4" /></button>
            <button className={button} disabled={!ready} onClick={() => scene.current?.resetView()}><RotateCcw className="size-3.5" /><span className="hidden sm:inline">{c.reset}</span><span className="sr-only sm:hidden">{c.reset}</span></button>
          </div>
        </div>
        <p id={`replay-help-${submissionId.split("_")[0]}`} className="text-[11px] leading-relaxed text-mist">{c.help}</p>
        {entry?.end > 900 && <p className="text-[11px] text-mist">{c.fullRecording}</p>}
      </div>
    </div>
  )
}
