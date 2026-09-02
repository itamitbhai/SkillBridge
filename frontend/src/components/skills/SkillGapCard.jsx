import Card from '../ui/Card'
import { Pill } from '../ui/Badge'

export default function SkillGapCard({ title, current, industry, gap, recommended = [] }) {
  return (
    <Card>
      <p className="text-sm font-semibold text-navy-800">{title}</p>
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div>
          <p className="text-[11px] font-medium text-navy-400">Current</p>
          <p className="mt-1 text-xl font-bold text-navy-800">{current}%</p>
        </div>
        <div>
          <p className="text-[11px] font-medium text-navy-400">Industry Requirement</p>
          <p className="mt-1 text-xl font-bold text-navy-800">{industry}%</p>
        </div>
        <div>
          <p className="text-[11px] font-medium text-navy-400">Gap</p>
          <p className="mt-1 text-xl font-bold text-critical-600">{gap}%</p>
        </div>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-navy-50">
        <div className="h-full rounded-full bg-brand-500" style={{ width: `${current}%` }} />
      </div>
      {recommended.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-navy-400">Recommended</p>
          <div className="flex flex-wrap gap-1.5">
            {recommended.map((r) => (
              <Pill key={r}>{r}</Pill>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
