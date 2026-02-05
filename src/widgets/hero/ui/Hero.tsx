import { benefits } from '@/shared/mock/benefits'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import { Container } from '@/shared/ui/container'
import { IconCircle } from '@/shared/ui/icon'

const ctaButtons = ['Купить iPhone', 'PlayStation 5', 'AirPods']

export const Hero = () => {
  return (
    <section className="py-16 text-left">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="text-left">
            <p className="text-5xl font-extrabold tracking-tight text-text-primary">RESTART</p>
            <h1 className="mt-3 text-4xl font-semibold text-brand-300">
              Перезагрузите свои технологии
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              Откройте мир инноваций с нашими премиальными устройствами
            </p>
            <p className="mt-6 max-w-xl text-base text-brand-300/90">
              Самые современные гаджеты и бытовая техника для вашей новой жизни.
              Только оригинальная техника Apple, PlayStation и Dyson с официальной гарантией.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {benefits.slice(0, 3).map((benefit) => (
                <Card key={benefit.title} className="p-4">
                  <div className="flex items-center gap-3">
                    <IconCircle>{renderBenefitIcon(benefit.icon)}</IconCircle>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{benefit.title}</p>
                      <p className="text-xs text-text-muted">{benefit.text}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <IconCircle>{renderBenefitIcon(benefits[3].icon)}</IconCircle>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{benefits[3].title}</p>
                    <p className="text-xs text-text-muted">{benefits[3].text}</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {ctaButtons.map((label, index) => (
                <Button key={label} variant={index === 0 ? 'primary' : 'ghost'}>
                  {label}
                </Button>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute right-8 top-8 h-64 w-64 rounded-full bg-brand-500/30 blur-[120px]" />
            <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-brand-500/20 blur-[160px]" />
          </div>
        </div>
      </Container>
    </section>
  )
}

function renderBenefitIcon(type: string) {
  switch (type) {
    case 'box':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 7l9 5 9-5" />
          <path d="M3 7v10l9 5 9-5V7" />
        </svg>
      )
    case 'support':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 13v-2a8 8 0 0 1 16 0v2" />
          <rect x="2" y="13" width="4" height="6" rx="2" />
          <rect x="18" y="13" width="4" height="6" rx="2" />
          <path d="M12 19v2" />
        </svg>
      )
    case 'truck':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="4" width="14" height="12" rx="2" />
          <path d="M15 8h4l4 4v4h-8" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="18" cy="18" r="2" />
        </svg>
      )
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
        </svg>
      )
    default:
      return null
  }
}
