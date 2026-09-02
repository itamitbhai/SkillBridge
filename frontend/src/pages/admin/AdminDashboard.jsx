import { useNavigate } from 'react-router-dom'
import { Users2, Landmark, Briefcase, ShieldCheck, FolderKanban, Boxes, Award } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import KPICard from '../../components/dashboard/KPICard'
import Card, { CardHeader } from '../../components/ui/Card'
import TrendChart from '../../components/charts/TrendChart'
import Button from '../../components/ui/Button'
import { nationalStats, monthlyTrends, regionalData } from '../../data/analytics'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const topStates = [...regionalData].sort((a, b) => b.internships - a.internships).slice(0, 5)

  return (
    <div>
      <PageHeader
        title="Platform Overview"
        subtitle="National view of the academia-industry collaboration ecosystem."
        actions={<Button icon={ShieldCheck} onClick={() => navigate('/admin/verification')}>Verification Queue</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard icon={Users2} label="Registered Students" value={nationalStats.registeredStudents.toLocaleString('en-IN')} iconBg="bg-brand-50" iconColor="text-brand-600" />
        <KPICard icon={Landmark} label="Academic Institutions" value={nationalStats.academicInstitutions} iconBg="bg-success-50" iconColor="text-success-600" />
        <KPICard icon={Briefcase} label="Industry Partners" value={nationalStats.industryPartners} iconBg="bg-warning-50" iconColor="text-warning-600" />
        <KPICard icon={ShieldCheck} label="Verified Internships" value={nationalStats.verifiedInternships.toLocaleString('en-IN')} iconBg="bg-amber-50" iconColor="text-amber-600" />
        <KPICard icon={FolderKanban} label="Active Collaborations" value={nationalStats.activeCollaborations} iconBg="bg-navy-50" iconColor="text-navy-600" />
        <KPICard icon={Boxes} label="Patents / Technologies" value={nationalStats.patentsTechnologies.toLocaleString('en-IN')} iconBg="bg-brand-50" iconColor="text-brand-600" />
        <KPICard icon={Award} label="Placements" value={nationalStats.placements.toLocaleString('en-IN')} iconBg="bg-success-50" iconColor="text-success-600" />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Ecosystem Growth Trend" subtitle="Applications, placements and active internships over time" />
          <TrendChart data={monthlyTrends} lines={['applications', 'placements', 'internships']} />
        </Card>

        <Card padding={false}>
          <div className="p-5 pb-0">
            <CardHeader title="Top States by Internships" action={<button onClick={() => navigate('/analytics')} className="text-xs font-semibold text-brand-600 hover:text-brand-700">View map →</button>} />
          </div>
          <div className="divide-y divide-navy-100">
            {topStates.map((s) => (
              <div key={s.state} className="flex items-center justify-between px-5 py-3.5">
                <div>
                  <p className="text-sm font-medium text-navy-800">{s.state}</p>
                  <p className="text-xs text-navy-400">{s.institutions} institutions · {s.industries} industries</p>
                </div>
                <p className="text-sm font-bold text-navy-700">{s.internships}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
