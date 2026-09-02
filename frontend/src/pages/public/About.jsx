import { Target, ShieldCheck, Sparkles, Handshake } from 'lucide-react'
import { nationalStats } from '../../data/analytics'

const PILLARS = [
  { icon: Target, title: 'The Problem', desc: 'Engineering academic institutions and technology industry operate in silos — skill mismatches, unverified internships and under-commercialised research keep talented students from the right opportunities.' },
  { icon: Sparkles, title: 'The Approach', desc: 'SkillBridge uses explainable AI to map student skills against real industry demand, verify internships end-to-end, and surface R&D and patent opportunities for collaboration.' },
  { icon: ShieldCheck, title: 'Verified by Design', desc: 'Every internship carries institution verification, industry verification, an assigned mentor, duration verification and certificate confirmation before it reaches a student.' },
  { icon: Handshake, title: 'One Connected Ecosystem', desc: 'Students, institutions and industry all operate on the same data — from skill mapping to internships, research, patents and placement.' },
]

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <span className="badge bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-100">About the Platform</span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
          A unified digital ecosystem for engineering academia and industry
        </h1>
        <p className="mt-4 text-base leading-relaxed text-navy-500">
          SkillBridge brings AI-powered skill mapping, verified internships, industry collaboration, R&D challenges
          and technology licensing into one platform for engineering students, institutions and industry partners.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {PILLARS.map((p) => (
          <div key={p.title} className="card p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50">
              <p.icon size={19} className="text-brand-600" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-navy-800">{p.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-navy-500">{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-navy-100 bg-surface p-8">
        <h2 className="text-lg font-semibold text-navy-900">The ecosystem, at a glance</h2>
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { label: 'Registered Students', value: nationalStats.registeredStudents },
            { label: 'Academic Institutions', value: nationalStats.academicInstitutions },
            { label: 'Industry Partners', value: nationalStats.industryPartners },
            { label: 'Verified Internships', value: nationalStats.verifiedInternships },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold text-navy-900">{s.value.toLocaleString('en-IN')}</p>
              <p className="mt-1 text-xs font-medium text-navy-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
