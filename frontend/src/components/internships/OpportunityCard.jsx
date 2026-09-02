import { Sparkles, MapPin } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import { Pill } from '../ui/Badge'
import CompanyLogo from '../CompanyLogo'
import CircularMatchGauge from '../dashboard/CircularMatchGauge'

export function openingsFor(internship) {
  return (Math.round(internship.stipend / 2500) % 9) + 2
}

export function postedDaysAgoFor(internship) {
  return (internship.id.charCodeAt(internship.id.length - 1) % 6) + 1
}

export default function OpportunityCard({ internship, match, onView, onApply }) {
  return (
    <Card className="flex flex-col gap-4 sm:flex-row sm:items-start">
      <CompanyLogo text={internship.company} />

      <div className="min-w-0 flex-1">
        <button onClick={onView} className="text-left">
          <p className="text-sm font-semibold text-navy-800 hover:text-brand-600">{internship.title}</p>
        </button>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-navy-400">
          {internship.company} · <MapPin size={11} />{internship.location}
        </p>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-navy-400">
          <span>{internship.duration}</span>
          <span>·</span>
          <span>₹{internship.stipend.toLocaleString('en-IN')}/month</span>
          <span>·</span>
          <span>Posted {postedDaysAgoFor(internship)} days ago</span>
          <span>·</span>
          <span>{openingsFor(internship)} openings</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {internship.skills.slice(0, 3).map((s) => <Pill key={s}>{s}</Pill>)}
        </div>
        <div className="mt-4 flex items-center gap-2.5">
          <Button variant="secondary" size="sm" onClick={onView}>View Details</Button>
          <Button size="sm" iconRight={Sparkles} onClick={onApply}>Apply</Button>
          <span className="ml-auto hidden items-center gap-1 text-[11px] font-medium text-brand-500 sm:flex">
            <Sparkles size={11} /> AI ranked
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-center sm:pl-2">
        <CircularMatchGauge score={match} size={64} />
      </div>
    </Card>
  )
}
