import { FIREBASE_COLLECTIONS } from '@lib/constants'
import firebase, { firestore } from '@lib/firebase'
import { CartItemType } from '@lib/types/common'
import { useEffect, useState } from 'react'

const MAX_CART_ITEM_QUANTITY = 6

const useCart = (uid: string) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([])
  useEffect(() => {
    if (!uid) return
    const unsubscribe = firestore
      .collection(FIREBASE_COLLECTIONS.CART_ITEM)
      .where('uid', '==', uid)
      .onSnapshot((cartItemsSnapshot) => {
        const cartItemsFromSnapshot: CartItemType[] = []
        cartItemsSnapshot.forEach((cartItem) =>
          cartItemsFromSnapshot.push({
            ...cartItem.data(),
            cid: cartItem.id,
          } as CartItemType)
        )
        setCartItems(cartItemsFromSnapshot)
      })
    return () => unsubscribe()
  }, [uid])

  const addProduct = async (pid: string, quantity: number) => {
    try {
      const product = await firestore
        .collection(FIREBASE_COLLECTIONS.PRODUCTS)
        .doc(pid)
        .get()

      if (!product.exists) throw new Error('Product not found')

      const user = await firestore
        .collection(FIREBASE_COLLECTIONS.USERS)
        .doc(uid)
        .get()

      if (!user.exists) throw new Error('User not found')

      const alreadyAddedProducts = await firestore
        .collection(FIREBASE_COLLECTIONS.CART_ITEM)
        .where('uid', '==', uid)
        .where('pid', '==', pid)
        .get()

      if (!alreadyAddedProducts.empty) {
        const cartItem = alreadyAddedProducts.docs[0]
        const { quantity } = cartItem.data()
        await updateQuantityTo(cartItem.id, quantity + 1)
        return
      }

      const newCartItem: CartItemType = {
        pid,
        quantity,
        uid,
      }

      const newCartItemRef = await firestore
        .collection(FIREBASE_COLLECTIONS.CART_ITEM)
        .add(newCartItem)

      await firestore
        .collection(FIREBASE_COLLECTIONS.USERS)
        .doc(uid)
        .update({
          cartItems: firebase.firestore.FieldValue.arrayUnion(
            newCartItemRef.id
          ),
        })
    } catch (error) {
      console.error(error)
    }
  }

  const updateQuantityTo = async (cid: string, newQuantity: number) => {
    try {
      if (!newQuantity) throw new Error('New quantity can not be zero')
      if (newQuantity > MAX_CART_ITEM_QUANTITY)
        throw new Error('Maximum limit reached')
      const cartItemRef = firestore
        .collection(FIREBASE_COLLECTIONS.CART_ITEM)
        .doc(cid)

      if (!(await cartItemRef.get()).exists)
        throw new Error('Cart item not found')

      await cartItemRef.update({
        quantity: newQuantity,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const removeProduct = async (cid: string) => {
    try {
      const cartItemRef = firestore
        .collection(FIREBASE_COLLECTIONS.CART_ITEM)
        .doc(cid)

      if (!(await cartItemRef.get()).exists)
        throw new Error('Cart item not found')

      const cartItem = await cartItemRef.get()
      await cartItemRef.delete()

      const uid = cartItem.data().uid

      const userRef = firestore.collection(FIREBASE_COLLECTIONS.USERS).doc(uid)

      if (!(await userRef.get()).exists) throw new Error('User not found')

      await userRef.update({
        orders: firebase.firestore.FieldValue.arrayRemove(cid),
      })
    } catch (error) {
      console.error(error)
    }
  }

  const makeEmpty = async () => {
    try {
      const cartItemsSnapshot = await firestore
        .collection(FIREBASE_COLLECTIONS.CART_ITEM)
        .where('uid', '==', uid)
        .get()
      cartItemsSnapshot.forEach((cartItem) => cartItem.ref.delete())
    } catch (error) {
      console.error(error)
    }
  }

  return { cartItems, addProduct, updateQuantityTo, removeProduct, makeEmpty }
}

export default useCart
