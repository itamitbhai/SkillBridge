import { useNavigate } from 'react-router-dom'
import { GraduationCap, Target, Briefcase, Award, FlaskConical } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import KPICard from '../../components/dashboard/KPICard'
import Card, { CardHeader } from '../../components/ui/Card'
import BarChartHorizontal from '../../components/charts/BarChartHorizontal'
import { useAuth } from '../../hooks/useAuth'
import { institutions } from '../../data/institutions'
import { students } from '../../data/students'
import { skillGapAnalysis } from '../../data/analytics'
import { curriculumInsights } from '../../data/curriculumInsights'

export default function InstitutionDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const institution = institutions.find((i) => i.name === user?.institution) || institutions[0]
  const myStudents = students.filter((s) => s.institutionId === institution.id)
  const avgSkillScore = Math.round(myStudents.reduce((sum, s) => sum + s.skillScore, 0) / (myStudents.length || 1))

  return (
    <div>
      <PageHeader
        title={institution.name}
        subtitle="Institution overview — student skill readiness, industry partnerships and research collaborations."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <KPICard icon={GraduationCap} label="Total Students" value={institution.students} iconBg="bg-brand-50" iconColor="text-brand-600" />
        <KPICard icon={Target} label="Skill Readiness" value={`${avgSkillScore}%`} iconBg="bg-success-50" iconColor="text-success-600" />
        <KPICard icon={Briefcase} label="Industry Partnerships" value={institution.industryPartners} iconBg="bg-warning-50" iconColor="text-warning-600" />
        <KPICard icon={Award} label="Internship Placements" value={institution.placements} iconBg="bg-amber-50" iconColor="text-amber-600" />
        <KPICard icon={FlaskConical} label="Research Collaborations" value={institution.researchProjects} iconBg="bg-navy-50" iconColor="text-navy-600" />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Skill Supply vs Industry Demand" subtitle="Where student skills lag behind industry requirements" action={
            <button onClick={() => navigate('/institution/skill-analytics')} className="text-xs font-semibold text-brand-600 hover:text-brand-700">
              Full analytics →
            </button>
          } />
          <BarChartHorizontal data={skillGapAnalysis} dataKey="demand" categoryKey="skill" defaultColor="#F79009" height={260} />
        </Card>

        <Card padding={false}>
          <div className="p-5 pb-0">
            <CardHeader title="Recommended Curriculum Improvements" subtitle="AI-generated based on industry demand trends" />
          </div>
          <div className="divide-y divide-navy-100">
            {curriculumInsights.slice(0, 3).map((c) => (
              <div key={c.id} className="px-5 py-3.5">
                <p className="text-sm text-navy-700">{c.finding}</p>
                <p className="mt-1.5 text-xs font-semibold text-brand-600">+ {c.recommendedModule}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card padding={false} className="mt-5">
        <div className="p-5 pb-0">
          <CardHeader
            title="Students"
            subtitle={`${myStudents.length} students enrolled from ${institution.name}`}
            action={<button onClick={() => navigate('/institution/students')} className="text-xs font-semibold text-brand-600 hover:text-brand-700">View all →</button>}
          />
        </div>
        <div className="divide-y divide-navy-100">
          {myStudents.slice(0, 5).map((s) => (
            <div key={s.id} className="flex items-center gap-4 px-5 py-3.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-100 text-xs font-bold text-navy-600">
                {s.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-navy-800">{s.name}</p>
                <p className="text-xs text-navy-400">{s.course} · {s.year}</p>
              </div>
              <p className="text-sm font-semibold text-navy-700">{s.skillScore}%</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
