import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Target, Briefcase, Award, UserCircle2, Sparkles, RotateCcw } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import KPICard from '../../components/dashboard/KPICard'
import Card, { CardHeader } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import SkillBenchmarkBar from '../../components/skills/SkillBenchmarkBar'
import SkillGapPriorityList from '../../components/skills/SkillGapPriorityList'
import OpportunityCard from '../../components/internships/OpportunityCard'
import ApplicationPipelineWidget from '../../components/dashboard/ApplicationPipelineWidget'
import ReadinessSnapshotWidget from '../../components/dashboard/ReadinessSnapshotWidget'
import { useAuth } from '../../hooks/useAuth'
import { demoStudent } from '../../data/students'
import { demoStudentApplications } from '../../data/applications'
import { internships } from '../../data/internships'
import { jobs } from '../../data/jobs'
import { notifications } from '../../data/notifications'
import { matchStudentToInternship } from '../../services/aiService'
import { timeAgo } from '../../utils/format'
import { skillBenchmarks, skillGaps as SKILL_GAPS } from '../../data/skillBenchmarks'

const PROFILE_COMPLETION = 92

const ROLE_TITLE_BY_INTEREST = {
  'Frontend Development': 'Frontend Developer',
  'Backend Development': 'Backend Developer',
  'Full Stack Development': 'Full Stack Developer',
  'Data Science': 'Data Scientist',
  'DevOps Engineering': 'DevOps Engineer',
  'Machine Learning': 'Machine Learning Engineer',
}

export default function StudentDashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const firstName = (user?.name || 'Student').split(' ')[0]
  const targetRole = ROLE_TITLE_BY_INTEREST[demoStudent.careerInterests[0]] || 'Frontend Developer'

  const rankedInternships = useMemo(
    () => internships.map((i) => ({ internship: i, match: matchStudentToInternship(demoStudent, i).score })).sort((a, b) => b.match - a.match),
    []
  )
  const rankedJobs = useMemo(
    () => jobs.map((j) => matchStudentToInternship(demoStudent, j).score),
    []
  )

  const internshipMatches = rankedInternships.filter((r) => r.match >= 50).length
  const jobMatches = rankedJobs.filter((s) => s >= 50).length
  const topRecommendations = rankedInternships.slice(0, 3)
  const pipelineApps = demoStudentApplications.filter((a) => a.status !== 'Rejected').slice(0, 4)
  const topGap = SKILL_GAPS[0]

  return (
    <div>
      <PageHeader
        title={
          <>
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-brand-600">Welcome back, {firstName}</span>
            Your industry readiness at a glance
          </>
        }
        subtitle={`${demoStudent.course}, ${demoStudent.discipline} · ${demoStudent.institution} · Target role: ${targetRole}`}
        actions={
          <>
            <Button variant="secondary" icon={RotateCcw} onClick={() => navigate('/skill-assessment')}>Retake Assessment</Button>
            <Button icon={Sparkles} onClick={() => navigate('/ai-career-match')}>AI Career Match</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard icon={Target} label="Skill Readiness" value={`${demoStudent.skillScore}%`} change={6} iconBg="bg-brand-50" iconColor="text-brand-600" />
        <KPICard icon={Briefcase} label="Internship Matches" value={internshipMatches} changeLabel={`${Math.min(internshipMatches, 4)} new today`} iconBg="bg-success-50" iconColor="text-success-600" />
        <KPICard icon={Target} label="Job Matches" value={jobMatches} changeLabel="2 highest match" iconBg="bg-amber-50" iconColor="text-amber-600" />
        <KPICard icon={UserCircle2} label="Profile Completion" value={`${PROFILE_COMPLETION}%`} iconBg="bg-warning-50" iconColor="text-warning-600" />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="My Skill Profile"
            subtitle="Marker shows the industry benchmark for your target role"
            action={<button onClick={() => navigate('/skill-gap-analysis')} className="text-xs font-semibold text-brand-600 hover:text-brand-700">Full analysis</button>}
          />
          <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
            {skillBenchmarks.map((s) => (
              <SkillBenchmarkBar key={s.skill} skill={s.skill} current={s.current} target={s.target} />
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Skill Gap Analysis" subtitle="Current → Required → Gap" />
          <SkillGapPriorityList items={SKILL_GAPS} />
          <Button className="mt-5 w-full" onClick={() => navigate('/skill-gap-analysis')}>Improve Skills</Button>
        </Card>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-navy-800">Recommended Opportunities</h3>
            <button onClick={() => navigate('/marketplace/internships')} className="text-xs font-semibold text-brand-600 hover:text-brand-700">View all</button>
          </div>
          {topRecommendations.map(({ internship, match }) => (
            <OpportunityCard
              key={internship.id}
              internship={internship}
              match={match}
              onView={() => navigate(`/marketplace/internships/${internship.id}`)}
              onApply={() => navigate(`/marketplace/internships/${internship.id}?apply=1`)}
            />
          ))}
        </div>

        <div className="space-y-5">
          <ApplicationPipelineWidget applications={pipelineApps} />
          <ReadinessSnapshotWidget overallScore={demoStudent.skillScore} categoryScores={demoStudent.skillCategoryScores} topGap={topGap ? { skill: topGap.skill, gap: topGap.target - topGap.current } : null} />
          <Card>
            <CardHeader title="Latest Notifications" />
            <div className="space-y-3">
              {notifications.slice(0, 3).map((n) => (
                <div key={n.id}>
                  <p className="text-sm font-medium text-navy-700">{n.title}</p>
                  <p className="text-xs text-navy-400">{timeAgo(n.time)}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
