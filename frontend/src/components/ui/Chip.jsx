import clsx from 'clsx'

export default function Chip({ children, active, onClick }) {
  const interactive = typeof onClick === 'function'
  return (
    <span
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={interactive ? (e) => e.key === 'Enter' && onClick() : undefined}
      className={clsx(
        'inline-flex select-none items-center rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
        interactive && 'cursor-pointer',
        active
          ? 'border-brand-200 bg-brand-50 text-brand-700'
          : 'border-navy-100 bg-white text-navy-500 hover:bg-navy-50'
      )}
    >
      {children}
    </span>
  )
}
