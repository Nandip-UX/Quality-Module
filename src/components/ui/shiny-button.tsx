'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  asChild?: boolean
}

export default function ShinyButton({
  className,
  children = 'Request a Demo',
  ...props
}: ShinyButtonProps) {
  return (
    <button
      className={cn(
        'h-12 w-max rounded-full border-none bg-[linear-gradient(325deg,var(--color-primary-dark)_0%,var(--color-accent)_55%,var(--color-primary-dark)_90%)] bg-size-[280%_auto] px-8 py-2 font-body font-bold text-white shadow-[0px_0px_20px_rgba(0,131,68,0.5),0px_5px_5px_-1px_rgba(0,131,68,0.25),inset_4px_4px_8px_rgba(0,200,83,0.5),inset_-4px_-4px_8px_rgba(0,102,51,0.35)] transition-[background] duration-700 hover:bg-top-right focus:ring-primary focus:ring-offset-1 focus:ring-offset-white focus:outline-none focus-visible:ring-2 cursor-pointer',
        className
      )}
      type='button'
      {...props}
    >
      {children}
    </button>
  )
}
