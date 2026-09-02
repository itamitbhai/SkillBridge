import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import FilterBar from '../../components/FilterBar'
import ChallengeCard from '../../components/rnd/ChallengeCard'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import { rndChallenges } from '../../data/rndChallenges'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'

const CATEGORIES = ['Research & Development', 'Quality & Standardisation', 'Digital Health', 'Pharmaceutical R&D', 'Medical Devices']
const STATUSES = ['Open', 'In Progress', 'Closed']

export default function RndChallenges() {
  const { role, user } = useAuth()
  const { toast } = useToast()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')
  const [postOpen, setPostOpen] = useState(false)
  const [form, setForm] = useState({ title: '', problem: '', skills: '', budget: '', duration: '' })

  const filtered = useMemo(() => {
    return rndChallenges.filter((c) => {
      if (category !== 'all' && c.category !== category) return false
      if (status !== 'all' && c.status !== status) return false
      if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [search, category, status])

  const handlePost = (e) => {
    e.preventDefault()
    setPostOpen(false)
    setForm({ title: '', problem: '', skills: '', budget: '', duration: '' })
    toast({ type: 'success', title: 'Challenge posted', description: 'Your R&D problem statement is now visible to academia.' })
  }

  return (
    <div>
      <PageHeader
        title="Industry R&D Challenges"
        subtitle="Real-world problem statements open for academia collaboration."
        actions={role === 'industry' ? <Button icon={Plus} onClick={() => setPostOpen(true)}>Post Challenge</Button> : undefined}
      />

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search R&D challenges..."
        filters={[
          { label: 'All Categories', value: category, options: CATEGORIES, onChange: setCategory },
          { label: 'All Statuses', value: status, options: STATUSES, onChange: setStatus },
        ]}
        onClear={() => { setCategory('all'); setStatus('all'); setSearch('') }}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <ChallengeCard key={c.id} challenge={c} />
        ))}
      </div>

      <Modal open={postOpen} onClose={() => setPostOpen(false)} title="Post R&D Challenge" size="lg" footer={
        <>
          <Button variant="secondary" onClick={() => setPostOpen(false)}>Cancel</Button>
          <Button onClick={handlePost}>Post Challenge</Button>
        </>
      }>
        <form onSubmit={handlePost} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-navy-600">Title</label>
            <input className="input" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="e.g. AI-Based Herbal Standardisation" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-navy-600">Problem Statement</label>
            <textarea rows={4} className="input resize-none" value={form.problem} onChange={(e) => setForm((f) => ({ ...f, problem: e.target.value }))} placeholder="Describe the research problem..." />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <label className="mb-1.5 block text-xs font-semibold text-navy-600">Required Skills</label>
              <input className="input" value={form.skills} onChange={(e) => setForm((f) => ({ ...f, skills: e.target.value }))} placeholder="Comma separated" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-navy-600">Budget (₹)</label>
              <input className="input" value={form.budget} onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))} placeholder="500000" />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}
