import { FIREBASE_COLLECTIONS } from '@lib/constants'
import { firebaseAuth, firestore } from '@lib/firebase'
import { UserType } from '@lib/types/common'
import { createContext, useContext, useEffect, useState } from 'react'

type AuthContextValueType = {
  user: UserType
  isLoading: boolean
}

const AuthContext = createContext<AuthContextValueType>({
  user: null,
  isLoading: false,
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<UserType>(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleCurrentUser = async () => {
    setIsLoading(true)
    try {
      const currentUserUID = firebaseAuth.currentUser?.uid
      if (currentUserUID) {
        const userDoc = await firestore
          .collection(FIREBASE_COLLECTIONS.USERS)
          .doc(currentUserUID)
          .get()
        setUser(userDoc.data() as UserType)
      } else setUser(null)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const unsubscribeListenerOnAuthChange = firebaseAuth.onAuthStateChanged(
      () => handleCurrentUser()
    )
    // Stop listening to auth state change on unmount
    return () => unsubscribeListenerOnAuthChange()
  }, [])

  useEffect(() => {
    if (!user) return
    const unsubscribeListnerOnCurrentUserDocumentChange = firestore
      .collection(FIREBASE_COLLECTIONS.USERS)
      .doc(user.uid)
      .onSnapshot(() => handleCurrentUser())
    return unsubscribeListnerOnCurrentUserDocumentChange
  }, [!!user])

  return (
    <AuthContext.Provider value={{ user, isLoading: isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
