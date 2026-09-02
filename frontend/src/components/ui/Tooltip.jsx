import { useState } from 'react'
import clsx from 'clsx'

export default function Tooltip({ label, children, side = 'top' }) {
  const [show, setShow] = useState(false)

  const sides = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <span
          className={clsx(
            'pointer-events-none absolute z-50 whitespace-nowrap rounded-md bg-navy-800 px-2.5 py-1.5 text-xs font-medium text-white shadow-popover',
            sides[side]
          )}
        >
          {label}
        </span>
      )}
    </span>
  )
}
