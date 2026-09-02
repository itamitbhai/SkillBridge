import { useState } from 'react'
import { CheckCircle2, Info, AlertTriangle, BellOff } from 'lucide-react'
import clsx from 'clsx'
import PageHeader from '../../components/PageHeader'
import Card from '../../components/ui/Card'
import EmptyState from '../../components/ui/EmptyState'
import { notifications as initialNotifications } from '../../data/notifications'
import { timeAgo } from '../../utils/format'

const ICONS = {
  success: { Icon: CheckCircle2, color: 'text-success-600', bg: 'bg-success-50' },
  info: { Icon: Info, color: 'text-brand-600', bg: 'bg-brand-50' },
  warning: { Icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-50' },
}

export default function Notifications() {
  const [items, setItems] = useState(initialNotifications)
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'unread' ? items.filter((n) => !n.read) : items

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })))

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle="Stay updated on applications, matches, collaborations and platform activity."
        actions={
          <div className="flex gap-2">
            <button onClick={() => setFilter('all')} className={clsx('rounded-lg border px-3.5 py-2 text-xs font-semibold', filter === 'all' ? 'border-brand-200 bg-brand-50 text-brand-700' : 'border-navy-100 text-navy-500')}>All</button>
            <button onClick={() => setFilter('unread')} className={clsx('rounded-lg border px-3.5 py-2 text-xs font-semibold', filter === 'unread' ? 'border-brand-200 bg-brand-50 text-brand-700' : 'border-navy-100 text-navy-500')}>Unread</button>
            <button onClick={markAllRead} className="rounded-lg border border-navy-100 px-3.5 py-2 text-xs font-semibold text-navy-500 hover:bg-navy-50">Mark all read</button>
          </div>
        }
      />

      {filtered.length === 0 ? (
        <EmptyState icon={BellOff} title="You're all caught up" description="No notifications match this filter." />
      ) : (
        <div className="space-y-3">
          {filtered.map((n) => {
            const cfg = ICONS[n.type] || ICONS.info
            return (
              <Card key={n.id} className={clsx('flex gap-4', !n.read && 'ring-1 ring-inset ring-brand-100')}>
                <div className={clsx('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', cfg.bg)}>
                  <cfg.Icon size={18} className={cfg.color} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-navy-800">{n.title}</p>
                    <span className="shrink-0 text-xs text-navy-400">{timeAgo(n.time)}</span>
                  </div>
                  <p className="mt-1 text-sm text-navy-500">{n.message}</p>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
