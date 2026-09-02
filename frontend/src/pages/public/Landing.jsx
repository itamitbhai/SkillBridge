import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight, Sparkles, ClipboardCheck, Target, BookOpen, Handshake, ListChecks, ChevronRight,
  Brain, Layers as LayersIcon, Briefcase, Award, GraduationCap, FolderGit2, Users2, BarChart3,
  Landmark, AlertTriangle,
} from 'lucide-react'
import Button from '../../components/ui/Button'
import SkillBenchmarkBar from '../../components/skills/SkillBenchmarkBar'
import CircularMatchGauge from '../../components/dashboard/CircularMatchGauge'
import { heroStats } from '../../data/analytics'
import { skillBenchmarks } from '../../data/skillBenchmarks'
import { useAuth } from '../../hooks/useAuth'

const HERO_SKILLS = skillBenchmarks.slice(0, 4)

const HOW_IT_WORKS = [
  { num: '01', title: 'Assess Your Skills', desc: 'Take an AI-scored skill assessment covering technical, tools and professional competencies.', icon: ClipboardCheck },
  { num: '02', title: 'Discover Skill Gaps', desc: 'See exactly where your current skills fall short of your target role’s benchmark.', icon: Target },
  { num: '03', title: 'Learn & Improve', desc: 'Get personalized learning recommendations to close the highest-priority gaps first.', icon: BookOpen },
  { num: '04', title: 'Get Matched', desc: 'Explainable AI ranks you against verified internships and placements by fit.', icon: Handshake },
  { num: '05', title: 'Apply & Track', desc: 'Apply in one click and track every application from submission to offer.', icon: ListChecks },
]

const CAPABILITIES = [
  { title: 'AI Skill Assessment', desc: 'Scored, explainable evaluation of technical and professional skills.', icon: Brain },
  { title: 'Smart Skill Mapping', desc: 'Continuously compares your profile against live industry benchmarks.', icon: LayersIcon },
  { title: 'Internship Matching', desc: 'AI-ranked internship matches with a transparent score breakdown.', icon: Briefcase },
  { title: 'Placement Matching', desc: 'Full-time placement matches across product, IT services and cloud roles.', icon: Award },
  { title: 'Learning Recommendations', desc: 'Curated resources targeted at your highest-priority skill gaps.', icon: GraduationCap },
  { title: 'Digital Portfolio', desc: 'A verifiable portfolio of projects, certifications and outcomes.', icon: FolderGit2 },
  { title: 'Industry Mentorship', desc: 'Direct mentorship from verified industry professionals.', icon: Users2 },
  { title: 'Analytics', desc: 'Platform-wide analytics for institutions, industry and admins.', icon: BarChart3 },
]

const STAKEHOLDER_PILLS = ['Skill Mapping', 'Internships', 'Placements', 'Mentorship', 'Live Projects', 'Analytics']

const STAKEHOLDERS = [
  { title: 'Students', icon: GraduationCap, role: 'student', points: ['Build an AI-scored skill profile', 'Discover verified internships & placements', 'Track every application end-to-end'] },
  { title: 'Industry', icon: Briefcase, role: 'industry', points: ['Post internships & live projects', 'Get AI-ranked candidate shortlists', 'Mentor students on real problems'] },
  { title: 'Faculty', icon: Users2, role: 'institution', points: ['Monitor student skill readiness', 'Identify curriculum gaps with AI', 'Coordinate placement drives'] },
  { title: 'Institution', icon: Landmark, role: 'admin', points: ['Verify students, industry & faculty', 'Track placement outcomes at scale', 'Monitor ecosystem-wide analytics'] },
]

function useCountUp(target, duration = 1200) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const step = (now) => {
            const progress = Math.min(1, (now - start) / duration)
            setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return [ref, value]
}

function StatCounter({ value, label }) {
  const numeric = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0
  const suffix = value.replace(/[0-9]/g, '')
  const [ref, count] = useCountUp(numeric)

  return (
    <div ref={ref}>
      <p className="text-2xl font-bold text-navy-900">{count}{suffix}</p>
      <p className="mt-0.5 text-xs font-medium text-navy-400">{label}</p>
    </div>
  )
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.45, delay },
  }
}

