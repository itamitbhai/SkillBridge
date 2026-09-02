import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, IndianRupee, Clock, FlaskConical, Handshake, FileQuestion } from 'lucide-react'
import Card, { CardHeader } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import EmptyState from '../../components/ui/EmptyState'
import { Pill } from '../../components/ui/Badge'
import { statusStyle } from '../../utils/badgeStyles'
import { rndChallengeById } from '../../data/rndChallenges'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import clsx from 'clsx'

export default function RndChallengeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { role } = useAuth()
  const { toast } = useToast()
  const [proposeOpen, setProposeOpen] = useState(false)
  const [note, setNote] = useState('')
  const challenge = rndChallengeById[id]

  if (!challenge) {
    return (
      <EmptyState icon={FileQuestion} title={`Challenge ${id} not found`} action={<Button variant="secondary" onClick={() => navigate('/rnd')}>Back to Challenges</Button>} />
    )
  }

  const handlePropose = () => {
    setProposeOpen(false)
    setNote('')
    toast({ type: 'success', title: 'Collaboration proposed', description: `Your proposal for "${challenge.title}" has been sent to ${challenge.company}.` })
    navigate('/collaboration')
  }

  return (
    <div>
      <button onClick={() => navigate('/rnd')} className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-navy-500 hover:text-navy-800">
        <ArrowLeft size={15} /> Back to Challenges
      </button>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy-900">{challenge.title}</h1>
          <p className="mt-1 text-sm text-navy-500">{challenge.company} · {challenge.category}</p>
        </div>
        <span className={clsx('badge', statusStyle(challenge.status))}>{challenge.status}</span>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card>
            <CardHeader title="Problem Statement" action={<FlaskConical size={16} className="text-navy-400" />} />
            <p className="text-sm leading-relaxed text-navy-600">{challenge.problem}</p>
          </Card>
          <Card>
            <CardHeader title="Expected Outcome" />
            <p className="text-sm leading-relaxed text-navy-600">{challenge.expectedOutcome}</p>
          </Card>
          <Card>
            <CardHeader title="Available Resources" />
            <p className="text-sm leading-relaxed text-navy-600">{challenge.availableResources}</p>
          </Card>
          <Card>
            <CardHeader title="Intellectual Property Terms" />
            <p className="text-sm leading-relaxed text-navy-600">{challenge.ipTerms}</p>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Details" />
            <div className="space-y-3 text-sm">
              <Row label="Research Area" value={challenge.researchArea} />
              <Row label="Collaboration Type" value={challenge.collaborationType} />
              <Row label="Expected Duration" value={challenge.expectedDuration} icon={Clock} />
              <Row label="Funding" value={`₹${challenge.budget.toLocaleString('en-IN')}`} icon={IndianRupee} />
            </div>
          </Card>

          <Card>
            <CardHeader title="Required Skills" />
            <div className="flex flex-wrap gap-1.5">
              {challenge.skills.map((s) => <Pill key={s}>{s}</Pill>)}
            </div>
          </Card>

          {(role === 'institution' || role === 'student') && challenge.status === 'Open' && (
            <Button className="w-full" size="lg" icon={Handshake} onClick={() => setProposeOpen(true)}>
              Propose Collaboration
            </Button>
          )}
        </div>
      </div>

      <Modal open={proposeOpen} onClose={() => setProposeOpen(false)} title="Propose Collaboration" footer={
        <>
          <Button variant="secondary" onClick={() => setProposeOpen(false)}>Cancel</Button>
          <Button onClick={handlePropose}>Send Proposal</Button>
        </>
      }>
        <p className="mb-3 text-sm text-navy-500">Your institution will be proposed as a research partner for "{challenge.title}".</p>
        <label className="mb-1.5 block text-xs font-semibold text-navy-600">Proposal Note</label>
        <textarea rows={4} className="input resize-none" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Describe your institution's relevant expertise and proposed approach..." />
      </Modal>
    </div>
  )
}

function Row({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-1.5 text-navy-400">{Icon && <Icon size={13} />}{label}</span>
      <span className="font-medium text-navy-800">{value}</span>
    </div>
  )
}
