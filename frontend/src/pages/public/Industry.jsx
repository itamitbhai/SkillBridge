import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Briefcase, MapPin, ShieldCheck } from 'lucide-react'
import FilterBar from '../../components/FilterBar'
import Card from '../../components/ui/Card'
import { Pill } from '../../components/ui/Badge'
import { industries } from '../../data/industries'
import { INDUSTRY_CATEGORIES } from '../../data/skillTaxonomy'

export default function Industry() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = useMemo(() => {
    return industries.filter((i) => {
      if (category !== 'all' && i.industryType !== category) return false
      if (search && !i.name.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [search, category])

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <span className="badge bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100">Industry Partners</span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">Where Engineering Talent Goes to Work</h1>
        <p className="mt-4 text-base leading-relaxed text-navy-500">
          {industries.length} verified product, IT services, cloud and analytics companies post internships,
          jobs and R&D challenges on SkillBridge.
        </p>
      </div>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search companies..."
        filters={[{ label: 'All Categories', value: category, options: INDUSTRY_CATEGORIES, onChange: setCategory }]}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((ind) => (
          <Card key={ind.id} className="cursor-pointer transition-shadow hover:shadow-card-lg" onClick={() => navigate('/login')}>
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50">
                <Briefcase size={18} className="text-navy-500" />
              </div>
              {ind.verified && (
                <span className="badge bg-success-50 text-success-700 ring-1 ring-inset ring-success-100">
                  <ShieldCheck size={12} /> Verified
                </span>
              )}
            </div>
            <p className="mt-3.5 text-sm font-semibold text-navy-800">{ind.name}</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-navy-400"><MapPin size={12} />{ind.location}, {ind.state}</p>
            <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-navy-500">{ind.description}</p>
            <div className="mt-3.5 flex flex-wrap gap-1.5">
              <Pill>{ind.industryType}</Pill>
              {ind.skillsRequired.slice(0, 2).map((s) => (
                <Pill key={s}>{s}</Pill>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
