import firebase, { firebaseAuth, firestore } from '@lib/firebase'
import { UserType } from '@lib/types/common'

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
