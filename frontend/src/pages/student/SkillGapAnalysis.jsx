import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import Card, { CardHeader } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import SkillGapCard from '../../components/skills/SkillGapCard'
import SkillGapPriorityList from '../../components/skills/SkillGapPriorityList'
import { skillBenchmarks, skillGaps } from '../../data/skillBenchmarks'
import { recommendCourses } from '../../services/aiService'

export default function SkillGapAnalysis() {
  const navigate = useNavigate()
  const strengths = skillBenchmarks.filter((s) => s.current >= s.target)

  return (
    <div>
      <PageHeader
        title="Skill Gap Analysis"
        subtitle="Where your current skills stand against the industry benchmark for your target role."
        actions={<Button onClick={() => navigate('/skill-assessment')}>Retake Assessment</Button>}
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Priority Gaps" subtitle="Current → Required → Gap" />
          <SkillGapPriorityList items={skillGaps} />
        </Card>

        <Card>
          <CardHeader title="Strengths" subtitle="Skills already meeting or exceeding benchmark" />
          <div className="space-y-3">
            {strengths.map((s) => (
              <div key={s.skill} className="flex items-center justify-between rounded-lg bg-success-50 px-3.5 py-2.5">
                <span className="text-sm font-medium text-success-800">{s.skill}</span>
                <span className="text-xs font-bold text-success-700">{s.current}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-5">
        <h3 className="mb-3 text-sm font-semibold text-navy-800">Detailed Breakdown</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {skillGaps.map((g) => (
            <SkillGapCard
              key={g.skill}
              title={g.skill}
              current={g.current}
              industry={g.target}
              gap={g.target - g.current}
              recommended={recommendCourses([g]).map((c) => c.course)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
