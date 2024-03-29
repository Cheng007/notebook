/**
 * 实现 Optional
 */

interface Artical {
  user: string
  id: number
  context: string
  date: string
}

// 实现
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

type OptionalArtical = Optional<Artical, 'id' | 'date'>
