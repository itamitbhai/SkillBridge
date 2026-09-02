import { useNavigate } from 'react-router-dom'
import { FlaskConical, IndianRupee, Clock } from 'lucide-react'
import Card from '../../components/ui/Card'
import { Pill } from '../../components/ui/Badge'
import { rndChallenges } from '../../data/rndChallenges'

export default function Research() {
  const navigate = useNavigate()
  const openChallenges = rndChallenges.filter((c) => c.status === 'Open')

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <span className="badge bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100">Research & Innovation</span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">Industry R&D Challenges</h1>
        <p className="mt-4 text-base leading-relaxed text-navy-500">
          Real-world problem statements posted by industry, open for academic collaboration — from distributed
          systems and machine learning to cloud infrastructure and developer tooling.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {openChallenges.map((c) => (
          <Card key={c.id} className="cursor-pointer transition-shadow hover:shadow-card-lg" onClick={() => navigate('/login')}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50">
              <FlaskConical size={18} className="text-brand-600" />
            </div>
            <p className="mt-3.5 text-sm font-semibold text-navy-800">{c.title}</p>
            <p className="mt-0.5 text-xs text-navy-400">{c.company} · {c.category}</p>
            <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-navy-500">{c.problem}</p>
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              {c.skills.slice(0, 3).map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-navy-100 pt-3.5 text-xs text-navy-500">
              <span className="flex items-center gap-1"><IndianRupee size={13} />{c.budget.toLocaleString('en-IN')}</span>
              <span className="flex items-center gap-1"><Clock size={13} />{c.expectedDuration}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
