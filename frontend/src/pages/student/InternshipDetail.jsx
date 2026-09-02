import { useEffect, useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, MapPin, Clock, IndianRupee, User2, Calendar, ShieldAlert, FileQuestion } from 'lucide-react'
import Card, { CardHeader } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import { Pill } from '../../components/ui/Badge'
import { VerificationChecklist, VerifiedPill } from '../../components/VerificationBadge'
import MatchBadge from '../../components/dashboard/MatchBadge'
import ApplyModal from '../../components/internships/ApplyModal'
import { internshipById } from '../../data/internships'
import { demoStudent } from '../../data/students'
import { matchStudentToInternship } from '../../services/aiService'
import { formatDate } from '../../utils/format'

export default function InternshipDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [applyOpen, setApplyOpen] = useState(false)
  const internship = internshipById[id]

  useEffect(() => {
    if (searchParams.get('apply') === '1') setApplyOpen(true)
  }, [searchParams])

  if (!internship) {
    return (
      <EmptyState
        icon={FileQuestion}
        title={`Internship ${id} not found`}
        action={<Button variant="secondary" onClick={() => navigate('/marketplace/internships')}>Back to Marketplace</Button>}
      />
    )
  }

  const match = matchStudentToInternship(demoStudent, internship)

  return (
    <div>
      <button onClick={() => navigate('/marketplace/internships')} className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-navy-500 hover:text-navy-800">
        <ArrowLeft size={15} /> Back to Marketplace
      </button>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy-900">{internship.title}</h1>
          <p className="mt-1 text-sm text-navy-500">{internship.company} · {internship.location}, {internship.state}</p>
        </div>
        <div className="flex items-center gap-3">
          <VerifiedPill verified={internship.verified} />
          <MatchBadge score={match.score} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card>
            <CardHeader title="Overview" />
            <p className="text-sm leading-relaxed text-navy-600">{internship.description}</p>
            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-navy-100 pt-5 sm:grid-cols-4">
              <Detail icon={Clock} label="Duration" value={internship.duration} />
              <Detail icon={IndianRupee} label="Stipend" value={`₹${internship.stipend.toLocaleString('en-IN')}/mo`} />
              <Detail icon={MapPin} label="Work Mode" value={internship.workMode} />
              <Detail icon={Calendar} label="Deadline" value={formatDate(internship.deadline)} />
            </div>
          </Card>

          <Card>
            <CardHeader title="Responsibilities" />
            <ul className="space-y-2">
              {internship.responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-navy-600">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-navy-300" />
                  {r}
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader title="Learning Outcomes" />
            <ul className="space-y-2">
              {internship.learningOutcomes.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-navy-600">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-navy-300" />
                  {r}
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader title="Verification Status" />
            <VerificationChecklist verification={internship.verification} />
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Required Skills" />
            <div className="flex flex-wrap gap-1.5">
              {internship.skills.map((s) => <Pill key={s}>{s}</Pill>)}
            </div>
            {match.missingSkills.length > 0 && (
              <div className="mt-4 rounded-lg bg-critical-50 p-3">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-critical-700"><ShieldAlert size={13} /> Skill gaps for you</p>
                <p className="mt-1 text-xs text-critical-600">{match.missingSkills.join(', ')}</p>
              </div>
            )}
          </Card>

          <Card>
            <CardHeader title="Eligibility" />
            <p className="text-sm text-navy-600">{internship.eligibility}</p>
          </Card>

          <Card>
            <CardHeader title="Supervisor" action={<User2 size={16} className="text-navy-400" />} />
            <p className="text-sm text-navy-600">{internship.supervisor}</p>
          </Card>

          <Card>
            <CardHeader title="Why this match" />
            <ul className="space-y-1.5">
              {match.why.map((w) => (
                <li key={w} className="flex items-start gap-2 text-xs text-navy-500">
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
                  {w}
                </li>
              ))}
            </ul>
          </Card>

          <Button className="w-full" size="lg" onClick={() => setApplyOpen(true)}>Apply Now</Button>
        </div>
      </div>

      <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} internship={internship} />
    </div>
  )
}

function Detail({ icon: Icon, label, value }) {
  return (
    <div>
      <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-navy-400"><Icon size={12} />{label}</p>
      <p className="mt-1 text-sm font-semibold text-navy-800">{value}</p>
    </div>
  )
}
