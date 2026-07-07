import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { SEASON_START_UTC } from "@/config/season"

const TARGET_MS = new Date(SEASON_START_UTC).getTime()

export type CountdownState = {
  hasStarted: boolean
  days: number
  hours: number
  minutes: number
  seconds: number
}

function computeState(): CountdownState {
  const diffMs = TARGET_MS - Date.now()
  if (diffMs <= 0) {
    return { hasStarted: true, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const totalSeconds = Math.floor(diffMs / 1000)
  return {
    hasStarted: false,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

const CountdownContext = createContext<CountdownState | null>(null)

export function CountdownProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CountdownState>(computeState)

  useEffect(() => {
    if (state.hasStarted) return
    const id = window.setInterval(() => setState(computeState()), 1000)
    return () => window.clearInterval(id)
  }, [state.hasStarted])

  return (
    <CountdownContext.Provider value={state}>
      {children}
    </CountdownContext.Provider>
  )
}

export function useCountdown(): CountdownState {
  const ctx = useContext(CountdownContext)
  if (!ctx) throw new Error("useCountdown must be used within CountdownProvider")
  return ctx
}
