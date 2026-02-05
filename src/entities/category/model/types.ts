export type Category = {
  id: string
  title: string
  description: string
  icon: 'apple' | 'ipad' | 'macbook' | 'airpods' | 'playstation' | 'dyson'
  highlighted?: boolean
}
