import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import Stepper from '../ui/Stepper'
import { useToast } from '../../hooks/useToast'
import { useAuth } from '../../hooks/useAuth'

const STEPS = ['Profile', 'Eligibility', 'Documents', 'Application', 'Submitted']

export default function ApplyModal({ open, onClose, internship, onSubmitted }) {
  const [step, setStep] = useState(0)
  const [note, setNote] = useState('')
  const [applicationId, setApplicationId] = useState(null)
  const { user } = useAuth()
  const { toast } = useToast()

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setStep(0)
      setNote('')
      setApplicationId(null)
    }, 200)
  }

  const handleSubmit = () => {
    const id = `APP-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
    setApplicationId(id)
    setStep(4)
    toast({ type: 'success', title: 'Application submitted', description: `Application ${id} sent to ${internship.company}.` })
    onSubmitted?.(id)
  }

  if (!internship) return null

  return (
    <Modal open={open} onClose={handleClose} title={`Apply — ${internship.title}`} size="lg">
      <Stepper steps={STEPS} activeIndex={step} />

      {step === 0 && (
        <div className="space-y-3">
          <div className="rounded-lg bg-surface/70 p-4 text-sm">
            <p className="font-semibold text-navy-800">{user?.name}</p>
            <p className="mt-1 text-navy-500">{user?.institution} · {user?.discipline}</p>
          </div>
          <p className="text-xs text-navy-400">Your skill profile and resume will be shared with {internship.company} as part of this application.</p>
          <div className="flex justify-end pt-2">
            <Button onClick={() => setStep(1)}>Continue</Button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-navy-800">Eligibility</p>
          <p className="text-sm text-navy-500">{internship.eligibility}</p>
          <label className="flex items-center gap-2 text-sm text-navy-600">
            <input type="checkbox" defaultChecked className="h-3.5 w-3.5 rounded border-navy-300 text-brand-500 focus:ring-brand-500" />
            I confirm I meet the eligibility criteria for this internship.
          </label>
          <div className="flex justify-between pt-2">
            <Button variant="secondary" onClick={() => setStep(0)}>Back</Button>
            <Button onClick={() => setStep(2)}>Continue</Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-navy-800">Documents</p>
          <div className="rounded-lg border border-dashed border-navy-200 p-5 text-center text-sm text-navy-400">
            Resume, institution ID card and NOC will be auto-attached from your Skill Profile.
          </div>
          <div className="flex justify-between pt-2">
            <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
            <Button onClick={() => setStep(3)}>Continue</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3">
          <label className="mb-1.5 block text-xs font-semibold text-navy-600">Note to the recruiter (optional)</label>
          <textarea rows={4} className="input resize-none" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Share anything relevant to your application..." />
          <div className="flex justify-between pt-2">
            <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
            <Button onClick={handleSubmit}>Submit Application</Button>
          </div>
        </div>
      )}

      {step === 4 && applicationId && (
        <div className="flex flex-col items-center py-6 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success-50">
            <CheckCircle2 size={24} className="text-success-600" />
          </div>
          <p className="text-sm font-semibold text-navy-800">Application ID: {applicationId}</p>
          <p className="mt-1.5 text-sm text-navy-500">
            Status: <span className="font-semibold text-brand-600">Applied</span>
          </p>
          <Button className="mt-5" onClick={handleClose}>Done</Button>
        </div>
      )}
    </Modal>
  )
}
