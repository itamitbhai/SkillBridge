import { useNavigate } from 'react-router-dom'
import { IndianRupee, Clock, FlaskConical } from 'lucide-react'
import Card from '../ui/Card'
import { Pill } from '../ui/Badge'
import { statusStyle } from '../../utils/badgeStyles'
import clsx from 'clsx'

export default function ChallengeCard({ challenge }) {
  const navigate = useNavigate()

  return (
    <Card className="flex h-full flex-col cursor-pointer transition-shadow hover:shadow-card-lg" onClick={() => navigate(`/rnd/${challenge.id}`)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50">
          <FlaskConical size={18} className="text-brand-600" />
        </div>
        <span className={clsx('badge', statusStyle(challenge.status))}>{challenge.status}</span>
      </div>

      <p className="mt-3.5 text-sm font-semibold text-navy-800">{challenge.title}</p>
      <p className="mt-0.5 text-xs text-navy-400">{challenge.company} · {challenge.category}</p>
      <p className="mt-3 line-clamp-2 flex-1 text-xs leading-relaxed text-navy-500">{challenge.problem}</p>

      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {challenge.skills.slice(0, 3).map((s) => (
          <Pill key={s}>{s}</Pill>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-navy-100 pt-3.5 text-xs text-navy-500">
        <span className="flex items-center gap-1"><IndianRupee size={13} />{challenge.budget.toLocaleString('en-IN')}</span>
        <span className="flex items-center gap-1"><Clock size={13} />{challenge.expectedDuration}</span>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); navigate(`/rnd/${challenge.id}`) }}
        className="mt-3.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
      >
        View Challenge →
      </button>
    </Card>
  )
}
