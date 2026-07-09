import { I18nProvider } from "@/i18n/I18nContext"
import { Background } from "@/components/layout/Background"
import { NavBar } from "@/components/layout/NavBar"
import { Hero } from "@/components/sections/Hero"
import { Season } from "@/components/sections/Season"
import { Tracks } from "@/components/sections/Tracks"
import { HowItWorks } from "@/components/sections/HowItWorks"
import { Scoring } from "@/components/sections/Scoring"
import { Submission } from "@/components/sections/Submission"
import { Leaderboard } from "@/components/sections/Leaderboard"
import { Awards } from "@/components/sections/Awards"
import { Faq } from "@/components/sections/Faq"
import { CtaFooter } from "@/components/sections/CtaFooter"

function App() {
  return (
    <I18nProvider>
      <div className="relative min-h-screen overflow-x-hidden font-mono text-paper">
        <Background />
        <NavBar />
        <main>
          <Hero />
          <Season />
          <Tracks />
          <HowItWorks />
          <Scoring />
          <Submission />
          <Awards />
          <Leaderboard />
          <Faq />
        </main>
        <CtaFooter />
      </div>
    </I18nProvider>
  )
}

export default App
