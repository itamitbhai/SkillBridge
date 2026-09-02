import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Filter, MapPin, SlidersHorizontal, SearchX } from 'lucide-react'
import clsx from 'clsx'
import PageHeader from '../../components/PageHeader'
import Card, { CardHeader } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Chip from '../../components/ui/Chip'
import Modal from '../../components/ui/Modal'
import EmptyState from '../../components/ui/EmptyState'
import { Pill } from '../../components/ui/Badge'
import CompanyLogo from '../../components/CompanyLogo'
import CircularMatchGauge from '../../components/dashboard/CircularMatchGauge'
import OpportunityCard from '../../components/internships/OpportunityCard'
import ApplyModal from '../../components/internships/ApplyModal'
import { internships } from '../../data/internships'
import { industryById } from '../../data/industries'
import { demoStudent } from '../../data/students'
import { matchStudentToInternship } from '../../services/aiService'
import { useToast } from '../../hooks/useToast'
import { formatDate } from '../../utils/format'

const WORK_MODES = ['On-site', 'Remote', 'Hybrid']

function useUnique(list) {
  return useMemo(() => [...new Set(list)], [list])
}

export default function InternshipMarketplace() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const [workMode, setWorkMode] = useState([])
  const [duration, setDuration] = useState([])
  const [skillFilter, setSkillFilter] = useState([])
  const [industryFilter, setIndustryFilter] = useState([])
  const [minStipend, setMinStipend] = useState(0)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sort, setSort] = useState('match')
  const [showFilters, setShowFilters] = useState(false)
  const [detail, setDetail] = useState(null)
  const [applyTarget, setApplyTarget] = useState(null)

  const durations = useUnique(internships.map((i) => i.duration)).sort()
  const topSkills = useMemo(() => {
    const counts = {}
    internships.forEach((i) => i.skills.forEach((s) => { counts[s] = (counts[s] || 0) + 1 }))
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([s]) => s)
  }, [])
  const industryCategories = useUnique(internships.map((i) => industryById[i.companyId]?.industryType).filter(Boolean))
  const maxStipend = useMemo(() => Math.ceil(Math.max(...internships.map((i) => i.stipend)) / 5000) * 5000, [])

  const ranked = useMemo(
    () => internships.map((i) => ({ internship: i, match: matchStudentToInternship(demoStudent, i) })),
    []
  )

  const toggle = (setter) => (v) => setter((arr) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]))

  const list = useMemo(() => {
    return ranked
      .filter(({ internship: i }) => (workMode.length ? workMode.includes(i.workMode) : true))
      .filter(({ internship: i }) => (duration.length ? duration.includes(i.duration) : true))
      .filter(({ internship: i }) => (skillFilter.length ? skillFilter.every((s) => i.skills.includes(s)) : true))
      .filter(({ internship: i }) => (industryFilter.length ? industryFilter.includes(industryById[i.companyId]?.industryType) : true))
      .filter(({ internship: i }) => i.stipend >= minStipend)
      .filter(({ internship: i }) => (verifiedOnly ? i.verified : true))
      .sort((a, b) => (sort === 'match' ? b.match.score - a.match.score : b.internship.stipend - a.internship.stipend))
  }, [ranked, workMode, duration, skillFilter, industryFilter, minStipend, verifiedOnly, sort])

  const clearAll = () => {
    setWorkMode([]); setDuration([]); setSkillFilter([]); setIndustryFilter([]); setMinStipend(0); setVerifiedOnly(false)
  }

  const handleApply = (internship) => {
    setDetail(null)
    setApplyTarget(internship)
  }

  const filterPanel = (
    <div className="space-y-5">
      <Group title="Work mode">
        <div className="flex flex-wrap gap-1.5">
          {WORK_MODES.map((m) => <Chip key={m} active={workMode.includes(m)} onClick={() => toggle(setWorkMode)(m)}>{m}</Chip>)}
        </div>
      </Group>
      <Group title="Duration">
        <div className="flex flex-wrap gap-1.5">
          {durations.map((d) => <Chip key={d} active={duration.includes(d)} onClick={() => toggle(setDuration)(d)}>{d}</Chip>)}
        </div>
      </Group>
      <Group title={`Minimum stipend · ₹${minStipend.toLocaleString('en-IN')}`}>
        <input
          type="range"
          min={0}
          max={maxStipend}
          step={1000}
          value={minStipend}
          onChange={(e) => setMinStipend(Number(e.target.value))}
          className="w-full accent-brand-500"
        />
      </Group>
      <Group title="Skills">
        <div className="flex flex-wrap gap-1.5">
          {topSkills.map((s) => <Chip key={s} active={skillFilter.includes(s)} onClick={() => toggle(setSkillFilter)(s)}>{s}</Chip>)}
        </div>
      </Group>
      <Group title="Industry">
        <div className="flex flex-wrap gap-1.5">
          {industryCategories.map((s) => <Chip key={s} active={industryFilter.includes(s)} onClick={() => toggle(setIndustryFilter)(s)}>{s}</Chip>)}
        </div>
      </Group>
      <label className="flex items-center gap-2 text-sm text-navy-600">
        <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} className="h-3.5 w-3.5 rounded border-navy-300 text-brand-500 focus:ring-brand-500" />
        Verified only
      </label>
      <button onClick={clearAll} className="w-full rounded-lg border border-navy-100 px-3 py-2 text-sm font-medium text-navy-600 hover:bg-navy-50">
        Clear all filters
      </button>
    </div>
  )

  return (
    <div>
      <PageHeader
        title="Internship Marketplace"
        subtitle="Ranked by your skill compatibility — matches update as you close skill gaps."
        actions={
          <>
            <Button variant="secondary" icon={Filter} onClick={() => setShowFilters((v) => !v)} className="lg:hidden">Filters</Button>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="h-[42px] rounded-lg border border-navy-100 bg-white px-3 text-sm font-medium text-navy-600 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
            >
              <option value="match">Sort: Best match</option>
              <option value="stipend">Sort: Highest stipend</option>
            </select>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <Card className="sticky top-20">
            <CardHeader title="Filters" action={<SlidersHorizontal size={16} className="text-navy-400" />} />
            {filterPanel}
          </Card>
        </aside>

        {showFilters && (
          <Card className="lg:hidden">
            <CardHeader title="Filters" action={<SlidersHorizontal size={16} className="text-navy-400" />} />
            {filterPanel}
          </Card>
        )}

        <div className="space-y-4">
          <p className="text-sm text-navy-500">
            Showing <span className="font-semibold text-navy-800">{list.length}</span> internships
          </p>
          {list.length === 0 ? (
            <EmptyState icon={SearchX} title="No internships match these filters" description="Try clearing the stipend, skill or industry filters." />
          ) : (
            list.map(({ internship, match }) => (
              <OpportunityCard
                key={internship.id}
                internship={internship}
                match={match.score}
                onView={() => setDetail({ internship, match })}
                onApply={() => handleApply(internship)}
              />
            ))
          )}
        </div>
      </div>

      <Modal open={!!detail} onClose={() => setDetail(null)} title="" size="lg">
        {detail && (
          <div>
            <div className="flex items-start gap-4">
              <CompanyLogo text={detail.internship.company} size="lg" />
              <div className="min-w-0 flex-1">
                <h3 className="text-xl font-semibold text-navy-900">{detail.internship.title}</h3>
                <p className="mt-1 flex flex-wrap items-center gap-1 text-sm text-navy-500">
                  {detail.internship.company} ·
                  <span className="inline-flex items-center gap-1"><MapPin size={13} />{detail.internship.location}</span>
                  · {detail.internship.workMode}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {detail.internship.skills.map((s) => <Pill key={s}>{s}</Pill>)}
                </div>
              </div>
              <div className="ml-auto hidden shrink-0 sm:block">
                <CircularMatchGauge score={detail.match.score} size={72} />
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                ['Stipend', `₹${detail.internship.stipend.toLocaleString('en-IN')}/mo`],
                ['Duration', detail.internship.duration],
                ['Deadline', formatDate(detail.internship.deadline)],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-navy-100 bg-surface/60 p-3">
                  <p className="text-[11px] font-medium uppercase tracking-wider text-navy-400">{k}</p>
                  <p className="text-sm font-semibold text-navy-800">{v}</p>
                </div>
              ))}
            </div>

            <h4 className="mt-5 text-sm font-semibold text-navy-800">Role overview</h4>
            <p className="mt-1.5 text-sm leading-relaxed text-navy-500">{detail.internship.description}</p>

            <h4 className="mt-4 text-sm font-semibold text-navy-800">Your match breakdown</h4>
            <ul className="mt-2 space-y-1.5 text-sm text-navy-500">
              <li>Skills overlap: <span className="font-semibold text-navy-800">{detail.match.breakdown.skills}%</span> ({detail.match.matchedSkills.length}/{detail.internship.skills.length} required skills)</li>
              {detail.match.missingSkills.length > 0 && (
                <li>Gap to close: <span className="font-medium text-critical-600">{detail.match.missingSkills.join(', ')}</span></li>
              )}
              <li>Education fit: <span className="font-semibold text-navy-800">{detail.match.breakdown.education}%</span></li>
            </ul>

            <div className="mt-6 flex gap-2.5">
              <Button className="flex-1" onClick={() => handleApply(detail.internship)}>Apply Now</Button>
              <Button variant="secondary" onClick={() => toast({ type: 'info', title: 'Saved to your list', description: detail.internship.title })}>Save</Button>
            </div>
          </div>
        )}
      </Modal>

      <ApplyModal open={!!applyTarget} onClose={() => setApplyTarget(null)} internship={applyTarget} />
    </div>
  )
}

function Group({ title, children }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-navy-400">{title}</p>
      {children}
    </div>
  )
}
