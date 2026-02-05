export type Product = {
  id: string
  title: string
  specs: string
  price: string
  stock: string
  accent?: boolean
  icon: 'phone' | 'tablet' | 'console' | 'headphones' | 'laptop' | 'dyson'
}
