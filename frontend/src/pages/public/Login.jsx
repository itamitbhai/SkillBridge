import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Sparkles, Users2, TrendingUp } from 'lucide-react'
import clsx from 'clsx'
import Button from '../../components/ui/Button'
import Logo from '../../components/Logo'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import { ROLES } from '../../data/users'

export default function Login() {
  const [email, setEmail] = useState('amit.kumar@skillbridge.demo')
  const [password, setPassword] = useState('••••••••')
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState('student')
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)
  const { login, loginAsDemo } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await login(email, password, role)
    setLoading(false)
    toast({ type: 'success', title: 'Signed in', description: 'Welcome back to SkillBridge.' })
    navigate('/dashboard')
  }

  const handleDemo = (demoRole) => {
    loginAsDemo(demoRole)
    toast({ type: 'info', title: 'Demo access granted', description: `Exploring SkillBridge as ${ROLES.find((r) => r.id === demoRole)?.label}.` })
    navigate('/dashboard')
  }

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-navy-900 p-12 lg:flex">
        <Logo dark />
        <div>
          <h1 className="max-w-md text-3xl font-bold leading-tight text-white">
            Connecting Engineering Talent, Academia & Industry.
          </h1>
          <p className="mt-4 max-w-sm text-sm text-navy-300">
            Sign in to review your AI skill profile, verified internships, industry matches and research collaborations.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              { icon: Sparkles, label: 'AI skill mapping' },
              { icon: Users2, label: 'Verified internships' },
              { icon: TrendingUp, label: 'Industry matching' },
            ].map((f) => (
              <div key={f.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <f.icon size={18} className="text-brand-400" />
                <p className="mt-2 text-xs font-medium text-navy-200">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-navy-500">© 2026 SkillBridge</p>
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl" />
      </div>

      <div className="flex items-center justify-center bg-surface px-5 py-14 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>

          <div className="card p-7">
            <h2 className="text-xl font-bold text-navy-900">Sign in to your account</h2>
            <p className="mt-1 text-sm text-navy-400">Access your SkillBridge dashboard.</p>

            <div className="mt-5 grid grid-cols-4 gap-1.5 rounded-lg bg-navy-50 p-1">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={clsx(
                    'rounded-md py-1.5 text-xs font-semibold transition-colors',
                    role === r.id ? 'bg-white text-brand-700 shadow-xs' : 'text-navy-400 hover:text-navy-600'
                  )}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-navy-600">Email</label>
                <div className="relative">
                  <Mail size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-300" />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input pl-10" placeholder="you@skillbridge.demo" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-navy-600">Password</label>
                <div className="relative">
                  <Lock size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-300" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input pl-10 pr-10"
                    placeholder="Enter your password"
                  />
                  <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy-300 hover:text-navy-500">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-navy-500">
                  <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-3.5 w-3.5 rounded border-navy-300 text-brand-500 focus:ring-brand-500" />
                  Remember me
                </label>
                <button type="button" className="font-medium text-brand-600 hover:text-brand-700">Forgot password?</button>
              </div>

              <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-navy-100" />
              <span className="text-xs font-medium text-navy-300">OR CONTINUE WITH DEMO</span>
              <div className="h-px flex-1 bg-navy-100" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {ROLES.map((r) => (
                <Button key={r.id} variant="secondary" size="sm" icon={ShieldCheck} onClick={() => handleDemo(r.id)}>
                  {r.label}
                </Button>
              ))}
            </div>
            <p className="mt-3 text-center text-[11px] text-navy-400">
              Demo access unlocks the full dashboard for the selected role — no credentials required.
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-navy-400">
            New to SkillBridge?{' '}
            <Link to="/register" className="font-medium text-brand-600 hover:text-brand-700">Create an account</Link>
            {' '}·{' '}
            <Link to="/" className="font-medium text-navy-500 hover:text-navy-700">Back to home</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
