import type { Category } from '@/entities/category'

export const categories: Category[] = [
  {
    id: 'iphone',
    title: 'iPhone',
    description:
      'iPhone 17, 17 Pro, 17 Pro Max, а также iPhone 16 серии. Все модели с гарантией Apple.',
    icon: 'apple',
  },
  {
    id: 'ipad',
    title: 'iPad',
    description:
      'Планшеты Apple: iPad, iPad Air, iPad Pro, iPad mini. Для работы, творчества и развлечений.',
    icon: 'ipad',
    highlighted: true,
  },
  {
    id: 'macbook',
    title: 'MacBook',
    description:
      'Ноутбуки Apple: MacBook Air, MacBook Pro. Mac mini, iMac, Mac Studio для дома и офиса.',
    icon: 'macbook',
  },
  {
    id: 'airpods',
    title: 'AirPods',
    description:
      'Беспроводные наушники Apple всех поколений: AirPods Pro, AirPods 4, AirPods Max.',
    icon: 'airpods',
  },
  {
    id: 'playstation',
    title: 'PlayStation',
    description: 'Игровые консоли PlayStation 5, PS5 Pro, игры и аксессуары от Sony.',
    icon: 'playstation',
  },
  {
    id: 'dyson',
    title: 'Техника Dyson',
    description:
      'Пылесосы, фены, очистители и увлажнители воздуха премиум-класса.',
    icon: 'dyson',
  },
]
