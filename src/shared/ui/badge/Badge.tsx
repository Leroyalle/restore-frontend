type BadgeProps = {
  value: number
  className?: string
}

export const Badge = ({ value, className }: BadgeProps) => {
  if (value <= 0) return null

  return (
    <span
      className={[
        'absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-pink-500 px-1 text-[11px] font-semibold text-white',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {value}
    </span>
  )
}
