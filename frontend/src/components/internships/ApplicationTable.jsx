import { useNavigate } from 'react-router-dom'
import { FileSearch } from 'lucide-react'
import EmptyState from '../ui/EmptyState'
import { statusStyle } from '../../utils/badgeStyles'
import MatchBadge from '../dashboard/MatchBadge'
import { formatDate } from '../../utils/format'
import clsx from 'clsx'

export default function ApplicationTable({ applications }) {
  const navigate = useNavigate()

  if (applications.length === 0) {
    return <EmptyState icon={FileSearch} title="No applications yet" description="Applications you submit will appear here with live status tracking." />
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[820px] text-sm">
        <thead>
          <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase tracking-wide text-navy-400">
            <th className="px-5 py-3">Application ID</th>
            <th className="px-3 py-3">Internship</th>
            <th className="px-3 py-3">Company</th>
            <th className="px-3 py-3">Applied Date</th>
            <th className="px-3 py-3">Match Score</th>
            <th className="px-3 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-100">
          {applications.map((a) => (
            <tr
              key={a.id}
              onClick={() => navigate(`/marketplace/internships/${a.internshipId}`)}
              className="cursor-pointer transition-colors hover:bg-navy-50/60"
            >
              <td className="whitespace-nowrap px-5 py-3.5 font-semibold text-brand-600">{a.id}</td>
              <td className="whitespace-nowrap px-3 py-3.5 text-navy-700">{a.internshipTitle}</td>
              <td className="whitespace-nowrap px-3 py-3.5 text-navy-500">{a.company}</td>
              <td className="whitespace-nowrap px-3 py-3.5 text-navy-500">{formatDate(a.appliedAt)}</td>
              <td className="whitespace-nowrap px-3 py-3.5"><MatchBadge score={a.matchScore} size="sm" /></td>
              <td className="whitespace-nowrap px-3 py-3.5">
                <span className={clsx('badge', statusStyle(a.status))}>{a.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
