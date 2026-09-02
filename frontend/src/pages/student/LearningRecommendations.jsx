import { BookOpen, PlayCircle } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { skillGaps } from '../../data/skillBenchmarks'
import { recommendCourses } from '../../services/aiService'
import { useToast } from '../../hooks/useToast'

export default function LearningRecommendations() {
  const { toast } = useToast()
  const recommendations = recommendCourses(skillGaps).map((c, i) => ({ ...c, gap: skillGaps[i] }))

  const handleStart = (course) => {
    toast({ type: 'success', title: 'Course bookmarked', description: `"${course}" has been added to your learning list.` })
  }

  return (
    <div>
      <PageHeader
        title="Learning Recommendations"
        subtitle="AI-curated courses to close your highest-priority skill gaps."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((r) => (
          <Card key={r.skill} className="flex h-full flex-col">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50">
              <BookOpen size={18} className="text-brand-600" />
            </div>
            <p className="mt-3.5 text-sm font-semibold text-navy-800">{r.course}</p>
            <p className="mt-1 text-xs text-navy-400">Closes gap in: {r.skill}</p>
            {r.gap && (
              <p className="mt-2 text-xs text-navy-500">
                Current {r.gap.current}% → Target {r.gap.target}%{' '}
                <span className="font-semibold text-critical-600">(-{r.gap.target - r.gap.current}%)</span>
              </p>
            )}
            <Button variant="secondary" size="sm" icon={PlayCircle} className="mt-4" onClick={() => handleStart(r.course)}>
              Start Learning
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
