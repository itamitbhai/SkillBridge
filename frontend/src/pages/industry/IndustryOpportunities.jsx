import { useMemo, useState } from 'react'
import { Plus, Users2, MapPin, Clock } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import Card, { CardHeader } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import MatchBadge from '../../components/dashboard/MatchBadge'
import { VerifiedPill } from '../../components/VerificationBadge'
import { internships } from '../../data/internships'
import { applications } from '../../data/applications'
import { students } from '../../data/students'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import { matchCandidateToIndustry } from '../../services/aiService'
import { DISCIPLINES } from '../../data/skillTaxonomy'

export default function IndustryOpportunities() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [postings, setPostings] = useState(() => internships.filter((i) => i.company === user?.company))
  const [createOpen, setCreateOpen] = useState(false)
  const [candidatesFor, setCandidatesFor] = useState(null)
  const [form, setForm] = useState({ title: '', description: '', skills: '', discipline: DISCIPLINES[0], location: '', duration: '' })

  const applicationCounts = useMemo(() => {
    const counts = {}
    applications.forEach((a) => { counts[a.internshipId] = (counts[a.internshipId] || 0) + 1 })
    return counts
  }, [])

  const handleCreate = (e) => {
    e.preventDefault()
    if (!form.title.trim()) {
      toast({ type: 'error', title: 'Title required', description: 'Please enter an opportunity title.' })
      return
    }
    const newPosting = {
      id: `INT-NEW-${postings.length + 1}`,
      title: form.title,
      company: user?.company,
      companyId: 'me',
      discipline: form.discipline,
      location: form.location || 'Remote',
      state: '',
      duration: form.duration || '3 Months',
      stipend: 12000,
      paid: true,
      workMode: 'On-site',
      skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
      deadline: '2026-12-01',
      supervisor: user?.name,
      description: form.description,
      responsibilities: [],
      eligibility: 'As specified',
      learningOutcomes: [],
      verified: false,
      verification: { institutionVerified: false, industryVerified: true, supervisorAssigned: true, durationVerified: true, certificateProvided: false },
    }
    setPostings((prev) => [newPosting, ...prev])
    setCreateOpen(false)
    setForm({ title: '', description: '', skills: '', discipline: DISCIPLINES[0], location: '', duration: '' })
    toast({ type: 'success', title: 'Opportunity posted', description: 'AI is now matching candidates against your requirements.' })
  }

  const topCandidates = candidatesFor ? matchCandidateToIndustry(students, candidatesFor).slice(0, 5) : []

  return (
    <div>
      <PageHeader
        title="Industry Opportunities"
        subtitle="Manage your internship postings and review AI-ranked candidates."
        actions={<Button icon={Plus} onClick={() => setCreateOpen(true)}>Post Opportunity</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {postings.map((p) => (
          <Card key={p.id} className="flex h-full flex-col">
            <div className="flex items-start justify-between">
              <p className="text-sm font-semibold text-navy-800">{p.title}</p>
              <VerifiedPill verified={p.verified} />
            </div>
            <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-navy-500">
              <span className="flex items-center gap-1"><MapPin size={12} />{p.location}</span>
              <span className="flex items-center gap-1"><Clock size={12} />{p.duration}</span>
            </div>
            <div className="mt-3.5 flex flex-1 items-center gap-1.5 text-xs text-navy-400">
              <Users2 size={13} /> {applicationCounts[p.id] || 0} applications
            </div>
            <Button variant="secondary" size="sm" className="mt-4" onClick={() => setCandidatesFor(p)}>
              View AI-Matched Candidates
            </Button>
          </Card>
        ))}
      </div>

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Post New Opportunity" size="lg" footer={
        <>
          <Button variant="secondary" onClick={() => setCreateOpen(false)}>Cancel</Button>
          <Button onClick={handleCreate}>Post Opportunity</Button>
        </>
      }>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-navy-600">Title</label>
            <input className="input" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="e.g. Backend Developer Intern" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-navy-600">Description</label>
            <textarea rows={3} className="input resize-none" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Describe the role..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-navy-600">Required Skills (comma separated)</label>
              <input className="input" value={form.skills} onChange={(e) => setForm((f) => ({ ...f, skills: e.target.value }))} placeholder="React, Node.js, System Design" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-navy-600">Discipline</label>
              <select className="input" value={form.discipline} onChange={(e) => setForm((f) => ({ ...f, discipline: e.target.value }))}>
                {DISCIPLINES.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-navy-600">Location</label>
              <input className="input" value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} placeholder="City, State" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-navy-600">Duration</label>
              <input className="input" value={form.duration} onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))} placeholder="e.g. 4 Months" />
            </div>
          </div>
        </form>
      </Modal>

      <Modal open={!!candidatesFor} onClose={() => setCandidatesFor(null)} title={`Top Candidate Matches — ${candidatesFor?.title || ''}`} size="lg">
        <div className="space-y-3">
          {topCandidates.map(({ student, score, matchedSkills, missingSkills }) => (
            <div key={student.id} className="flex items-center gap-4 rounded-lg border border-navy-100 p-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-100 text-xs font-bold text-navy-600">
                {student.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-navy-800">{student.name}</p>
                <p className="truncate text-xs text-navy-400">{student.institution}</p>
                {matchedSkills.length > 0 && <p className="mt-0.5 truncate text-xs text-navy-500">Skills: {matchedSkills.join(', ')}</p>}
                {missingSkills.length > 0 && <p className="truncate text-xs text-critical-500">Gap: {missingSkills.join(', ')}</p>}
              </div>
              <MatchBadge score={score} />
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}
