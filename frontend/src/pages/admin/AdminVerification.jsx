import { useState } from 'react'
import clsx from 'clsx'
import PageHeader from '../../components/PageHeader'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import { useToast } from '../../hooks/useToast'
import { institutions } from '../../data/institutions'
import { industries } from '../../data/industries'
import { internships } from '../../data/internships'
import { technologies } from '../../data/technologies'
import { ShieldCheck } from 'lucide-react'

const TABS = [
  { id: 'institutions', label: 'Institutions' },
  { id: 'industries', label: 'Industries' },
  { id: 'internships', label: 'Internships' },
  { id: 'technologies', label: 'Technologies' },
]

function buildQueue() {
  return {
    institutions: institutions.filter((i) => !i.verified).map((i) => ({ id: i.id, title: i.name, meta: `${i.location}, ${i.state} · ${i.type}` })),
    industries: industries.filter((i) => !i.verified).map((i) => ({ id: i.id, title: i.name, meta: `${i.location}, ${i.state} · ${i.industryType}` })),
    internships: internships.filter((i) => !i.verified).map((i) => ({ id: i.id, title: i.title, meta: `${i.company} · ${i.location}` })),
    technologies: technologies.filter((t) => t.patentStatus === 'Not Filed').map((t) => ({ id: t.id, title: t.title, meta: `${t.institution} · ${t.category}` })),
  }
}

export default function AdminVerification() {
  const [tab, setTab] = useState('institutions')
  const [queue, setQueue] = useState(buildQueue)
  const { toast } = useToast()

  const items = queue[tab]

  const handleAction = (id, action) => {
    setQueue((prev) => ({ ...prev, [tab]: prev[tab].filter((item) => item.id !== id) }))
    toast({
      type: action === 'approve' ? 'success' : 'info',
      title: action === 'approve' ? 'Approved' : action === 'reject' ? 'Rejected' : 'Changes requested',
      description: `Item ${id} has been ${action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'sent back for changes'}.`,
    })
  }

  return (
    <div>
      <PageHeader title="Verification Queue" subtitle="Review and approve pending institutions, industries, internships and technologies." />

      <div className="mb-5 flex gap-2 border-b border-navy-100">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={clsx(
              'border-b-2 px-1 pb-3 text-sm font-semibold transition-colors',
              tab === t.id ? 'border-brand-500 text-brand-700' : 'border-transparent text-navy-400 hover:text-navy-600'
            )}
          >
            {t.label}
            <span className="ml-1.5 rounded-full bg-navy-100 px-1.5 py-0.5 text-[10px] text-navy-500">{queue[t.id].length}</span>
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <EmptyState icon={ShieldCheck} title="Nothing pending" description="All items in this category have been reviewed." />
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Card key={item.id} className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-navy-800">{item.title}</p>
                <p className="text-xs text-navy-400">{item.meta}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => handleAction(item.id, 'changes')}>Request Changes</Button>
                <Button variant="danger" size="sm" onClick={() => handleAction(item.id, 'reject')}>Reject</Button>
                <Button size="sm" onClick={() => handleAction(item.id, 'approve')}>Approve</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
