import { useNavigate } from 'react-router-dom'
import { Boxes, Gauge } from 'lucide-react'
import Card from '../ui/Card'
import { Pill } from '../ui/Badge'
import { statusStyle } from '../../utils/badgeStyles'
import clsx from 'clsx'

export default function TechnologyCard({ technology }) {
  const navigate = useNavigate()

  return (
    <Card className="flex h-full flex-col cursor-pointer transition-shadow hover:shadow-card-lg" onClick={() => navigate(`/technology-marketplace/${technology.id}`)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50">
          <Boxes size={18} className="text-brand-600" />
        </div>
        <span className={clsx('badge', statusStyle(technology.licensingStatus))}>{technology.licensingStatus}</span>
      </div>

      <p className="mt-3.5 text-sm font-semibold text-navy-800">{technology.title}</p>
      <p className="mt-0.5 text-xs text-navy-400">{technology.institution}</p>
      <p className="mt-3 line-clamp-2 flex-1 text-xs leading-relaxed text-navy-500">{technology.description}</p>

      <div className="mt-3.5 flex flex-wrap items-center gap-2">
        <Pill>{technology.category}</Pill>
        <span className={clsx('badge', statusStyle(technology.patentStatus))}>{technology.patentStatus}</span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-navy-100 pt-3.5 text-xs text-navy-500">
        <span className="flex items-center gap-1"><Gauge size={13} />TRL {technology.trl}</span>
        <button
          onClick={(e) => { e.stopPropagation(); navigate(`/technology-marketplace/${technology.id}`) }}
          className="text-xs font-semibold text-brand-600 hover:text-brand-700"
        >
          Explore Technology →
        </button>
      </div>
    </Card>
  )
}
