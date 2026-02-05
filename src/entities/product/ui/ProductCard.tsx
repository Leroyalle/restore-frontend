import type { ReactNode } from 'react'

import type { Product } from '@/entities/product'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'

type ProductCardProps = {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card
      className={[
        'group flex min-h-[320px] flex-col justify-between bg-ink-850/70',
        product.accent ? 'border-brand-500/60' : 'hover:border-brand-500/40',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div>
        <div className="flex h-36 items-center justify-center rounded-2xl bg-ink-800/70 text-brand-300">
          {renderProductIcon(product.icon)}
        </div>
        <h3 className="mt-5 text-lg font-semibold text-text-primary">{product.title}</h3>
        <p className="mt-2 text-sm text-text-muted">{product.specs}</p>
        <p className="mt-4 text-2xl font-semibold text-brand-300">{product.price}</p>
        <p className="mt-2 text-xs text-text-muted">{product.stock}</p>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Button className="flex-1">
          <CartIcon className="h-4 w-4" />
          В корзину
        </Button>
        <IconSquare icon={<ScaleIcon className="h-4 w-4" />} />
        <IconSquare icon={<HeartIcon className="h-4 w-4" />} />
      </div>
    </Card>
  )
}

const IconSquare = ({ icon }: { icon: ReactNode }) => {
  return (
    <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-stroke-500 bg-white/5 text-text-secondary transition hover:bg-white/10 hover:text-text-primary">
      {icon}
    </button>
  )
}

function renderProductIcon(type: string) {
  switch (type) {
    case 'phone':
      return (
        <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="7" y="2" width="10" height="20" rx="2" />
          <circle cx="12" cy="18" r="1" />
        </svg>
      )
    case 'tablet':
      return (
        <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <circle cx="12" cy="17" r="1" />
        </svg>
      )
    case 'console':
      return (
        <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="8" width="18" height="8" rx="3" />
          <circle cx="8" cy="12" r="1.2" />
          <circle cx="16" cy="11" r="1" />
          <circle cx="18" cy="13" r="1" />
        </svg>
      )
    case 'headphones':
      return (
        <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
          <rect x="3" y="14" width="4" height="6" rx="2" />
          <rect x="17" y="14" width="4" height="6" rx="2" />
        </svg>
      )
    case 'laptop':
      return (
        <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="5" width="16" height="10" rx="2" />
          <path d="M2 19h20" />
        </svg>
      )
    case 'dyson':
      return (
        <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="7" />
          <path d="M12 6v6l3 3" />
        </svg>
      )
    default:
      return null
  }
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="17" cy="20" r="1.5" />
      <path d="M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H7" />
    </svg>
  )
}

function ScaleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3v18" />
      <path d="M5 7h14" />
      <path d="M6 7l-3 6h6l-3-6z" />
      <path d="M18 7l-3 6h6l-3-6z" />
    </svg>
  )
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 21s-7-4.5-9-8.5C1 8 3.5 5 7 5c2.2 0 3.7 1.2 5 3 1.3-1.8 2.8-3 5-3 3.5 0 6 3 4 7.5-2 4-9 8.5-9 8.5z" />
    </svg>
  )
}
