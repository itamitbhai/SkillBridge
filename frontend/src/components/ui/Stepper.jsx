import { Check } from 'lucide-react'
import clsx from 'clsx'

export default function Stepper({ steps, activeIndex }) {
  return (
    <div className="mb-6 flex items-center">
      {steps.map((step, i) => (
        <div key={step} className="flex flex-1 items-center last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={clsx(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors',
                i < activeIndex ? 'bg-success-500 text-white' : i === activeIndex ? 'bg-brand-500 text-white' : 'bg-navy-100 text-navy-400'
              )}
            >
              {i < activeIndex ? <Check size={14} /> : i + 1}
            </div>
            <span className={clsx('whitespace-nowrap text-[11px] font-medium', i <= activeIndex ? 'text-navy-700' : 'text-navy-300')}>
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={clsx('mx-2 h-0.5 flex-1', i < activeIndex ? 'bg-success-500' : 'bg-navy-100')} />
          )}
        </div>
      ))}
    </div>
  )
}
