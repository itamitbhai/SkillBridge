import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Bell, Menu, Sparkles, Plus, ShieldCheck, BarChart3 } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { notifications } from '../data/notifications'
import { students } from '../data/students'
import { internships } from '../data/internships'
import { technologies } from '../data/technologies'

const QUICK_ACTION = {
  student: { label: 'Analyze Skills', icon: Sparkles, to: '/skill-mapping' },
  institution: { label: 'View Analytics', icon: BarChart3, to: '/institution/skill-analytics' },
  industry: { label: 'Post Opportunity', icon: Plus, to: '/opportunities' },
  admin: { label: 'Verification Queue', icon: ShieldCheck, to: '/admin/verification' },
}

export default function Topbar({ onOpenMobileSidebar }) {
  const { user, role } = useAuth()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length
  const action = QUICK_ACTION[role] || QUICK_ACTION.student

  const q = query.trim().toLowerCase()
  const results = q
    ? [
        ...students.filter((s) => s.name.toLowerCase().includes(q)).slice(0, 3).map((s) => ({ type: 'Student', label: s.name, to: `/institution/students` })),
        ...internships.filter((i) => i.title.toLowerCase().includes(q) || i.company.toLowerCase().includes(q)).slice(0, 3).map((i) => ({ type: 'Internship', label: i.title, to: `/marketplace/internships/${i.id}` })),
        ...technologies.filter((t) => t.title.toLowerCase().includes(q)).slice(0, 3).map((t) => ({ type: 'Technology', label: t.title, to: `/technology-marketplace/${t.id}` })),
      ].slice(0, 6)
    : []

  return (
    <header className="sticky top-0 z-40 border-b border-navy-100 bg-white/90 backdrop-blur-md">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
        <button onClick={onOpenMobileSidebar} className="text-navy-500 lg:hidden">
          <Menu size={22} />
        </button>

        <div className="relative w-full max-w-sm">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-300" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 150)}
            placeholder="Search students, internships, technologies..."
            className="input py-2 pl-9 text-sm"
          />
          {showResults && results.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-lg border border-navy-100 bg-white shadow-popover">
              {results.map((r, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(r.to)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-xs hover:bg-navy-50"
                >
                  <span className="truncate font-medium text-navy-700">{r.label}</span>
                  <span className="shrink-0 text-navy-400">{r.type}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2.5">
          <button
            onClick={() => navigate('/notifications')}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg text-navy-500 hover:bg-navy-50"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-critical-500 text-[9px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate('/profile')}
            className="hidden items-center gap-2.5 border-l border-navy-100 pl-3 sm:flex"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-100 text-xs font-bold text-navy-600">
              {user?.avatarInitials || 'U'}
            </div>
            <div className="text-left leading-tight">
              <p className="text-xs font-semibold text-navy-800">{user?.name}</p>
              <p className="text-[11px] text-navy-400">{user?.roleLabel}</p>
            </div>
          </button>

          <button onClick={() => navigate(action.to)} className="btn-primary hidden sm:inline-flex">
            <action.icon size={15} />
            {action.label}
          </button>
        </div>
      </div>
    </header>
  )
}
