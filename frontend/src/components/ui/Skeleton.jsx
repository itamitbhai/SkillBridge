import clsx from 'clsx'

export function Skeleton({ className }) {
  return <div className={clsx('animate-pulse rounded-md bg-navy-100/70', className)} />
}

export function CardSkeleton({ rows = 3 }) {
  return (
    <div className="card p-5">
      <Skeleton className="mb-4 h-4 w-1/3" />
      <div className="space-y-2.5">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-3.5 w-full" />
        ))}
      </div>
    </div>
  )
}

export function TableSkeleton({ rows = 6, cols = 6 }) {
  return (
    <div className="card overflow-hidden p-0">
      <div className="space-y-0 divide-y divide-navy-100">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex items-center gap-6 px-5 py-4">
            {Array.from({ length: cols }).map((_, c) => (
              <Skeleton key={c} className="h-3.5 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
