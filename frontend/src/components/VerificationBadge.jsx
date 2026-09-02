import { CheckCircle2, Circle } from 'lucide-react'
import clsx from 'clsx'

const LABELS = {
  institutionVerified: 'Institution Verified',
  industryVerified: 'Industry Verified',
  supervisorAssigned: 'Mentor Assigned',
  durationVerified: 'Internship Duration Verified',
  certificateProvided: 'Certificate Provided',
}

export function VerificationChecklist({ verification }) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(LABELS).map(([key, label]) => {
        const passed = !!verification?.[key]
        return (
          <span
            key={key}
            className={clsx(
              'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium',
              passed ? 'bg-success-50 text-success-700' : 'bg-navy-50 text-navy-400'
            )}
          >
            {passed ? <CheckCircle2 size={13} /> : <Circle size={13} />}
            {label}
          </span>
        )
      })}
    </div>
  )
}

export function VerifiedPill({ verified }) {
  if (!verified) {
    return <span className="badge bg-navy-50 text-navy-400 ring-1 ring-inset ring-navy-100">Unverified</span>
  }
  return (
    <span className="badge bg-success-50 text-success-700 ring-1 ring-inset ring-success-100">
      <CheckCircle2 size={12} />
      Verified
    </span>
  )
}
