import { useNavigate } from 'react-router-dom'
import Card, { CardHeader } from '../ui/Card'
import Button from '../ui/Button'
import { StatusBadge } from '../ui/Badge'

export default function ApplicationPipelineWidget({ applications }) {
  const navigate = useNavigate()

  return (
    <Card>
      <CardHeader title="Application Pipeline" subtitle={`Live status across ${applications.length} applications`} />
      <div className="space-y-3.5">
        {applications.map((a) => (
          <div key={a.id} className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-navy-800">{a.company}</p>
              <p className="truncate text-xs text-navy-400">{a.internshipTitle}</p>
            </div>
            <StatusBadge status={a.status} className="shrink-0" />
          </div>
        ))}
      </div>
      <Button variant="secondary" className="mt-4 w-full" onClick={() => navigate('/applications')}>
        Track Applications
      </Button>
    </Card>
  )
}
