import { useNavigate } from 'react-router-dom'
import { FolderKanban } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import Card from '../../components/ui/Card'
import { statusStyle } from '../../utils/badgeStyles'
import { formatDate } from '../../utils/format'
import { collaborations } from '../../data/collaborations'
import clsx from 'clsx'

export default function CollaborationList() {
  const navigate = useNavigate()

  return (
    <div>
      <PageHeader title="Research Collaboration" subtitle="Active and past academia-industry collaboration workspaces." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {collaborations.map((c) => (
          <Card key={c.id} className="cursor-pointer transition-shadow hover:shadow-card-lg" onClick={() => navigate(`/collaboration/${c.id}`)}>
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50">
                <FolderKanban size={18} className="text-brand-600" />
              </div>
              <span className={clsx('badge', statusStyle(c.status))}>{c.status}</span>
            </div>
            <p className="mt-3.5 text-sm font-semibold text-navy-800">{c.project}</p>
            <p className="mt-0.5 text-xs text-navy-400">{c.institution} × {c.industry}</p>
            <div className="mt-4 flex items-center justify-between border-t border-navy-100 pt-3.5 text-xs text-navy-500">
              <span>{c.members.length} members · {c.milestones.length} milestones</span>
              <span>Target: {formatDate(c.targetEndDate)}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
