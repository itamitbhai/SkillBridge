import { createContext, useCallback, useContext, useState } from 'react'
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

const ICONS = {
  success: { Icon: CheckCircle2, cls: 'text-success-600' },
  warning: { Icon: AlertTriangle, cls: 'text-warning-600' },
  error: { Icon: XCircle, cls: 'text-critical-600' },
  info: { Icon: Info, cls: 'text-brand-600' },
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    ({ title, description, type = 'info', duration = 4000 }) => {
      const id = Math.random().toString(36).slice(2)
      setToasts((prev) => [...prev, { id, title, description, type }])
      if (duration > 0) {
        setTimeout(() => dismiss(id), duration)
      }
      return id
    },
    [dismiss]
  )

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[100] flex w-full max-w-sm flex-col gap-2.5">
        {toasts.map((t) => {
          const { Icon, cls } = ICONS[t.type] || ICONS.info
          return (
            <div
              key={t.id}
              className="animate-fade-in card flex items-start gap-3 p-4 shadow-popover"
              role="status"
            >
              <Icon size={20} className={`mt-0.5 shrink-0 ${cls}`} />
              <div className="min-w-0 flex-1">
                {t.title && <p className="text-sm font-semibold text-navy-800">{t.title}</p>}
                {t.description && <p className="mt-0.5 text-xs text-navy-500">{t.description}</p>}
              </div>
              <button onClick={() => dismiss(t.id)} className="shrink-0 text-navy-300 hover:text-navy-500">
                <X size={16} />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}
