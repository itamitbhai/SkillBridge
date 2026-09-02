import { FileStack, Brain, Compass, Handshake, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import { useAuth } from '../../hooks/useAuth'

const STEPS = [
  { num: '01', title: 'Build Your Skill Profile', icon: FileStack, desc: 'Students create detailed profiles containing education, skills, certifications, interests, projects and research experience.', detail: 'The richer the profile, the more accurate the AI skill mapping and internship matching become.' },
  { num: '02', title: 'AI Skill Mapping', icon: Brain, desc: 'AI compares student skills with industry requirements and identifies matching skills, missing skills, recommended skills and career opportunities.', detail: 'Every result is explainable — you always see why a match or gap was identified, never just a number.' },
  { num: '03', title: 'Discover Opportunities', icon: Compass, desc: 'Students discover internships, placements, research projects, industry challenges and clinical opportunities.', detail: 'Every clinical internship is verified end-to-end: institution, industry, supervisor, duration and certificate.' },
  { num: '04', title: 'Connect & Collaborate', icon: Handshake, desc: 'Institutions, students and companies collaborate on internships, R&D, research, patents and technology licensing.', detail: 'Collaboration workspaces track milestones, documents, tasks and deliverables in one place.' },
]

export default function HowItWorks() {
  const navigate = useNavigate()
  const { loginAsDemo } = useAuth()

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <span className="badge bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100">How It Works</span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">One Platform. Multiple Opportunities.</h1>
        <p className="mt-4 text-base leading-relaxed text-navy-500">
          A structured pipeline that turns a student's skills into internships, research collaboration and
          employment — with explainable AI guiding every match.
        </p>
      </div>

      <div className="mt-12 space-y-5">
        {STEPS.map((step) => (
          <div key={step.num} className="card flex flex-col gap-5 p-6 sm:flex-row sm:items-start">
            <div className="flex items-center gap-4 sm:w-56 sm:shrink-0">
              <span className="text-3xl font-bold text-navy-100">{step.num}</span>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50">
                <step.icon size={20} className="text-brand-600" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-semibold text-navy-800">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-navy-600">{step.desc}</p>
              <p className="mt-2 text-xs leading-relaxed text-navy-400">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button
          size="lg"
          iconRight={ArrowRight}
          onClick={() => {
            loginAsDemo('student')
            navigate('/dashboard')
          }}
        >
          Try It Yourself — Continue with Demo
        </Button>
      </div>
    </div>
  )
}
