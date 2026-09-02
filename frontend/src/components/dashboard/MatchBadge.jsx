import { Sparkles } from 'lucide-react'
import clsx from 'clsx'
import { matchBand } from '../../utils/badgeStyles'

export default function MatchBadge({ score, size = 'md' }) {
  const band = matchBand(score)
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-md font-bold',
        band.badge,
        size === 'sm' ? 'px-1.5 py-0.5 text-[11px]' : 'px-2 py-1 text-xs'
      )}
    >
      <Sparkles size={size === 'sm' ? 10 : 12} />
      {score}% Match
    </span>
  )
}
