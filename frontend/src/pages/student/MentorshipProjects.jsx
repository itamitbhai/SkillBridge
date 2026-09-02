import { useNavigate } from 'react-router-dom'
import { Handshake, FlaskConical } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import Card, { CardHeader } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { Pill } from '../../components/ui/Badge'
import { mentors } from '../../data/mentors'
import { rndChallenges } from '../../data/rndChallenges'
import { useToast } from '../../hooks/useToast'

export default function MentorshipProjects() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const openProjects = rndChallenges.filter((c) => c.status === 'Open').slice(0, 4)

  const handleRequest = (mentor) => {
    toast({ type: 'success', title: 'Mentorship requested', description: `Your request has been sent to ${mentor.name}.` })
  }

  return (
    <div>
      <PageHeader title="Mentorship & Projects" subtitle="Connect with faculty and industry mentors, or join an open research project." />

      <h3 className="mb-3 text-sm font-semibold text-navy-800">Available Mentors</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mentors.map((m) => (
          <Card key={m.id} className="flex h-full flex-col">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-100 text-xs font-bold text-navy-600">
              {m.name.split(' ').filter((w) => w !== 'Dr.').map((n) => n[0]).slice(0, 2).join('')}
            </div>
            <p className="mt-3 text-sm font-semibold text-navy-800">{m.name}</p>
            <p className="text-xs text-navy-400">{m.role} · {m.org}</p>
            <div className="mt-3 flex flex-1 flex-wrap gap-1.5">
              {m.expertise.map((e) => <Pill key={e}>{e}</Pill>)}
            </div>
            <p className="mt-3 text-xs text-success-600">{m.availability}</p>
            <Button variant="secondary" size="sm" icon={Handshake} className="mt-3" onClick={() => handleRequest(m)}>
              Request Mentorship
            </Button>
          </Card>
        ))}
      </div>

      <h3 className="mb-3 mt-8 text-sm font-semibold text-navy-800">Projects You Can Join</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {openProjects.map((p) => (
          <Card key={p.id}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50">
                <FlaskConical size={18} className="text-brand-600" />
              </div>
            </div>
            <p className="mt-3 text-sm font-semibold text-navy-800">{p.title}</p>
            <p className="mt-0.5 text-xs text-navy-400">{p.company} · {p.category}</p>
            <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-navy-500">{p.problem}</p>
            <Button variant="secondary" size="sm" className="mt-3" onClick={() => navigate(`/rnd/${p.id}`)}>
              View Project
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
