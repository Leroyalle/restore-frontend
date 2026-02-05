import type { ReactNode } from 'react'

type IconCircleProps = {
  children: ReactNode
  className?: string
}

export const IconCircle = ({ children, className }: IconCircleProps) => {
  return (
    <div
      className={[
        'flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-300',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
