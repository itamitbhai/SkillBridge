export default function ChartTooltip({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-navy-100 bg-white px-3.5 py-2.5 shadow-popover">
      {label && <p className="mb-1.5 text-xs font-semibold text-navy-700">{label}</p>}
      <div className="space-y-1">
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="h-2 w-2 rounded-full" style={{ background: p.color || p.fill }} />
            <span className="text-navy-400">{p.name}:</span>
            <span className="font-semibold text-navy-800">{formatter ? formatter(p.value, p.name) : p.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
