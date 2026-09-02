import { ChevronLeft, ChevronRight } from 'lucide-react'
import clsx from 'clsx'

export default function Pagination({ page, totalPages, onChange, totalItems, pageSize }) {
  if (totalPages <= 1) return null

  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, totalItems)

  const pages = []
  const start = Math.max(1, page - 1)
  const end = Math.min(totalPages, start + 2)
  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-navy-100 px-5 py-3.5 sm:flex-row">
      <p className="text-xs text-navy-400">
        Showing <span className="font-medium text-navy-600">{from}-{to}</span> of{' '}
        <span className="font-medium text-navy-600">{totalItems}</span>
      </p>
      <div className="flex items-center gap-1.5">
        <button
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-navy-100 text-navy-500 hover:bg-navy-50 disabled:opacity-40"
        >
          <ChevronLeft size={15} />
        </button>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={clsx(
              'flex h-8 w-8 items-center justify-center rounded-md text-xs font-medium',
              p === page ? 'bg-brand-500 text-white' : 'border border-navy-100 text-navy-500 hover:bg-navy-50'
            )}
          >
            {p}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          onClick={() => onChange(page + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-navy-100 text-navy-500 hover:bg-navy-50 disabled:opacity-40"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  )
}
