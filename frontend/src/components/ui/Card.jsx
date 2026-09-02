import clsx from 'clsx'

export default function Card({ className, children, padding = true, ...props }) {
  return (
    <div className={clsx('card', padding && 'p-5', className)} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ title, subtitle, action, className }) {
  return (
    <div className={clsx('mb-4 flex items-start justify-between gap-4', className)}>
      <div>
        <h3 className="text-sm font-semibold text-navy-800">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-navy-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}
