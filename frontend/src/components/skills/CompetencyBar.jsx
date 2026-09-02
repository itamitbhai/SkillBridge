const TONE = {
  success: 'bg-success-500',
  brand: 'bg-brand-500',
  warning: 'bg-warning-500',
}

export default function CompetencyBar({ name, value }) {
  const tone = value >= 80 ? 'success' : value >= 65 ? 'brand' : 'warning'

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm font-medium text-navy-700">{name}</span>
        <span className="text-xs font-semibold text-navy-500">{value}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-navy-50">
        <div className={`h-full rounded-full ${TONE[tone]}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}
