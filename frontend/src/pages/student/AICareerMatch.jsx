import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import Card, { CardHeader } from '../../components/ui/Card'
import { Pill } from '../../components/ui/Badge'
import MatchBadge from '../../components/dashboard/MatchBadge'
import { demoStudent } from '../../data/students'
import { recommendCareer } from '../../services/aiService'

export default function AICareerMatch() {
  const navigate = useNavigate()
  const careerPaths = useMemo(() => recommendCareer(demoStudent.skills), [])

  return (
    <div>
      <PageHeader
        title="AI Career Match"
        subtitle="Career paths ranked against your current skill profile, with explainable match reasoning."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {careerPaths.map((path) => (
          <Card key={path.title}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50">
                <Sparkles size={18} className="text-brand-600" />
              </div>
              <MatchBadge score={path.match} />
            </div>
            <p className="mt-3.5 text-base font-semibold text-navy-800">{path.title}</p>

            {path.strengths.length > 0 && (
              <div className="mt-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-navy-400">Why you match</p>
                <p className="mt-1 text-sm text-navy-600">{path.strengths.join(', ')}</p>
              </div>
            )}

            {path.missing.length > 0 && (
              <div className="mt-3">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-navy-400">Missing</p>
                <p className="mt-1 text-sm text-critical-600">{path.missing.join(', ')}</p>
              </div>
            )}

            {path.recommendedLearning.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {path.recommendedLearning.map((r) => <Pill key={r}>{r}</Pill>)}
              </div>
            )}

            <button
              onClick={() => navigate('/marketplace/internships')}
              className="mt-4 text-xs font-semibold text-brand-600 hover:text-brand-700"
            >
              Explore matching opportunities →
            </button>
          </Card>
        ))}
      </div>

      <Card className="mt-5">
        <CardHeader title="How this is calculated" />
        <p className="text-sm leading-relaxed text-navy-500">
          Each career path is scored by how many of its required skills appear in your current skill profile.
          Strengthen the skills listed under "Missing" to raise your match score — start from{' '}
          <button onClick={() => navigate('/skill-gap-analysis')} className="font-semibold text-brand-600 hover:text-brand-700">
            Skill Gap Analysis
          </button>.
        </p>
      </Card>
    </div>
  )
}
