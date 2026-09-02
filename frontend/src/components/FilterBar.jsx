import { Search, SlidersHorizontal, X } from 'lucide-react'

export default function FilterBar({ search, onSearchChange, searchPlaceholder = 'Search...', filters = [], onClear }) {
  const hasActiveFilters = filters.some((f) => f.value && f.value !== 'all')

  return (
    <div className="card mb-5 flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:flex-wrap">
      {onSearchChange && (
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-300" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="input pl-9"
          />
        </div>
      )}
      <div className="flex flex-1 flex-wrap items-center gap-2.5">
        {filters.map((f) => (
          <select
            key={f.label}
            value={f.value}
            onChange={(e) => f.onChange(e.target.value)}
            className="rounded-lg border border-navy-100 bg-white px-3 py-2 text-sm text-navy-600 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
          >
            <option value="all">{f.label}</option>
            {f.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ))}
        {hasActiveFilters && onClear && (
          <button onClick={onClear} className="inline-flex items-center gap-1 text-xs font-medium text-navy-400 hover:text-navy-600">
            <X size={14} /> Clear filters
          </button>
        )}
      </div>
      <div className="hidden items-center gap-1.5 text-xs font-medium text-navy-300 sm:flex">
        <SlidersHorizontal size={14} />
        Filters
      </div>
    </div>
  )
}
