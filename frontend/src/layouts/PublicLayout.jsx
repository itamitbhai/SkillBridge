import { Outlet } from 'react-router-dom'
import PublicNavbar from '../components/PublicNavbar'

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />
      <Outlet />
      <footer className="border-t border-navy-100 bg-surface">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
            <p className="text-xs font-semibold text-navy-700">SkillBridge — Bridging Academia, Skills & Industry</p>
            <p className="text-xs text-navy-400">Prototype for SIH Problem Statement 26044. Companies and colleges shown are demo data only — no real partnerships implied.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
