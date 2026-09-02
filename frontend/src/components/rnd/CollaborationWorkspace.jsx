import { CheckCircle2, Circle, FileText, Users2, Target, ListChecks } from 'lucide-react'
import Card, { CardHeader } from '../ui/Card'
import { Pill } from '../ui/Badge'
import { statusStyle } from '../../utils/badgeStyles'
import { formatDate } from '../../utils/format'
import clsx from 'clsx'

export default function CollaborationWorkspace({ collaboration }) {
  return (
    <div className="space-y-5">
      <Card>
        <CardHeader
          title={collaboration.project}
          subtitle={`${collaboration.institution} × ${collaboration.industry}`}
          action={<span className={clsx('badge', statusStyle(collaboration.status))}>{collaboration.status}</span>}
        />
        <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <div>
            <p className="text-[11px] font-medium text-navy-400">Start Date</p>
            <p className="mt-1 font-semibold text-navy-800">{formatDate(collaboration.startDate)}</p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-navy-400">Target Completion</p>
            <p className="mt-1 font-semibold text-navy-800">{formatDate(collaboration.targetEndDate)}</p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-navy-400">Members</p>
            <p className="mt-1 font-semibold text-navy-800">{collaboration.members.length}</p>
          </div>
          <div>
            <p className="text-[11px] font-medium text-navy-400">Milestones</p>
            <p className="mt-1 font-semibold text-navy-800">{collaboration.milestones.length}</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Members" action={<Users2 size={16} className="text-navy-400" />} />
          <div className="space-y-3">
            {collaboration.members.map((m) => (
              <div key={m.name} className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-100 text-xs font-bold text-navy-600">
                  {m.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-navy-800">{m.name}</p>
                  <p className="truncate text-xs text-navy-400">{m.role} · {m.org}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Milestones" action={<Target size={16} className="text-navy-400" />} />
          <div className="space-y-3">
            {collaboration.milestones.map((m) => (
              <div key={m.title} className="flex items-start gap-3">
                {m.status === 'Completed' ? (
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success-500" />
                ) : (
                  <Circle size={16} className="mt-0.5 shrink-0 text-navy-300" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-navy-800">{m.title}</p>
                  <p className="text-xs text-navy-400">Due {formatDate(m.due)} · {m.status}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Documents" action={<FileText size={16} className="text-navy-400" />} />
          <div className="space-y-2.5">
            {collaboration.documents.map((d) => (
              <div key={d.name} className="flex items-center justify-between rounded-lg border border-navy-100 px-3.5 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-navy-700">{d.name}</p>
                  <p className="text-xs text-navy-400">{d.uploadedBy} · {formatDate(d.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Open Tasks" action={<ListChecks size={16} className="text-navy-400" />} />
          {collaboration.tasks.length === 0 ? (
            <p className="text-sm text-navy-400">No open tasks — all caught up.</p>
          ) : (
            <div className="space-y-2.5">
              {collaboration.tasks.map((t) => (
                <div key={t.title} className="flex items-center justify-between rounded-lg border border-navy-100 px-3.5 py-2.5">
                  <div>
                    <p className="text-sm font-medium text-navy-700">{t.title}</p>
                    <p className="text-xs text-navy-400">Assigned to {t.assignee}</p>
                  </div>
                  <span className={clsx('badge', statusStyle(t.status))}>{t.status}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Card>
        <CardHeader title="Deliverables" />
        <div className="flex flex-wrap gap-2">
          {collaboration.deliverables.map((d) => (
            <Pill key={d}>{d}</Pill>
          ))}
        </div>
      </Card>
    </div>
  )
}
