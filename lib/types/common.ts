export type ProductType = {
  pid: string
  name: string
  slug: string
  description: string
  price: number
  images: string[]
  sizes?: string[]
}

export type AddressType = {
  line1: string
  line2: string
  city: string
  state: string
  postalCode: string
  country: string
}

export type UserType = {
  uid: string
  name: string
  email: string
  phoneNumber: string
  address: AddressType
  orders: string[]
  cartItems: string[]
}

export type OrderItemType = {
  oid?: string
  pid: string
  uid: string
  quantity: number
  timestamp: string
}

export type CartItemType = {
  cid?: string
  pid: string
  uid: string
  quantity: number
}
