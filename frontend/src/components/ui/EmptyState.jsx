export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      {Icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50">
          <Icon size={22} className="text-navy-400" />
        </div>
      )}
      <p className="text-sm font-semibold text-navy-700">{title}</p>
      {description && <p className="mt-1.5 max-w-sm text-sm text-navy-400">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
