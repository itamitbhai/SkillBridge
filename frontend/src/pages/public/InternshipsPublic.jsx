import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Clock, IndianRupee, ShieldCheck } from 'lucide-react'
import FilterBar from '../../components/FilterBar'
import Card from '../../components/ui/Card'
import { Pill } from '../../components/ui/Badge'
import { VerifiedPill, VerificationChecklist } from '../../components/VerificationBadge'
import { internships } from '../../data/internships'
import { DISCIPLINES } from '../../data/skillTaxonomy'

export default function InternshipsPublic() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [discipline, setDiscipline] = useState('all')

  const filtered = useMemo(() => {
    return internships.filter((i) => {
      if (discipline !== 'all' && i.discipline !== discipline) return false
      if (search && !i.title.toLowerCase().includes(search.toLowerCase()) && !i.company.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [search, discipline])

  const verifiedInternships = internships.filter((i) => i.verified).slice(0, 3)

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <span className="badge bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100">Internship Marketplace</span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">Find Your Next Internship</h1>
        <p className="mt-4 text-base leading-relaxed text-navy-500">
          {internships.length}+ software engineering internships across frontend, backend, data and cloud roles.
          Sign in to see your AI match score and apply.
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-lg font-semibold text-navy-900">Verified Opportunities</h2>
        <p className="mt-1 text-sm text-navy-500">Every verified internship is confirmed end-to-end before it reaches a student.</p>
        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {verifiedInternships.map((i) => (
            <Card key={i.id}>
              <p className="text-sm font-semibold text-navy-800">{i.title}</p>
              <p className="mt-0.5 text-xs text-navy-400">{i.company} · {i.location}</p>
              <div className="mt-3.5">
                <VerificationChecklist verification={i.verification} />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search internships or companies..."
          filters={[{ label: 'All Disciplines', value: discipline, options: DISCIPLINES, onChange: setDiscipline }]}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((i) => (
            <Card key={i.id} className="cursor-pointer transition-shadow hover:shadow-card-lg" onClick={() => navigate('/login')}>
              <div className="flex items-start justify-between">
                <p className="text-sm font-semibold text-navy-800">{i.title}</p>
                <VerifiedPill verified={i.verified} />
              </div>
              <p className="mt-0.5 text-xs text-navy-400">{i.company}</p>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-navy-500">
                <span className="flex items-center gap-1"><MapPin size={12} />{i.location}</span>
                <span className="flex items-center gap-1"><Clock size={12} />{i.duration}</span>
                <span className="flex items-center gap-1"><IndianRupee size={12} />{i.stipend.toLocaleString('en-IN')}/mo</span>
              </div>
              <div className="mt-3.5 flex flex-wrap gap-1.5">
                {i.skills.slice(0, 3).map((s) => (
                  <Pill key={s}>{s}</Pill>
                ))}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); navigate('/login') }}
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700"
              >
                <ShieldCheck size={13} /> Sign in to see your AI match & apply
              </button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
