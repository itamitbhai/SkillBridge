import { Share2, Download, Award, FlaskConical, Briefcase, GraduationCap } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import Card, { CardHeader } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { Pill } from '../../components/ui/Badge'
import { demoStudent } from '../../data/students'
import { useToast } from '../../hooks/useToast'

export default function DigitalPortfolio() {
  const { toast } = useToast()

  const handleShare = () => {
    toast({ type: 'success', title: 'Share link copied', description: 'Your portfolio link has been copied to the clipboard.' })
  }
  const handleDownload = () => {
    toast({ type: 'success', title: 'Portfolio exported', description: 'A PDF version of your portfolio is being generated.' })
  }

  return (
    <div>
      <PageHeader
        title="Digital Portfolio"
        subtitle="A shareable snapshot of your skills, projects and achievements for recruiters and mentors."
        actions={
          <>
            <Button variant="secondary" icon={Share2} onClick={handleShare}>Share</Button>
            <Button icon={Download} onClick={handleDownload}>Download PDF</Button>
          </>
        }
      />

      <Card className="mb-5">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-500 text-xl font-bold text-white">
            {demoStudent.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <p className="text-lg font-bold text-navy-900">{demoStudent.name}</p>
            <p className="text-sm text-navy-500">{demoStudent.course}, {demoStudent.discipline} · {demoStudent.institution}</p>
            <p className="mt-1 text-xs text-navy-400">{demoStudent.year} · {demoStudent.city}, {demoStudent.state}</p>
          </div>
          <div className="ml-auto rounded-xl bg-surface/70 px-5 py-3 text-center">
            <p className="text-2xl font-bold text-brand-600">{demoStudent.skillScore}%</p>
            <p className="text-[11px] font-medium text-navy-400">Skill Score</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Skills" action={<GraduationCap size={16} className="text-navy-400" />} />
          <div className="flex flex-wrap gap-2">
            {demoStudent.skills.map((s) => <Pill key={s}>{s}</Pill>)}
          </div>
        </Card>

        <Card>
          <CardHeader title="Certifications" action={<Award size={16} className="text-navy-400" />} />
          <div className="flex flex-wrap gap-2">
            {demoStudent.certifications.map((c) => <Pill key={c}>{c}</Pill>)}
          </div>
        </Card>

        <Card>
          <CardHeader title="Projects" action={<Briefcase size={16} className="text-navy-400" />} />
          <ul className="space-y-2">
            {demoStudent.projects.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-navy-600">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-navy-300" />
                {p}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <CardHeader title="Research Interests" action={<FlaskConical size={16} className="text-navy-400" />} />
          <div className="flex flex-wrap gap-2">
            {demoStudent.researchInterests.map((r) => <Pill key={r}>{r}</Pill>)}
          </div>
        </Card>
      </div>
    </div>
  )
}
