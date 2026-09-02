import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Briefcase, Users2, Sparkles, FlaskConical, Plus } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import KPICard from '../../components/dashboard/KPICard'
import Card, { CardHeader } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import MatchBadge from '../../components/dashboard/MatchBadge'
import { useAuth } from '../../hooks/useAuth'
import { internships } from '../../data/internships'
import { applications } from '../../data/applications'
import { rndChallenges } from '../../data/rndChallenges'
import { students } from '../../data/students'
import { matchCandidateToIndustry } from '../../services/aiService'

export default function IndustryDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const myInternships = internships.filter((i) => i.company === user?.company)
  const myApplications = applications.filter((a) => myInternships.some((i) => i.id === a.internshipId))
  const myChallenges = rndChallenges.filter((c) => c.company === user?.company)

  const topCandidates = useMemo(() => {
    const opportunity = myInternships[0]
    if (!opportunity) return []
    return matchCandidateToIndustry(students, opportunity).slice(0, 3)
  }, [myInternships])

  return (
    <div>
      <PageHeader
        title={user?.company}
        subtitle="Industry overview — internships, applications and AI-matched candidates."
        actions={<Button icon={Plus} onClick={() => navigate('/opportunities')}>Post Opportunity</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard icon={Briefcase} label="Open Internships" value={myInternships.length || 24} iconBg="bg-brand-50" iconColor="text-brand-600" />
        <KPICard icon={Users2} label="Applications" value={myApplications.length || 482} iconBg="bg-success-50" iconColor="text-success-600" />
        <KPICard icon={Sparkles} label="Matched Candidates" value={86} iconBg="bg-warning-50" iconColor="text-warning-600" />
        <KPICard icon={FlaskConical} label="R&D Collaborations" value={myChallenges.length || 12} iconBg="bg-amber-50" iconColor="text-amber-600" />
      </div>

      <Card padding={false} className="mt-5">
        <div className="p-5 pb-0">
          <CardHeader
            title="Top Candidate Matches"
            subtitle={myInternships[0] ? `For "${myInternships[0].title}"` : 'Post an opportunity to see AI-ranked candidates'}
            action={<button onClick={() => navigate('/opportunities')} className="text-xs font-semibold text-brand-600 hover:text-brand-700">View all opportunities →</button>}
          />
        </div>
        <div className="divide-y divide-navy-100">
          {topCandidates.map(({ student, score, matchedSkills, missingSkills }) => (
            <div key={student.id} className="flex items-center gap-4 px-5 py-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-100 text-xs font-bold text-navy-600">
                {student.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-navy-800">{student.name}</p>
                <p className="truncate text-xs text-navy-400">Skills: {matchedSkills.slice(0, 3).join(', ') || student.skills.slice(0, 3).join(', ')}</p>
                {missingSkills.length > 0 && <p className="truncate text-xs text-critical-500">Gap: {missingSkills.slice(0, 2).join(', ')}</p>}
              </div>
              <MatchBadge score={score} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
