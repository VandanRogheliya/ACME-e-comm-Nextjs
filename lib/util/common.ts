import { FIREBASE_COLLECTIONS } from '@lib/constants'
import firebase, { firebaseAuth, firestore } from '@lib/firebase'
import {
  CartItemType,
  OrderItemType,
  ProductType,
  UserType,
} from '@lib/types/common'

export const handleLogin = async () => {
  try {
    const authProvider = new firebase.auth.GoogleAuthProvider()
    const result = await firebaseAuth.signInWithPopup(authProvider)
    const user = result.user

    const userRef = firestore.collection('Users')
    const docs = await userRef.where('uid', '==', user.uid).get()

    if (docs.size) return

    const currentUser: UserType = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: null,
      cartItems: [],
      orders: [],
    }

    userRef.doc(currentUser.uid).set(currentUser)
  } catch (error) {
    console.error(error)
  }
}

export const handlePlaceOrder = async (cartItems: CartItemType[]) => {
  try {
    cartItems.forEach(async (cartItem) => {
      const orderItem: OrderItemType = {
        pid: cartItem.pid,
        uid: cartItem.uid,
        quantity: cartItem.quantity,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      }
      await firestore
        .collection(FIREBASE_COLLECTIONS.ORDER_ITEM)
        .doc()
        .set(orderItem)
    })
  } catch (error) {
    console.error(error)
  }
}

export const getAllOrders = async (uid: string) => {
  const allOrders: OrderItemType[] = []
  try {
    const orderItems = await firestore
      .collection(FIREBASE_COLLECTIONS.ORDER_ITEM)
      .where('uid', '==', uid)
      .get()

    orderItems.forEach((orderItemDoc) =>
      allOrders.push({
        ...(orderItemDoc.data() as OrderItemType),
        oid: orderItemDoc.id,
      })
    )
  } catch (error) {
    console.error(error)
  }
  return allOrders
}

export const getProductById = async (pid: string) => {
  try {
    const productRef = await firestore
      .collection(FIREBASE_COLLECTIONS.PRODUCTS)
      .doc(pid)
      .get()
    const product: ProductType = productRef.data() as ProductType
    return product
  } catch (error) {
    console.error(error)
    return null
  }
}
