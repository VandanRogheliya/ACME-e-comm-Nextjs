import firebase from '@lib/firebase'

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
  size: string
  uid: string
  quantity: number
  timestamp: firebase.firestore.FieldValue
}

export type OrderItemWithProductType = {
  oid?: string
  product: ProductType
  size: string
  uid: string
  quantity: number
  timestamp: firebase.firestore.FieldValue
}

export type CartItemType = {
  cid?: string
  pid: string
  size: string
  uid: string
  quantity: number
}

export type CartItemWithProductType = {
  cid?: string
  product: ProductType
  size: string
  uid: string
  quantity: number
}

// snack casing is done here to match stripe docs
export type CheckoutItem = {
  price_data: {
    currency: 'inr'
    product_data: {
      name: string
      images: string[]
    }
    unit_amount: number
  }
  quantity: number
}
