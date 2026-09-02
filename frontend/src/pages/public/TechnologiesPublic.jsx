import { useNavigate } from 'react-router-dom'
import { Boxes, Gauge } from 'lucide-react'
import Card from '../../components/ui/Card'
import { Pill } from '../../components/ui/Badge'
import { statusStyle } from '../../utils/badgeStyles'
import { technologies } from '../../data/technologies'
import clsx from 'clsx'

export default function TechnologiesPublic() {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <span className="badge bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100">SkillBridge Innovation Exchange</span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">Patents & Technologies Ready to License</h1>
        <p className="mt-4 text-base leading-relaxed text-navy-500">
          {technologies.length} academic research outputs — from diagnostic AI to formulation science — available for
          industry licensing and commercialisation.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {technologies.slice(0, 9).map((t) => (
          <Card key={t.id} className="cursor-pointer transition-shadow hover:shadow-card-lg" onClick={() => navigate('/login')}>
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50">
                <Boxes size={18} className="text-brand-600" />
              </div>
              <span className={clsx('badge', statusStyle(t.licensingStatus))}>{t.licensingStatus}</span>
            </div>
            <p className="mt-3.5 text-sm font-semibold text-navy-800">{t.title}</p>
            <p className="mt-0.5 text-xs text-navy-400">{t.institution}</p>
            <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-navy-500">{t.description}</p>
            <div className="mt-3.5 flex flex-wrap items-center gap-2">
              <Pill>{t.category}</Pill>
              <span className="flex items-center gap-1 text-xs text-navy-400"><Gauge size={12} />TRL {t.trl}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
