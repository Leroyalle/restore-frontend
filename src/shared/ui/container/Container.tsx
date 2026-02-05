import type { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  className?: string
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={`mx-auto w-full max-w-[1680px] px-6 md:px-10 xl:px-14 ${className ?? ''}`.trim()}
    >
      {children}
    </div>
  )
}
