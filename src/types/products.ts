export type TProductTypes = {
  id: number
  typeName: string
  price: number
};

interface TProduct {
  id: number
  title: string
  imagesUrl: {
    min: string
    middle: string
    max: string
  }
  price: number
}

export interface TProductList extends TProduct {
  typesDough: string[]
  types: TProductTypes[]
}

export interface TProductBasket extends TProduct, TProductTypes {
  typesDough: string
  quantity: number
}
