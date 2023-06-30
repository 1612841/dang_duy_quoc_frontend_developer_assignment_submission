export type TGetProduct = {
    limit: number,
    skip?: number
}

export interface Data 
{
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail?: any,
  images?: unknown[]
}

export type TResponse = {
  products: Data[]
  total: number,
  skip: number,
  limit: number
}

export type TSearch = {
  q: string
}