import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import clsx from 'clsx'
import {
  LayoutDashboard, UserCircle, Sparkles, Briefcase, ClipboardList, Building2,
  FlaskConical, Users2, Award, GraduationCap, BarChart3, Bell, Settings,
  LogOut, Layers, X, FolderKanban, ShieldCheck, UsersRound, FileText,
  Boxes, Gavel, Target, Radar, BookOpen, Handshake,
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import DemoRoleSwitch from './DemoRoleSwitch'
import { demoStudentApplications } from '../data/applications'
import { notifications } from '../data/notifications'

const STUDENT_SECTIONS = [
  { label: 'Workspace', items: [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/skill-assessment', label: 'Skill Assessment', icon: Target },
    { to: '/skill-gap-analysis', label: 'Skill Gap Analysis', icon: Radar },
    { to: '/marketplace/internships', label: 'Internships', icon: Briefcase },
  ] },
  {
    label: 'Grow',
    items: [
      { to: '/learning-recommendations', label: 'Learning Recommendations', icon: BookOpen },
      { to: '/ai-career-match', label: 'AI Career Match', icon: Sparkles },
      { to: '/mentorship-projects', label: 'Mentorship & Projects', icon: Handshake },
    ],
  },
  {
    label: 'Career',
    items: [
      { to: '/placement', label: 'Jobs & Placements', icon: Award },
      { to: '/applications', label: 'Applications', icon: ClipboardList, badgeKey: 'applications' },
      { to: '/digital-portfolio', label: 'Digital Portfolio', icon: FileText },
    ],
  },
  {
    label: 'Account',
    items: [
      { to: '/profile', label: 'My Profile', icon: UserCircle },
      { to: '/notifications', label: 'Notifications', icon: Bell, badgeKey: 'notifications' },
      { to: '/settings', label: 'Settings', icon: Settings },
    ],
  },
]

const INSTITUTION_SECTIONS = [
  { label: 'Overview', items: [{ to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true }] },
  {
    label: 'Institution',
    items: [
      { to: '/institution/students', label: 'Students', icon: GraduationCap },
      { to: '/institution/skill-analytics', label: 'Skill Gap Analytics', icon: BarChart3 },
    ],
  },
  {
    label: 'Research & Innovation',
    items: [
      { to: '/rnd', label: 'R&D Problem Statements', icon: FlaskConical },
      { to: '/collaboration', label: 'Research Collaboration', icon: FolderKanban },
      { to: '/technology-marketplace', label: 'Patent & Technology Marketplace', icon: Boxes },
    ],
  },
  {
    label: 'Insights',
    items: [
      { to: '/analytics', label: 'Analytics', icon: BarChart3 },
      { to: '/notifications', label: 'Notifications', icon: Bell },
    ],
  },
]

const INDUSTRY_SECTIONS = [
  { label: 'Overview', items: [{ to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true }] },
  {
    label: 'Talent',
    items: [
      { to: '/opportunities', label: 'Industry Opportunities', icon: Briefcase },
      { to: '/marketplace/internships', label: 'Internship Marketplace', icon: Users2 },
    ],
  },
  {
    label: 'Research & Innovation',
    items: [
      { to: '/rnd', label: 'R&D Problem Statements', icon: FlaskConical },
      { to: '/collaboration', label: 'Research Collaboration', icon: FolderKanban },
      { to: '/technology-marketplace', label: 'Technology Marketplace', icon: Boxes },
      { to: '/licensing', label: 'Licensing Requests', icon: Gavel },
    ],
  },
  {
    label: 'Insights',
    items: [
      { to: '/analytics', label: 'Analytics', icon: BarChart3 },
      { to: '/notifications', label: 'Notifications', icon: Bell },
    ],
  },
]

const ADMIN_SECTIONS = [
  { label: 'Overview', items: [{ to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true }] },
  {
    label: 'Directory',
    items: [
      { to: '/admin/users', label: 'Users', icon: UsersRound },
      { to: '/admin/students', label: 'Students', icon: GraduationCap },
      { to: '/admin/institutions', label: 'Institutions', icon: Building2 },
      { to: '/admin/industries', label: 'Industries', icon: Briefcase },
    ],
  },
  {
    label: 'Ecosystem',
    items: [
      { to: '/admin/internships', label: 'Internships', icon: FileText },
      { to: '/admin/rnd', label: 'R&D Challenges', icon: FlaskConical },
      { to: '/admin/technologies', label: 'Technologies', icon: Boxes },
      { to: '/admin/licensing', label: 'Licensing', icon: Gavel },
      { to: '/admin/placements', label: 'Placements', icon: Award },
    ],
  },
  {
    label: 'Governance',
    items: [
      { to: '/analytics', label: 'Analytics', icon: BarChart3 },
      { to: '/admin/verification', label: 'Verification', icon: ShieldCheck },
      { to: '/notifications', label: 'Notifications', icon: Bell },
    ],
  },
]

const SECTIONS_BY_ROLE = {
  student: STUDENT_SECTIONS,
  institution: INSTITUTION_SECTIONS,
  industry: INDUSTRY_SECTIONS,
  admin: ADMIN_SECTIONS,
}

function NavItem({ item, onNavigate }) {
  const location = useLocation()
  const Icon = item.icon
  const active = item.end ? location.pathname === item.to : location.pathname.startsWith(item.to)

  return (
    <NavLink
      to={item.to}
      onClick={onNavigate}
      className={clsx(
        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
        active ? 'bg-brand-500 text-white shadow-xs' : 'text-navy-300 hover:bg-white/5 hover:text-white'
      )}
    >
      <Icon size={17} />
      <span className="truncate flex-1">{item.label}</span>
      {item.badge > 0 && (
        <span className={clsx(
          'flex h-4.5 min-w-[1.125rem] items-center justify-center rounded-full px-1 text-[10px] font-bold',
          active ? 'bg-white/25 text-white' : 'bg-white/10 text-navy-200'
        )}>
          {item.badge}
        </span>
      )}
    </NavLink>
  )
}

const ROLE_WORKSPACE_LABEL = {
  student: 'Student Workspace',
  institution: 'Institution Workspace',
  industry: 'Industry Workspace',
  admin: 'Admin Workspace',
}

export default function Sidebar({ mobileOpen, onCloseMobile }) {
  const { user, role, logout } = useAuth()
  const navigate = useNavigate()
  const rawSections = SECTIONS_BY_ROLE[role] || STUDENT_SECTIONS

  const badgeValues = {
    applications: demoStudentApplications.filter((a) => !['Selected', 'Rejected'].includes(a.status)).length,
    notifications: notifications.filter((n) => !n.read).length,
  }
  const sections = rawSections.map((section) => ({
    ...section,
    items: section.items.map((item) => (item.badgeKey ? { ...item, badge: badgeValues[item.badgeKey] } : item)),
  }))
  const hasSettingsInNav = sections.some((s) => s.items.some((i) => i.to === '/settings'))

  const content = (
    <div className="flex h-full flex-col bg-navy-900">
      <div className="flex items-center justify-between px-5 py-5">
        <Link to="/" onClick={onCloseMobile} className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-500">
            <Layers size={17} className="text-white" strokeWidth={2.2} />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold text-white">SkillBridge</p>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-navy-400">{ROLE_WORKSPACE_LABEL[role]}</p>
          </div>
        </Link>
        <button onClick={onCloseMobile} className="text-navy-400 hover:text-white lg:hidden">
          <X size={20} />
        </button>
      </div>

      <nav className="no-scrollbar flex-1 space-y-5 overflow-y-auto px-3.5 pb-6">
        {sections.map((section) => (
          <div key={section.label}>
            <p className="mb-1.5 px-3 text-[10.5px] font-semibold uppercase tracking-wider text-navy-500">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavItem key={item.label} item={item} onNavigate={onCloseMobile} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 px-4 py-4">
        <DemoRoleSwitch onNavigate={onCloseMobile} />
      </div>

      <div className="border-t border-white/10 px-4 py-4">
        <button
          onClick={() => navigate('/profile')}
          className="mb-3 flex w-full items-center gap-2.5 rounded-lg px-1 py-1 text-left hover:bg-white/5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
            {user?.avatarInitials || 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{user?.name}</p>
            <p className="truncate text-xs text-navy-400">{user?.roleLabel}</p>
          </div>
        </button>
        <div className="space-y-0.5">
          {!hasSettingsInNav && <NavItem item={{ to: '/settings', label: 'Settings', icon: Settings }} onNavigate={onCloseMobile} />}
          <button
            onClick={() => {
              logout()
              navigate('/')
            }}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-navy-300 hover:bg-white/5 hover:text-white"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <aside className="hidden w-64 shrink-0 lg:block">{content}</aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy-900/50" onClick={onCloseMobile} />
          <div className="absolute inset-y-0 left-0 w-64 shadow-popover">{content}</div>
        </div>
      )}
    </>
  )
}
