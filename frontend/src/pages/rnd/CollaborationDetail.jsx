import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, FileQuestion } from 'lucide-react'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import CollaborationWorkspace from '../../components/rnd/CollaborationWorkspace'
import { collaborationById } from '../../data/collaborations'

export default function CollaborationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const collaboration = collaborationById[id]

  if (!collaboration) {
    return (
      <EmptyState icon={FileQuestion} title={`Collaboration ${id} not found`} action={<Button variant="secondary" onClick={() => navigate('/collaboration')}>Back to Collaborations</Button>} />
    )
  }

  return (
    <div>
      <button onClick={() => navigate('/collaboration')} className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-navy-500 hover:text-navy-800">
        <ArrowLeft size={15} /> Back to Collaborations
      </button>
      <CollaborationWorkspace collaboration={collaboration} />
    </div>
  )
}
