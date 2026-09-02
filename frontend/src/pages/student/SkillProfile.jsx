import { useState } from 'react'
import { Upload, Plus, X, GraduationCap, Award, FlaskConical, Briefcase } from 'lucide-react'
import PageHeader from '../../components/PageHeader'
import Card, { CardHeader } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { Pill } from '../../components/ui/Badge'
import { demoStudent } from '../../data/students'
import { useToast } from '../../hooks/useToast'
import { categoryOfSkill } from '../../data/skillTaxonomy'

export default function SkillProfile() {
  const [skills, setSkills] = useState(demoStudent.skills)
  const [newSkill, setNewSkill] = useState('')
  const { toast } = useToast()

  const addSkill = (e) => {
    e.preventDefault()
    if (!newSkill.trim()) return
    setSkills((prev) => Array.from(new Set([...prev, newSkill.trim()])))
    setNewSkill('')
    toast({ type: 'success', title: 'Skill added', description: `"${newSkill.trim()}" added to your profile.` })
  }

  const removeSkill = (skill) => setSkills((prev) => prev.filter((s) => s !== skill))

  const handleUploadResume = () => {
    toast({ type: 'success', title: 'Resume uploaded', description: 'Your resume has been attached to your profile.' })
  }

  return (
    <div>
      <PageHeader title="Skill Profile" subtitle="Keep your education, skills, certifications and experience up to date for accurate AI matching." />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-500 text-2xl font-bold text-white">
              {demoStudent.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <p className="mt-4 text-base font-semibold text-navy-900">{demoStudent.name}</p>
            <p className="text-sm text-navy-400">{demoStudent.course} · {demoStudent.year}</p>
            <p className="mt-1 text-xs text-navy-400">{demoStudent.institution}</p>
          </div>
          <div className="mt-5 border-t border-navy-100 pt-4">
            <Button variant="secondary" className="w-full" icon={Upload} onClick={handleUploadResume}>
              Upload Resume (PDF/DOCX)
            </Button>
            <p className="mt-2 text-center text-xs text-navy-400">
              {demoStudent.resumeUploaded ? 'Resume on file · updated recently' : 'No resume uploaded yet'}
            </p>
          </div>
        </Card>

        <div className="space-y-5 lg:col-span-2">
          <Card>
            <CardHeader title="Education" action={<GraduationCap size={16} className="text-navy-400" />} />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[11px] font-medium text-navy-400">Institution</p>
                <p className="mt-1 font-medium text-navy-800">{demoStudent.institution}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-navy-400">Discipline</p>
                <p className="mt-1 font-medium text-navy-800">{demoStudent.discipline}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-navy-400">Course</p>
                <p className="mt-1 font-medium text-navy-800">{demoStudent.course}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-navy-400">Year</p>
                <p className="mt-1 font-medium text-navy-800">{demoStudent.year}</p>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader title="Skills" subtitle="Grouped automatically by category" />
            <form onSubmit={addSkill} className="mb-4 flex gap-2">
              <input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="Add a skill (e.g. Biostatistics)" className="input" />
              <Button type="submit" icon={Plus} variant="secondary">Add</Button>
            </form>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="inline-flex items-center gap-1.5 rounded-lg bg-navy-50 px-3 py-1.5 text-xs font-medium text-navy-700">
                  {s}
                  <span className="text-[10px] text-navy-400">· {categoryOfSkill(s)}</span>
                  <button onClick={() => removeSkill(s)} className="text-navy-300 hover:text-critical-500">
                    <X size={12} />
                  </button>
                </span>
              ))}
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
    </div>
  )
}
