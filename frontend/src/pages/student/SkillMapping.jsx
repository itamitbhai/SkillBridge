import { useRef, useState } from 'react'
import { Sparkles, Upload, Loader2, PenLine } from 'lucide-react'
import clsx from 'clsx'
import PageHeader from '../../components/PageHeader'
import Card, { CardHeader } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import AIAnalysis from '../../components/skills/AIAnalysis'
import { analyzeStudentSkills } from '../../services/aiService'
import { useToast } from '../../hooks/useToast'
import { demoStudent } from '../../data/students'

export default function SkillMapping() {
  const [mode, setMode] = useState('upload')
  const [fileName, setFileName] = useState(null)
  const [manualSkills, setManualSkills] = useState(demoStudent.skills.join(', '))
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const fileInputRef = useRef(null)
  const { toast } = useToast()

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    toast({ type: 'info', title: 'Resume attached', description: `${file.name} will be used for analysis.` })
  }

  const handleAnalyze = async () => {
    const input = mode === 'manual' ? manualSkills : (fileName ? manualSkills : demoStudent.skills.join(', '))
    setLoading(true)
    setResult(null)
    try {
      const analysis = await analyzeStudentSkills(input)
      setResult(analysis)
      toast({ type: 'success', title: 'Analysis complete', description: `Overall industry readiness: ${analysis.overallScore}%` })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader title="AI Skill Mapping" subtitle="Understand how your current skills align with industry requirements." />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Skill Input" subtitle="Upload your resume or enter your skills manually." />

          <div className="mb-4 flex gap-2">
            <button onClick={() => setMode('upload')} className={clsx('inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold', mode === 'upload' ? 'border-brand-200 bg-brand-50 text-brand-700' : 'border-navy-100 text-navy-500 hover:bg-navy-50')}>
              <Upload size={14} /> Upload Resume
            </button>
            <button onClick={() => setMode('manual')} className={clsx('inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold', mode === 'manual' ? 'border-brand-200 bg-brand-50 text-brand-700' : 'border-navy-100 text-navy-500 hover:bg-navy-50')}>
              <PenLine size={14} /> Enter Skills Manually
            </button>
          </div>

          {mode === 'upload' && (
            <div className="space-y-3">
              <input ref={fileInputRef} type="file" accept=".pdf,.docx" className="hidden" onChange={handleFile} />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed border-navy-200 py-10 text-navy-400 hover:border-brand-300 hover:text-brand-600"
              >
                <Upload size={22} />
                <span className="text-sm font-medium">Click to upload PDF or DOCX</span>
                <span className="text-xs">{fileName || 'No file selected'}</span>
              </button>
            </div>
          )}

          {mode === 'manual' && (
            <textarea
              rows={10}
              value={manualSkills}
              onChange={(e) => setManualSkills(e.target.value)}
              placeholder="List your skills, separated by commas..."
              className="input resize-none text-sm"
            />
          )}

          <div className="mt-4 flex justify-end">
            <Button variant="primary" icon={loading ? Loader2 : Sparkles} disabled={loading} onClick={handleAnalyze} className={loading ? '[&_svg]:animate-spin' : ''}>
              {loading ? 'Analyzing...' : 'Analyze My Skills'}
            </Button>
          </div>
        </Card>

        <Card>
          <CardHeader title="AI Analysis Result" subtitle="Skill readiness, gaps and career recommendations" />
          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 size={28} className="animate-spin text-brand-500" />
              <p className="mt-3 text-sm text-navy-400">Mapping your skills against industry requirements...</p>
            </div>
          )}
          {!loading && !result && (
            <EmptyState
              icon={Sparkles}
              title="No analysis yet"
              description="Upload your resume or enter skills manually, then click Analyze My Skills to generate your AI skill map."
            />
          )}
          {!loading && result && <AIAnalysis result={result} />}
        </Card>
      </div>
    </div>
  )
}
