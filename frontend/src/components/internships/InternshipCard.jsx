import { useNavigate } from 'react-router-dom'
import { MapPin, Clock, IndianRupee } from 'lucide-react'
import Card from '../ui/Card'
import { Pill } from '../ui/Badge'
import { VerifiedPill } from '../VerificationBadge'
import MatchBadge from '../dashboard/MatchBadge'

export default function InternshipCard({ internship, matchScore, basePath = '/marketplace/internships' }) {
  const navigate = useNavigate()

  return (
    <Card className="flex h-full flex-col cursor-pointer transition-shadow hover:shadow-card-lg" onClick={() => navigate(`${basePath}/${internship.id}`)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-sm font-bold text-brand-700">
            {internship.company.slice(0, 1)}
          </div>
          <div>
            <p className="text-sm font-semibold text-navy-800">{internship.title}</p>
            <p className="text-xs text-navy-400">{internship.company}</p>
          </div>
        </div>
        <VerifiedPill verified={internship.verified} />
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-navy-500">
        <span className="flex items-center gap-1"><MapPin size={13} />{internship.location}</span>
        <span className="flex items-center gap-1"><Clock size={13} />{internship.duration}</span>
        <span className="flex items-center gap-1"><IndianRupee size={13} />{internship.stipend.toLocaleString('en-IN')}/month</span>
      </div>

      <div className="mt-3.5 flex flex-1 flex-wrap gap-1.5">
        {internship.skills.slice(0, 3).map((s) => (
          <Pill key={s}>{s}</Pill>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-navy-100 pt-3.5">
        {matchScore !== undefined ? <MatchBadge score={matchScore} /> : <span className="text-xs text-navy-400">{internship.workMode}</span>}
        <button
          onClick={(e) => { e.stopPropagation(); navigate(`${basePath}/${internship.id}`) }}
          className="text-xs font-semibold text-brand-600 hover:text-brand-700"
        >
          View Internship →
        </button>
      </div>
    </Card>
  )
}
