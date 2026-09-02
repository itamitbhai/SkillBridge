import { benchmarkColor } from '../../utils/badgeStyles'

export default function SkillBenchmarkBar({ skill, current, target }) {
  const c = benchmarkColor(current, target)

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm font-medium text-navy-700">{skill}</span>
        <span className="text-xs font-semibold text-navy-500">
          {current}% <span className="text-navy-300">/ {target}%</span>
        </span>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-navy-50">
        <div className={`h-full rounded-full ${c.bar}`} style={{ width: `${Math.min(100, current)}%` }} />
        <div className="absolute top-1/2 h-3 w-0.5 -translate-y-1/2 bg-navy-300" style={{ left: `${Math.min(100, target)}%` }} />
      </div>
    </div>
  )
}
