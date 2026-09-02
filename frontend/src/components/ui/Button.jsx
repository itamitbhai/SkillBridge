import { forwardRef } from 'react'
import clsx from 'clsx'

const VARIANTS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger: 'btn bg-critical-500 text-white hover:bg-critical-600 shadow-xs px-4 py-2.5',
}

const SIZES = {
  sm: 'text-xs px-3 py-1.5',
  md: '',
  lg: 'text-base px-5 py-3',
}

const Button = forwardRef(function Button(
  { as: Comp = 'button', variant = 'primary', size = 'md', className, icon: Icon, iconRight: IconRight, children, ...props },
  ref
) {
  return (
    <Comp ref={ref} className={clsx(VARIANTS[variant], SIZES[size], className)} {...props}>
      {Icon && <Icon size={16} />}
      {children}
      {IconRight && <IconRight size={16} />}
    </Comp>
  )
})

export default Button
