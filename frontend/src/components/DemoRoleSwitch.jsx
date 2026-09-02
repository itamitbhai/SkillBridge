import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { useAuth } from '../hooks/useAuth'
import { ROLES } from '../data/users'

export default function DemoRoleSwitch({ onNavigate }) {
  const { role, loginAsDemo } = useAuth()
  const navigate = useNavigate()

  const handleSwitch = (r) => {
    loginAsDemo(r)
    navigate('/dashboard')
    onNavigate?.()
  }

  return (
    <div>
      <p className="mb-1.5 px-1 text-[10px] font-semibold uppercase tracking-wider text-navy-500">Demo Role Switch</p>
      <div className="grid grid-cols-2 gap-1.5">
        {ROLES.map((r) => (
          <button
            key={r.id}
            onClick={() => handleSwitch(r.id)}
            className={clsx(
              'rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors',
              role === r.id ? 'bg-brand-500 text-white' : 'bg-white/5 text-navy-300 hover:bg-white/10 hover:text-white'
            )}
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  )
}
