import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Landmark, GraduationCap, Briefcase, ShieldCheck } from 'lucide-react'
import FilterBar from '../../components/FilterBar'
import Card from '../../components/ui/Card'
import { institutions } from '../../data/institutions'
import { DISCIPLINES } from '../../data/skillTaxonomy'

export default function Institutions() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [discipline, setDiscipline] = useState('all')

  const filtered = useMemo(() => {
    return institutions.filter((i) => {
      if (discipline !== 'all' && i.discipline !== discipline) return false
      if (search && !i.name.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [search, discipline])

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <span className="badge bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100">Academic Institutions</span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">Partner Institutions</h1>
        <p className="mt-4 text-base leading-relaxed text-navy-500">
          {institutions.length} verified engineering institutions across Computer Science, IT, Electronics,
          Electrical and Mechanical Engineering are already building skill profiles and internship pipelines on SkillBridge.
        </p>
      </div>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search institutions..."
        filters={[{ label: 'All Disciplines', value: discipline, options: DISCIPLINES, onChange: setDiscipline }]}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((inst) => (
          <Card key={inst.id} className="cursor-pointer transition-shadow hover:shadow-card-lg" onClick={() => navigate('/login')}>
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy-50">
                <Landmark size={18} className="text-navy-500" />
              </div>
              {inst.verified && (
                <span className="badge bg-success-50 text-success-700 ring-1 ring-inset ring-success-100">
                  <ShieldCheck size={12} /> Verified
                </span>
              )}
            </div>
            <p className="mt-3.5 text-sm font-semibold text-navy-800">{inst.name}</p>
            <p className="mt-0.5 text-xs text-navy-400">{inst.location}, {inst.state} · {inst.type}</p>
            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-navy-100 pt-4 text-center">
              <div>
                <p className="flex items-center justify-center gap-1 text-[11px] text-navy-400"><GraduationCap size={12} />Students</p>
                <p className="mt-1 text-sm font-bold text-navy-800">{inst.students}</p>
              </div>
              <div>
                <p className="flex items-center justify-center gap-1 text-[11px] text-navy-400"><Briefcase size={12} />Partners</p>
                <p className="mt-1 text-sm font-bold text-navy-800">{inst.industryPartners}</p>
              </div>
              <div>
                <p className="text-[11px] text-navy-400">Placements</p>
                <p className="mt-1 text-sm font-bold text-navy-800">{inst.placements}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
