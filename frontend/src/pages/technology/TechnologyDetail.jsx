import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Gauge, Landmark, User2, FileQuestion } from 'lucide-react'
import Card, { CardHeader } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import { Pill } from '../../components/ui/Badge'
import { statusStyle } from '../../utils/badgeStyles'
import LicensingModal from '../../components/technology/LicensingModal'
import { technologyById } from '../../data/technologies'
import { useAuth } from '../../hooks/useAuth'
import clsx from 'clsx'

export default function TechnologyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { role } = useAuth()
  const [licenseOpen, setLicenseOpen] = useState(false)
  const technology = technologyById[id]

  if (!technology) {
    return (
      <EmptyState icon={FileQuestion} title={`Technology ${id} not found`} action={<Button variant="secondary" onClick={() => navigate('/technology-marketplace')}>Back to Marketplace</Button>} />
    )
  }

  return (
    <div>
      <button onClick={() => navigate('/technology-marketplace')} className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-navy-500 hover:text-navy-800">
        <ArrowLeft size={15} /> Back to Marketplace
      </button>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy-900">{technology.title}</h1>
          <p className="mt-1 text-sm text-navy-500">{technology.institution}</p>
        </div>
        <span className={clsx('badge', statusStyle(technology.licensingStatus))}>{technology.licensingStatus}</span>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card>
            <CardHeader title="Description" />
            <p className="text-sm leading-relaxed text-navy-600">{technology.description}</p>
          </Card>
          <Card>
            <CardHeader title="Potential Applications" />
            <div className="flex flex-wrap gap-2">
              {technology.applicationArea.map((a) => <Pill key={a}>{a}</Pill>)}
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Details" />
            <div className="space-y-3 text-sm">
              <Row icon={Landmark} label="Institution" value={technology.institution} />
              <Row icon={User2} label="Inventor" value={technology.inventor} />
              <Row icon={Gauge} label="TRL Level" value={technology.trl} />
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-navy-400">Patent Status</span>
                <span className={clsx('badge', statusStyle(technology.patentStatus))}>{technology.patentStatus}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-navy-400">Category</span>
                <Pill>{technology.category}</Pill>
              </div>
            </div>
          </Card>

          {(role === 'industry' || role === 'admin') && technology.licensingStatus !== 'Licensed' && (
            <Button className="w-full" size="lg" onClick={() => setLicenseOpen(true)}>Request Licensing</Button>
          )}
        </div>
      </div>

      <LicensingModal open={licenseOpen} onClose={() => setLicenseOpen(false)} technology={technology} />
    </div>
  )
}

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-1.5 text-navy-400"><Icon size={13} />{label}</span>
      <span className="font-medium text-navy-800">{value}</span>
    </div>
  )
}
