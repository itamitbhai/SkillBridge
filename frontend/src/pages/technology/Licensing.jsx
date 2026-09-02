import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import FilterBar from '../../components/FilterBar'
import Card from '../../components/ui/Card'
import { statusStyle } from '../../utils/badgeStyles'
import { formatDate } from '../../utils/format'
import { licensingRequests } from '../../data/licensingRequests'
import clsx from 'clsx'

const STATUSES = ['Submitted', 'Under Review', 'Negotiation', 'Approved', 'Rejected']

export default function Licensing() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('all')

  const filtered = status === 'all' ? licensingRequests : licensingRequests.filter((l) => l.status === status)

  return (
    <div>
      <PageHeader title="Licensing Requests" subtitle="Track the status of your technology licensing requests." />

      <FilterBar filters={[{ label: 'All Statuses', value: status, options: STATUSES, onChange: setStatus }]} onClear={() => setStatus('all')} />

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-navy-100 text-left text-xs font-semibold uppercase tracking-wide text-navy-400">
                <th className="px-5 py-3">Request ID</th>
                <th className="px-3 py-3">Technology</th>
                <th className="px-3 py-3">Company</th>
                <th className="px-3 py-3">Requested</th>
                <th className="px-3 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {filtered.map((l) => (
                <tr key={l.id} onClick={() => navigate(`/technology-marketplace/${l.technologyId}`)} className="cursor-pointer hover:bg-navy-50/60">
                  <td className="whitespace-nowrap px-5 py-3.5 font-semibold text-brand-600">{l.id}</td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-navy-700">{l.technologyTitle}</td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-navy-500">{l.company}</td>
                  <td className="whitespace-nowrap px-3 py-3.5 text-navy-500">{formatDate(l.requestedAt)}</td>
                  <td className="whitespace-nowrap px-3 py-3.5"><span className={clsx('badge', statusStyle(l.status))}>{l.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
