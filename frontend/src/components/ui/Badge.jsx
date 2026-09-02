import clsx from 'clsx'
import { statusStyle } from '../../utils/badgeStyles'

export function StatusBadge({ status, className }) {
  return <span className={clsx('badge', statusStyle(status), className)}>{status}</span>
}

export function Pill({ children, className }) {
  return (
    <span className={clsx('badge bg-navy-50 text-navy-600 ring-1 ring-inset ring-navy-100', className)}>
      {children}
    </span>
  )
}
