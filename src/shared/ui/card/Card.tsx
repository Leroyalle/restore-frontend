import type { HTMLAttributes } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement>

export const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      className={[
        'rounded-3xl border border-stroke-500 bg-ink-850/70 p-6 shadow-card backdrop-blur-xl',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  )
}
