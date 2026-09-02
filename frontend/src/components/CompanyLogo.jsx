import clsx from 'clsx'

const SIZES = { sm: 'h-9 w-9 text-xs', md: 'h-11 w-11 text-sm', lg: 'h-14 w-14 text-base' }

export default function CompanyLogo({ text, size = 'md' }) {
  return (
    <div className={clsx('flex shrink-0 items-center justify-center rounded-lg bg-brand-500 font-bold text-white', SIZES[size])}>
      {(text || '?').slice(0, 2).toUpperCase()}
    </div>
  )
}
