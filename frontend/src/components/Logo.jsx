import { Layers } from 'lucide-react'
import clsx from 'clsx'

export default function Logo({ dark = false, size = 'md' }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className={clsx('flex items-center justify-center rounded-xl', size === 'sm' ? 'h-7 w-7' : 'h-9 w-9', 'bg-navy-900')}>
        <Layers size={size === 'sm' ? 16 : 20} className="text-white" strokeWidth={2.2} />
      </div>
      <div className="leading-none">
        <p className={clsx('font-bold tracking-tight', size === 'sm' ? 'text-sm' : 'text-[15px]', dark ? 'text-white' : 'text-navy-900')}>
          SkillBridge
        </p>
        <p className={clsx('text-[10px] font-medium uppercase tracking-wider', dark ? 'text-navy-300' : 'text-navy-400')}>
          Academia · Skills · Industry
        </p>
      </div>
    </div>
  )
}
