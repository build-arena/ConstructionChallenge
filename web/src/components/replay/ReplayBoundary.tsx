import { Component, type ReactNode } from "react"

// A failed lazy chunk should not take down the leaderboard; a page refresh can fetch the chunk again.
export class ReplayBoundary extends Component<{ children: ReactNode; message: string }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    return this.state.failed ? <p role="alert" className="border border-border p-6 text-sm text-mist">{this.props.message}</p> : this.props.children
  }
}
