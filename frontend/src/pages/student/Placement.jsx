import { useMemo, useState } from 'react'
import { MapPin, IndianRupee } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import FilterBar from '../../components/FilterBar'
import Card from '../../components/ui/Card'
import { Pill } from '../../components/ui/Badge'
import MatchBadge from '../../components/dashboard/MatchBadge'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import { jobs } from '../../data/jobs'
import { DISCIPLINES } from '../../data/skillTaxonomy'
import { demoStudent } from '../../data/students'
import { matchStudentToInternship } from '../../services/aiService'
import { useToast } from '../../hooks/useToast'

export default function Placement() {
  const [search, setSearch] = useState('')
  const [discipline, setDiscipline] = useState('all')
  const [selected, setSelected] = useState(null)
  const { toast } = useToast()

  const ranked = useMemo(
    () => jobs.map((j) => ({ job: j, match: matchStudentToInternship(demoStudent, j) })).sort((a, b) => b.match.score - a.match.score),
    []
  )

  const filtered = ranked.filter(({ job }) => {
    if (discipline !== 'all' && job.discipline !== discipline) return false
    if (search && !job.title.toLowerCase().includes(search.toLowerCase()) && !job.company.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleApply = (job) => {
    toast({ type: 'success', title: 'Application submitted', description: `Applied to ${job.title} at ${job.company}.` })
    setSelected(null)
  }

  return (
    <div>
      <PageHeader title="SkillBridge Placement Hub" subtitle="AI-matched full-time roles across product, IT services and cloud companies." />

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search jobs or companies..."
        filters={[{ label: 'All Disciplines', value: discipline, options: DISCIPLINES, onChange: setDiscipline }]}
        onClear={() => { setDiscipline('all'); setSearch('') }}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(({ job, match }) => (
          <Card key={job.id} className="flex h-full flex-col cursor-pointer transition-shadow hover:shadow-card-lg" onClick={() => setSelected({ job, match })}>
            <p className="text-sm font-semibold text-navy-800">{job.title}</p>
            <p className="mt-0.5 text-xs text-navy-400">{job.company}</p>
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-navy-500">
              <span className="flex items-center gap-1"><MapPin size={12} />{job.location}</span>
              <span className="flex items-center gap-1"><IndianRupee size={12} />{job.salaryMin}–{job.salaryMax} LPA</span>
            </div>
            <div className="mt-3.5 flex flex-1 flex-wrap gap-1.5">
              {job.skills.slice(0, 3).map((s) => <Pill key={s}>{s}</Pill>)}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-navy-100 pt-3.5">
              <MatchBadge score={match.score} />
              <span className="text-xs text-navy-400">{job.experience}</span>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.job.title} size="md" footer={
        selected && (
          <>
            <Button variant="secondary" onClick={() => setSelected(null)}>Close</Button>
            <Button onClick={() => handleApply(selected.job)}>Apply</Button>
          </>
        )
      }>
        {selected && (
          <div className="space-y-4">
            <p className="text-sm text-navy-500">{selected.job.company} · {selected.job.location}</p>
            <p className="text-sm text-navy-600">Eligibility: {selected.job.eligibility}</p>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-navy-400">Match Breakdown</p>
              <div className="space-y-2">
                {Object.entries(selected.match.breakdown).map(([key, value]) => (
                  <div key={key}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="capitalize text-navy-500">{key}</span>
                      <span className="font-semibold text-navy-700">{value}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-navy-50">
                      <div className="h-full rounded-full bg-brand-500" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between rounded-lg bg-surface/70 p-3">
                <span className="text-xs font-semibold text-navy-600">Overall</span>
                <span className="text-sm font-bold text-brand-600">{selected.match.score}%</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
