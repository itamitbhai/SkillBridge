import { TrendingUp, TrendingDown } from 'lucide-react'
import clsx from 'clsx'

export default function KPICard({ icon: Icon, label, value, change, changeLabel, iconBg = 'bg-brand-50', iconColor = 'text-brand-600', suffix }) {
  const isPositive = change > 0
  const isNegative = change < 0

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-navy-400">{label}</span>
        <div className={clsx('flex h-9 w-9 shrink-0 items-center justify-center rounded-full', iconBg)}>
          <Icon size={16} className={iconColor} />
        </div>
      </div>
      <p className="mt-3 text-[26px] font-bold leading-none tracking-tight text-navy-900">
        {value}
        {suffix && <span className="text-base font-semibold text-navy-400">{suffix}</span>}
      </p>
      {change !== undefined && (
        <p className={clsx('mt-2.5 flex items-center gap-1 text-xs font-semibold', isPositive && 'text-success-600', isNegative && 'text-critical-600', !isPositive && !isNegative && 'text-navy-400')}>
          {isPositive && <TrendingUp size={12} />}
          {isNegative && <TrendingDown size={12} />}
          {isPositive ? '+' : ''}{change}%
          <span className="font-medium text-navy-400">this month</span>
        </p>
      )}
      {changeLabel && <p className="mt-2.5 text-xs font-medium text-success-600">{changeLabel}</p>}
    </div>
  )
}
