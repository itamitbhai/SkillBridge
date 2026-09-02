import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, ArrowRight } from 'lucide-react'
import Logo from './Logo'
import Button from './ui/Button'
import { useAuth } from '../hooks/useAuth'

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Opportunities', to: '/internships' },
  { label: 'Skill Assessment', to: '/skill-assessment', demo: true },
  { label: 'Industries', to: '/industry' },
  { label: 'About', to: '/about' },
]

export default function PublicNavbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated, loginAsDemo } = useAuth()

  const handleNavClick = (link) => (e) => {
    if (link.demo && !isAuthenticated) {
      e.preventDefault()
      loginAsDemo('student')
      navigate(link.to)
    }
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link to="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {LINKS.map((l) => (
            <Link key={l.label} to={l.to} onClick={handleNavClick(l)} className="text-sm font-medium text-navy-500 transition-colors hover:text-navy-900">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <Button variant="secondary" size="sm" onClick={() => navigate('/dashboard')}>
              Go to Dashboard
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button variant="primary" size="sm" iconRight={ArrowRight} onClick={() => navigate('/register')}>
                Get Started
              </Button>
            </>
          )}
        </div>

        <button className="text-navy-600 lg:hidden" onClick={() => setOpen((v) => !v)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-navy-100 bg-white px-5 py-4 lg:hidden">
          <nav className="flex flex-col gap-3.5">
            {LINKS.map((l) => (
              <Link key={l.label} to={l.to} onClick={handleNavClick(l)} className="text-sm font-medium text-navy-600">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2.5">
            <Button variant="secondary" size="sm" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button variant="primary" size="sm" iconRight={ArrowRight} onClick={() => navigate('/register')}>
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
