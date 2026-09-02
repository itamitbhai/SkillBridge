import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import clsx from 'clsx'
import Button from '../../components/ui/Button'
import Logo from '../../components/Logo'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import { DISCIPLINES, INSTITUTION_TYPES, INDUSTRY_CATEGORIES } from '../../data/skillTaxonomy'

const TABS = [
  { id: 'student', label: 'Student' },
  { id: 'institution', label: 'Institution' },
  { id: 'industry', label: 'Industry' },
]

export default function Register() {
  const [tab, setTab] = useState('student')
  const [submitting, setSubmitting] = useState(false)
  const { loginAsDemo } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      loginAsDemo(tab)
      toast({ type: 'success', title: 'Account created', description: 'Your SkillBridge account is ready.' })
      navigate('/dashboard')
    }, 700)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-5 py-14 sm:px-8">
      <div className="w-full max-w-lg">
        <div className="mb-8 flex justify-center">
          <Link to="/"><Logo /></Link>
        </div>

        <div className="card p-7">
          <h2 className="text-xl font-bold text-navy-900">Create your account</h2>
          <p className="mt-1 text-sm text-navy-400">Choose your role to get started on SkillBridge.</p>

          <div className="mt-5 grid grid-cols-3 gap-1.5 rounded-lg bg-navy-50 p-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={clsx(
                  'rounded-md py-1.5 text-xs font-semibold transition-colors',
                  tab === t.id ? 'bg-white text-brand-700 shadow-xs' : 'text-navy-400 hover:text-navy-600'
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {tab === 'student' && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full Name" placeholder="Your full name" full />
                <Field label="Email" type="email" placeholder="you@email.com" />
                <Field label="Mobile" placeholder="+91 98765 43210" />
                <Field label="Institution" placeholder="Your institution" />
                <Field label="Course" placeholder="e.g. B.Tech" />
                <Field label="Year" placeholder="e.g. Final Year" />
                <Select label="Discipline" options={DISCIPLINES} />
                <Field label="Password" type="password" placeholder="Create a password" />
              </div>
            )}

            {tab === 'institution' && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Institution Name" placeholder="Institution name" full />
                <Select label="Type" options={INSTITUTION_TYPES} />
                <Field label="Location" placeholder="City, State" />
                <Field label="Accreditation" placeholder="e.g. NAAC A+" />
                <Field label="Contact Person" placeholder="Full name" />
                <Field label="Email" type="email" placeholder="contact@institution.edu" />
              </div>
            )}

            {tab === 'industry' && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Company Name" placeholder="Company name" full />
                <Select label="Industry Type" options={INDUSTRY_CATEGORIES} />
                <Field label="Location" placeholder="City, State" />
                <Field label="Contact Person" placeholder="Full name" />
                <Field label="Email" type="email" placeholder="contact@company.com" full />
              </div>
            )}

            <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
              {submitting ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-navy-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-brand-600 hover:text-brand-700">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

function Field({ label, type = 'text', placeholder, full }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="mb-1.5 block text-xs font-semibold text-navy-600">{label}</label>
      <input type={type} placeholder={placeholder} className="input" />
    </div>
  )
}

function Select({ label, options, full }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="mb-1.5 block text-xs font-semibold text-navy-600">{label}</label>
      <select className="input">
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  )
}
