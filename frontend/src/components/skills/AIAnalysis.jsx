import { motion } from 'framer-motion'
import { CheckCircle2, AlertTriangle, XCircle, Gauge } from 'lucide-react'
import Card, { CardHeader } from '../ui/Card'
import { Pill } from '../ui/Badge'
import MatchBadge from '../dashboard/MatchBadge'

function SkillPillGroup({ icon: Icon, iconColor, skills, emptyLabel }) {
  if (!skills || skills.length === 0) {
    return <p className="text-sm text-navy-400">{emptyLabel}</p>
  }
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((s) => (
        <span key={s} className="inline-flex items-center gap-1.5 rounded-lg bg-navy-50 px-3 py-1.5 text-xs font-medium text-navy-700">
          <Icon size={13} className={iconColor} />
          {s}
        </span>
      ))}
    </div>
  )
}

export default function AIAnalysis({ result }) {
  if (!result) return null

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="space-y-6">
      <div className="flex items-center gap-4 rounded-xl border border-navy-100 bg-surface/60 p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50">
          <Gauge size={22} className="text-brand-600" />
        </div>
        <div>
          <p className="text-xs font-medium text-navy-400">Overall Industry Readiness</p>
          <p className="text-3xl font-bold text-navy-900">{result.overallScore}%</p>
        </div>
      </div>

      <div>
        <p className="mb-2.5 text-sm font-semibold text-navy-800">Strong Skills</p>
        <SkillPillGroup icon={CheckCircle2} iconColor="text-success-600" skills={result.strongSkills} emptyLabel="No strong skills detected yet." />
      </div>

      <div>
        <p className="mb-2.5 text-sm font-semibold text-navy-800">Moderate Skills</p>
        <SkillPillGroup icon={AlertTriangle} iconColor="text-amber-500" skills={result.moderateSkills} emptyLabel="No moderate skills detected." />
      </div>

      <div>
        <p className="mb-2.5 text-sm font-semibold text-navy-800">Skill Gaps</p>
        <SkillPillGroup icon={XCircle} iconColor="text-critical-500" skills={(result.skillGaps || []).map((g) => g.skill)} emptyLabel="No major skill gaps detected." />
      </div>

      {result.careerPaths?.length > 0 && (
        <div>
          <p className="mb-3 text-sm font-semibold text-navy-800">Career Recommendations</p>
          <div className="space-y-3">
            {result.careerPaths.map((path) => (
              <div key={path.title} className="rounded-xl border border-navy-100 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-navy-800">{path.title}</p>
                  <MatchBadge score={path.match} size="sm" />
                </div>
                {path.strengths?.length > 0 && (
                  <p className="mt-2 text-xs text-navy-500">
                    <span className="font-semibold text-navy-600">Why: </span>
                    {path.strengths.join(', ')}
                  </p>
                )}
                {path.missing?.length > 0 && (
                  <p className="mt-1 text-xs text-navy-500">
                    <span className="font-semibold text-navy-600">Missing: </span>
                    {path.missing.join(', ')}
                  </p>
                )}
                {path.recommendedLearning?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {path.recommendedLearning.map((r) => (
                      <Pill key={r}>{r}</Pill>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}
