import { useState } from 'react'
import { MapPin } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import Card, { CardHeader } from '../../components/ui/Card'
import Modal from '../../components/ui/Modal'
import BarChartHorizontal from '../../components/charts/BarChartHorizontal'
import BarChartVertical from '../../components/charts/BarChartVertical'
import RiskDonut from '../../components/charts/RiskDonut'
import TrendChart from '../../components/charts/TrendChart'
import {
  skillGapAnalysis, disciplineDistribution, industryParticipation, monthlyTrends,
  placementRateTrend, reportTypeDistribution, regionalData,
} from '../../data/analytics'
import { technologies } from '../../data/technologies'
import { rndChallenges } from '../../data/rndChallenges'
import { useAuth } from '../../hooks/useAuth'
import { DISCIPLINES } from '../../data/skillTaxonomy'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import ChartTooltip from '../../components/charts/ChartTooltip'

const DIST_COLORS = ['#3168F0', '#12B76A', '#F79009', '#D92D20', '#8A94A6']
const TYPE_COLORS = { Internships: '#3168F0', Placements: '#12B76A', 'Research Collaborations': '#F79009', 'Technology Licensing': '#D92D20' }

const FILTERS = [
  { label: 'Discipline', options: DISCIPLINES },
  { label: 'State', options: regionalData.map((r) => r.state) },
]

export default function Analytics() {
  const { role } = useAuth()
  const [filterValues, setFilterValues] = useState({ Discipline: 'all', State: 'all' })
  const [selectedState, setSelectedState] = useState(null)

  const licensingByStatus = ['Available', 'Under Negotiation', 'Licensed'].map((s) => ({
    status: s,
    count: technologies.filter((t) => t.licensingStatus === s).length,
  }))

  const rndByStatus = ['Open', 'In Progress', 'Closed'].map((s) => ({
    status: s,
    count: rndChallenges.filter((c) => c.status === s).length,
  }))

  return (
    <div>
      <PageHeader title="Analytics" subtitle="Cross-cutting analysis of skills, internships, placements and collaborations." />

      <div className="card mb-5 flex flex-wrap items-center gap-2.5 p-4">
        {FILTERS.map((f) => (
          <select
            key={f.label}
            value={filterValues[f.label]}
            onChange={(e) => setFilterValues((v) => ({ ...v, [f.label]: e.target.value }))}
            className="rounded-lg border border-navy-100 bg-white px-3 py-2 text-sm text-navy-600 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          >
            <option value="all">{f.label}</option>
            {f.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        ))}
      </div>

      {role === 'admin' && (
        <Card className="mb-5">
          <CardHeader title="India Distribution" subtitle="Institutions, industries, internships and research projects by state — click a state for detail" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {regionalData.map((s) => (
              <button
                key={s.state}
                onClick={() => setSelectedState(s)}
                className="rounded-xl border border-navy-100 p-3.5 text-left transition-colors hover:border-brand-200 hover:bg-brand-50/40"
              >
                <p className="flex items-center gap-1 text-xs font-semibold text-navy-700"><MapPin size={12} />{s.state}</p>
                <p className="mt-1.5 text-lg font-bold text-navy-900">{s.internships}</p>
                <p className="text-[11px] text-navy-400">internships</p>
              </button>
            ))}
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Student Skill Distribution" subtitle="Registered students by engineering discipline" />
          <div className="flex items-center justify-center py-2">
            <RiskDonut
              size={200}
              centerValue={disciplineDistribution.reduce((s, d) => s + d.students, 0).toLocaleString('en-IN')}
              centerLabel="Students"
              data={disciplineDistribution.map((d, i) => ({ level: d.discipline, value: d.students, color: DIST_COLORS[i] }))}
            />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {disciplineDistribution.map((d, i) => (
              <div key={d.discipline} className="flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full" style={{ background: DIST_COLORS[i] }} />
                <span className="text-navy-500">{d.discipline}</span>
                <span className="ml-auto font-semibold text-navy-700">{d.students.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Industry Skill Demand" subtitle="Most requested skills across postings" />
          <BarChartHorizontal data={skillGapAnalysis} dataKey="demand" categoryKey="skill" defaultColor="#3168F0" />
        </Card>

        <Card>
          <CardHeader title="Skill Gap Analysis" subtitle="Supply vs. demand per skill" />
          <BarChartHorizontal data={skillGapAnalysis} dataKey="supply" categoryKey="skill" defaultColor="#F79009" />
        </Card>

        <Card>
          <CardHeader title="Internship Applications" subtitle="Monthly application volume" />
          <TrendChart data={monthlyTrends} lines={['applications']} />
        </Card>

        <Card>
          <CardHeader title="Placement Rate" subtitle="Monthly placement conversion rate" />
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={placementRateTrend} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="#EEF1F5" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#8A94A6' }} axisLine={{ stroke: '#EEF1F5' }} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#8A94A6' }} axisLine={false} tickLine={false} width={36} unit="%" />
              <Tooltip content={<ChartTooltip formatter={(v) => `${v}%`} />} />
              <Line type="monotone" dataKey="rate" name="Placement Rate" stroke="#12B76A" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader title="Industry Participation" subtitle="Partner companies by category" />
          <BarChartHorizontal data={industryParticipation} dataKey="partners" categoryKey="category" defaultColor="#5A8CFF" />
        </Card>

        <Card>
          <CardHeader title="R&D Collaborations" subtitle="Challenges by status" />
          <BarChartVertical data={rndByStatus.map((r) => ({ ...r, color: r.status === 'Open' ? '#3168F0' : r.status === 'In Progress' ? '#F79009' : '#8A94A6' }))} dataKey="count" categoryKey="status" colorKey="color" />
        </Card>

        <Card>
          <CardHeader title="Patent Licensing" subtitle="Technologies by licensing status" />
          <BarChartVertical data={licensingByStatus.map((l) => ({ ...l, color: l.status === 'Licensed' ? '#12B76A' : l.status === 'Under Negotiation' ? '#F79009' : '#3168F0' }))} dataKey="count" categoryKey="status" colorKey="color" />
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Ecosystem Activity Mix" subtitle="Share of internships, placements, research collaborations and technology licensing" />
          <div className="flex items-center justify-center py-2">
            <RiskDonut
              size={220}
              centerValue={`${reportTypeDistribution.reduce((s, r) => s + r.value, 0)}%`}
              centerLabel="Total Share"
              data={reportTypeDistribution.map((r) => ({ level: r.type, value: r.value, color: TYPE_COLORS[r.type] }))}
            />
          </div>
        </Card>
      </div>

      <Modal open={!!selectedState} onClose={() => setSelectedState(null)} title={selectedState?.state}>
        {selectedState && (
          <div className="grid grid-cols-2 gap-4">
            <Stat label="Institutions" value={selectedState.institutions} />
            <Stat label="Industries" value={selectedState.industries} />
            <Stat label="Internships" value={selectedState.internships} />
            <Stat label="Research Projects" value={selectedState.researchProjects} />
          </div>
        )}
      </Modal>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg bg-surface/70 p-4">
      <p className="text-[11px] font-medium text-navy-400">{label}</p>
      <p className="mt-1 text-xl font-bold text-navy-900">{value}</p>
    </div>
  )
}
