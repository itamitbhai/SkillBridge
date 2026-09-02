import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import FilterBar from '../../components/FilterBar'
import TechnologyCard from '../../components/technology/TechnologyCard'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import { technologies } from '../../data/technologies'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'

const CATEGORIES = ['Digital Health', 'Pharmaceutical', 'Medical Devices', 'Herbal Products', 'Research & Development']
const LICENSING_STATUSES = ['Available', 'Under Negotiation', 'Licensed']

export default function TechnologyMarketplace() {
  const { role } = useAuth()
  const { toast } = useToast()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [licensingStatus, setLicensingStatus] = useState('all')
  const [addOpen, setAddOpen] = useState(false)

  const filtered = useMemo(() => {
    return technologies.filter((t) => {
      if (category !== 'all' && t.category !== category) return false
      if (licensingStatus !== 'all' && t.licensingStatus !== licensingStatus) return false
      if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [search, category, licensingStatus])

  const handleAdd = (e) => {
    e.preventDefault()
    setAddOpen(false)
    toast({ type: 'success', title: 'Technology listed', description: 'Your technology is now visible on the Innovation Exchange.' })
  }

  return (
    <div>
      <PageHeader
        title="SkillBridge Innovation Exchange"
        subtitle="Showcase academic research, patents and technologies available for industry collaboration and licensing."
        actions={role === 'institution' ? <Button icon={Plus} onClick={() => setAddOpen(true)}>List Technology</Button> : undefined}
      />

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search technologies..."
        filters={[
          { label: 'All Categories', value: category, options: CATEGORIES, onChange: setCategory },
          { label: 'All Licensing Status', value: licensingStatus, options: LICENSING_STATUSES, onChange: setLicensingStatus },
        ]}
        onClear={() => { setCategory('all'); setLicensingStatus('all'); setSearch('') }}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <TechnologyCard key={t.id} technology={t} />
        ))}
      </div>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="List a Technology" size="lg" footer={
        <>
          <Button variant="secondary" onClick={() => setAddOpen(false)}>Cancel</Button>
          <Button onClick={handleAdd}>List Technology</Button>
        </>
      }>
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-navy-600">Technology Title</label>
            <input className="input" placeholder="e.g. AI-Assisted Diagnostic Tool" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-navy-600">Description</label>
            <textarea rows={4} className="input resize-none" placeholder="Describe the technology, its innovation and application area..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-navy-600">Category</label>
              <select className="input">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-navy-600">TRL Level</label>
              <input type="number" min="1" max="9" className="input" placeholder="1-9" />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}
