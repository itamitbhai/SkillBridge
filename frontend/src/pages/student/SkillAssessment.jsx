import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Gauge, RotateCcw } from 'lucide-react'
import clsx from 'clsx'
import PageHeader from '../../components/PageHeader'
import Card, { CardHeader } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { Pill } from '../../components/ui/Badge'
import CircularMatchGauge from '../../components/dashboard/CircularMatchGauge'
import CompetencyBar from '../../components/skills/CompetencyBar'
import BenchmarkRadar from '../../components/skills/BenchmarkRadar'
import { levels, questions } from '../../data/assessmentQuestions'
import { demoStudent } from '../../data/students'

const TOTAL = 20

export default function SkillAssessment() {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [done, setDone] = useState(false)

  const q = questions[index % questions.length]
  const progress = Math.round(((index + 1) / TOTAL) * 100)
  const minutesRemaining = Math.max(1, Math.ceil((TOTAL - index) * 0.6))

  if (done) return <Result onRetake={() => { setDone(false); setIndex(0); setAnswers({}) }} />

  return (
    <div>
      <PageHeader
        title="Evaluate Your Industry Readiness"
        subtitle="Answer honestly — your skill gaps, learning plan and match scores are generated from these responses."
        actions={<Pill>~{minutesRemaining} min remaining</Pill>}
      />

      <Card className="mx-auto max-w-3xl">
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-navy-800">Question {index + 1} of {TOTAL}</span>
            <span className="text-navy-400">{progress}% complete</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-navy-50">
            <div className="h-full rounded-full bg-brand-500 transition-[width] duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <Pill>{q.tag}</Pill>
        <h2 className="mt-3 text-xl font-semibold text-navy-900">{q.q}</h2>

        <div className="mt-6 grid gap-2">
          {levels.map((l, i) => {
            const active = answers[index] === i
            return (
              <button
                key={l}
                onClick={() => setAnswers((a) => ({ ...a, [index]: i }))}
                className={clsx(
                  'flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors',
                  active ? 'border-brand-300 bg-brand-50 text-navy-800 ring-1 ring-inset ring-brand-200' : 'border-navy-100 bg-white text-navy-500 hover:border-brand-200 hover:text-navy-800'
                )}
              >
                <span className="flex items-center gap-3">
                  <span className={clsx('grid h-6 w-6 place-items-center rounded-full border text-[11px] font-bold', active ? 'border-brand-500 bg-brand-500 text-white' : 'border-navy-200 text-navy-400')}>
                    {i + 1}
                  </span>
                  {l}
                </span>
                {active && <CheckCircle2 size={16} className="text-brand-600" />}
              </button>
            )
          })}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Button variant="secondary" icon={ArrowLeft} disabled={index === 0} onClick={() => setIndex((i) => Math.max(0, i - 1))}>
            Previous
          </Button>
          <Button iconRight={ArrowRight} onClick={() => (index + 1 >= TOTAL ? setDone(true) : setIndex((i) => i + 1))}>
            {index + 1 >= TOTAL ? 'Finish & score' : 'Next'}
          </Button>
        </div>
        <button onClick={() => setDone(true)} className="mt-4 text-xs font-medium text-brand-600 hover:underline">
          Skip to demo result →
        </button>
      </Card>
    </div>
  )
}

function Result({ onRetake }) {
  const navigate = useNavigate()
  const scores = demoStudent.skillCategoryScores
  const entries = Object.entries(scores)
  const readyCount = entries.filter(([, v]) => v >= 75).length

  return (
    <div>
      <PageHeader
        title="Your Skill Assessment Result"
        subtitle="Scores are benchmarked against industry expectations for your target role."
        actions={
          <>
            <Button variant="secondary" icon={RotateCcw} onClick={onRetake}>Retake</Button>
            <Button onClick={() => navigate('/skill-gap-analysis')}>View Skill Gap Analysis</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card>
          <CardHeader title="Overall Score" action={<Gauge size={16} className="text-navy-400" />} />
          <div className="flex items-center gap-5">
            <CircularMatchGauge score={demoStudent.skillScore} size={110} label="OVERALL" />
            <div className="text-sm text-navy-500">
              <p className="text-navy-800">
                <span className="font-semibold">Industry-ready in {readyCount} of {entries.length}</span> competency areas.
              </p>
              <p className="mt-2">You rank in the top 22% of assessed students at {demoStudent.institution}.</p>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader title="Competency Breakdown" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {entries.map(([cat, score]) => (
              <CompetencyBar key={cat} name={cat} value={score} />
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-5">
        <CardHeader title="Skill Radar" subtitle="Your profile vs industry benchmark" />
        <BenchmarkRadar categoryScores={scores} benchmark={80} />
      </Card>
    </div>
  )
}
