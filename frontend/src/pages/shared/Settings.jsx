import { useState } from 'react'
import { Bell, Shield, Cpu, Save } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import Card, { CardHeader } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? 'bg-brand-500' : 'bg-navy-200'}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  )
}

export default function Settings() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [name, setName] = useState(user?.name || '')
  const [notifs, setNotifs] = useState({ matches: true, applications: true, collaboration: true, digest: true })

  const handleSave = () => {
    toast({ type: 'success', title: 'Settings saved', description: 'Your preferences have been updated.' })
  }

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your profile, notification preferences and platform configuration." />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Profile" subtitle="Your account details" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-navy-600">Full Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="input" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-navy-600">Email</label>
              <input value={user?.email || ''} disabled className="input bg-navy-50 text-navy-400" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-navy-600">Role</label>
              <input value={user?.roleLabel || ''} disabled className="input bg-navy-50 text-navy-400" />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2.5 border-t border-navy-100 pt-5">
            <Bell size={15} className="text-navy-400" />
            <p className="text-sm font-semibold text-navy-800">Notification Preferences</p>
          </div>
          <div className="mt-3 divide-y divide-navy-100">
            {[
              { key: 'matches', label: 'New AI matches', desc: 'Notify when a new high-match opportunity is found' },
              { key: 'applications', label: 'Application status updates', desc: 'Shortlisted, interview, selected or rejected' },
              { key: 'collaboration', label: 'Collaboration activity', desc: 'Milestones, documents and task updates' },
              { key: 'digest', label: 'Weekly digest', desc: 'Summary of platform activity every Monday' },
            ].map((n) => (
              <div key={n.key} className="flex items-center justify-between py-3.5">
                <div>
                  <p className="text-sm font-medium text-navy-700">{n.label}</p>
                  <p className="text-xs text-navy-400">{n.desc}</p>
                </div>
                <Toggle checked={notifs[n.key]} onChange={(v) => setNotifs((prev) => ({ ...prev, [n.key]: v }))} />
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end border-t border-navy-100 pt-5">
            <Button variant="primary" icon={Save} onClick={handleSave}>Save Changes</Button>
          </div>
        </Card>

        <div className="space-y-5">
          <Card>
            <div className="flex items-center gap-2.5">
              <Cpu size={16} className="text-brand-600" />
              <p className="text-sm font-semibold text-navy-800">AI Engine Status</p>
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-navy-500">Matching Engine</span>
                <span className="font-semibold text-navy-800">Heuristic v1.0 (Demo)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-navy-500">Backend Endpoint</span>
                <span className="font-semibold text-navy-400">Not connected</span>
              </div>
            </div>
            <p className="mt-4 rounded-lg bg-surface/70 p-3 text-xs text-navy-500">
              This demo runs on an explainable heuristic model. Connect <code className="rounded bg-navy-100 px-1 py-0.5">POST /api/ai/skill-analysis</code> to switch to the live Python NLP/ML service.
            </p>
          </Card>

          <Card>
            <div className="flex items-center gap-2.5">
              <Shield size={16} className="text-brand-600" />
              <p className="text-sm font-semibold text-navy-800">Access & Security</p>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-navy-500">
              You are signed in via demo access for evaluation purposes. Production deployment enforces role-based
              access control across Student, Institution, Industry and Admin roles.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
