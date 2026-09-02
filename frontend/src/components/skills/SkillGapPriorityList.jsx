import { priorityStyle } from '../../utils/badgeStyles'
import clsx from 'clsx'

export default function SkillGapPriorityList({ items }) {
  return (
    <div className="space-y-4">
      {items.map((g) => (
        <div key={g.skill} className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-navy-800">{g.skill}</p>
            <p className="mt-0.5 text-xs text-navy-400">{g.current} → {g.target} · gap {g.target - g.current}%</p>
          </div>
          <span className={clsx('badge shrink-0', priorityStyle(g.priority))}>{g.priority} Priority</span>
        </div>
      ))}
    </div>
  )
}