export default function Landing() {
  const navigate = useNavigate()
  const { loginAsDemo } = useAuth()

  const handleAssessment = () => {
    loginAsDemo('student')
    navigate('/skill-assessment')
  }

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 pb-20 pt-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pb-32 lg:pt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 ring-1 ring-inset ring-brand-100">
              <Sparkles size={13} />
              SIH 26044 · Academia-Industry Collaboration
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-navy-900 sm:text-5xl">
              Bridge the Gap Between <span className="text-brand-600">Academia</span> and{' '}
              <span className="text-brand-600">Industry</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-500">
              AI-powered skill assessment, gap analysis and internship matching that connects engineering students to
              the right opportunities — backed by verified industry benchmarks.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Button variant="primary" size="lg" onClick={handleAssessment} iconRight={ArrowRight}>
                Take Skill Assessment
              </Button>
              <Button variant="secondary" size="lg" onClick={() => navigate('/internships')}>
                Explore Opportunities
              </Button>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
              {heroStats.map((k) => (
                <StatCounter key={k.label} value={k.value} label={k.label} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="relative"
          >
            <div className="card p-6 shadow-card-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-navy-400">Skill Readiness</p>
                  <p className="mt-1 text-sm text-navy-500">Frontend Developer track</p>
                </div>
                <CircularMatchGauge score={78} size={64} label="Ready" />
              </div>

              <div className="mt-6 space-y-4">
                {HERO_SKILLS.map((s) => (
                  <SkillBenchmarkBar key={s.skill} skill={s.skill} current={s.current} target={s.target} />
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -left-6 -top-6 hidden w-56 rounded-xl border border-navy-100 bg-white p-3.5 shadow-card-lg sm:block"
            >
              <div className="flex items-center gap-2 text-warning-600">
                <AlertTriangle size={15} />
                <span className="text-[11px] font-semibold uppercase tracking-wide">Top Skill Gap</span>
              </div>
              <p className="mt-1.5 text-sm font-semibold text-navy-800">System Design</p>
              <p className="text-xs text-navy-400">40% current · 75% target</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="absolute -bottom-8 -right-4 hidden w-64 rounded-xl border border-navy-100 bg-white p-3.5 shadow-card-lg sm:block"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-navy-800">Frontend Developer Intern</p>
                <span className="badge bg-success-50 text-success-700 ring-1 ring-inset ring-success-100">92% match</span>
              </div>
              <p className="mt-1 text-xs text-navy-400">TechNova · Bangalore · ₹18,000/month</p>
            </motion.div>

            <div className="absolute -right-6 -top-6 -z-10 h-40 w-40 rounded-full bg-brand-100/60 blur-3xl" />
            <div className="absolute -bottom-8 -left-8 -z-10 h-40 w-40 rounded-full bg-success-100/50 blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-navy-100 bg-surface py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div {...fadeUp()} className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy-900">How It Works</h2>
            <p className="mt-3 text-navy-500">Five steps from a raw skill profile to a tracked placement offer.</p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div key={step.num} {...fadeUp(i * 0.08)} className="card p-6">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-navy-100">{step.num}</span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50">
                    <step.icon size={19} className="text-brand-600" />
                  </div>
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy-800">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-navy-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="border-t border-navy-100 bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div {...fadeUp()} className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy-900">One platform, eight capabilities</h2>
            <p className="mt-3 text-navy-500">Everything needed to close the engineering skill, internship and career gap.</p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((c, i) => (
              <motion.div key={c.title} {...fadeUp((i % 4) * 0.06)} whileHover={{ y: -3 }} className="card p-5 transition-shadow hover:shadow-card-lg">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50">
                  <c.icon size={19} className="text-brand-600" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-navy-800">{c.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-navy-500">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STAKEHOLDERS */}
      <section className="border-t border-navy-100 bg-surface py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div {...fadeUp()} className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-navy-900">Built for four stakeholders</h2>
            <p className="mt-3 text-navy-500">Explore any workspace in demo mode — no login required. All data shown is illustrative demo data.</p>
          </motion.div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {STAKEHOLDER_PILLS.map((p) => (
              <span key={p} className="badge bg-navy-50 text-navy-500 ring-1 ring-inset ring-navy-100">{p}</span>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STAKEHOLDERS.map((s, i) => (
              <motion.div key={s.title} {...fadeUp(i * 0.08)} className="card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-900">
                  <s.icon size={20} className="text-white" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-navy-800">{s.title}</h3>
                <ul className="mt-3 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-navy-500">
                      <ChevronRight size={14} className="mt-0.5 shrink-0 text-brand-500" />
                      {p}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    loginAsDemo(s.role)
                    navigate('/dashboard')
                  }}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700"
                >
                  Open workspace <ArrowRight size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
