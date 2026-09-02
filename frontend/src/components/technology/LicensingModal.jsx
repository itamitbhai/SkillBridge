import { useState } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import Stepper from '../ui/Stepper'
import { useToast } from '../../hooks/useToast'
import { CheckCircle2 } from 'lucide-react'

const STEPS = ['Technology', 'Company Info', 'Intended Use', 'Proposal', 'Submit']

export default function LicensingModal({ open, onClose, technology }) {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ company: '', contact: '', email: '', intendedUse: '', proposal: '' })
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setStep(0)
      setSubmitted(false)
      setForm({ company: '', contact: '', email: '', intendedUse: '', proposal: '' })
    }, 200)
  }

  const handleSubmit = () => {
    setSubmitted(true)
    setStep(4)
    toast({ type: 'success', title: 'Licensing request submitted', description: `Your request for "${technology?.title}" has been sent for review.` })
  }

  if (!technology) return null

  return (
    <Modal open={open} onClose={handleClose} title="Request Licensing" size="lg">
      <Stepper steps={STEPS} activeIndex={step} />

      {step === 0 && (
        <div className="space-y-3">
          <div className="rounded-lg bg-surface/70 p-4">
            <p className="text-sm font-semibold text-navy-800">{technology.title}</p>
            <p className="mt-1 text-xs text-navy-500">{technology.institution} · TRL {technology.trl} · {technology.category}</p>
          </div>
          <p className="text-sm text-navy-500">{technology.description}</p>
          <div className="flex justify-end pt-2">
            <Button onClick={() => setStep(1)}>Continue</Button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-navy-600">Company Name</label>
            <input className="input" value={form.company} onChange={update('company')} placeholder="Your company name" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-navy-600">Contact Person</label>
            <input className="input" value={form.contact} onChange={update('contact')} placeholder="Full name" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-navy-600">Email</label>
            <input type="email" className="input" value={form.email} onChange={update('email')} placeholder="you@company.com" />
          </div>
          <div className="flex justify-between pt-2">
            <Button variant="secondary" onClick={() => setStep(0)}>Back</Button>
            <Button onClick={() => setStep(2)}>Continue</Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-navy-600">Intended Use</label>
            <textarea rows={4} className="input resize-none" value={form.intendedUse} onChange={update('intendedUse')} placeholder="Describe how you intend to use this technology..." />
          </div>
          <div className="flex justify-between pt-2">
            <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
            <Button onClick={() => setStep(3)}>Continue</Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-navy-600">Commercial Proposal</label>
            <textarea rows={4} className="input resize-none" value={form.proposal} onChange={update('proposal')} placeholder="Outline your proposed licensing terms (exclusive/non-exclusive, royalty, upfront fee, territory)..." />
          </div>
          <div className="flex justify-between pt-2">
            <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
            <Button onClick={handleSubmit}>Submit Request</Button>
          </div>
        </div>
      )}

      {step === 4 && submitted && (
        <div className="flex flex-col items-center py-6 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-success-50">
            <CheckCircle2 size={24} className="text-success-600" />
          </div>
          <p className="text-sm font-semibold text-navy-800">Request Submitted</p>
          <p className="mt-1.5 max-w-sm text-sm text-navy-500">
            Status: <span className="font-semibold text-brand-600">Submitted</span> — the technology owner will review your proposal and respond via email.
          </p>
          <Button className="mt-5" onClick={handleClose}>Done</Button>
        </div>
      )}
    </Modal>
  )
}
