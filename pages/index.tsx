import Navbar from "@components/common/Navbar"
import Footer from "@components/common/Footer"
import firebase, { firebaseAuth, firestore } from '@lib/firebase'

const Home = () => {
  // TODO: Create auth hook to handle user
  const handleAuth = async () => {
    try {
      const result = await firebaseAuth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      )
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }

  const getAllData = async () => {
    try {
      const docs = await firestore.collection('Users').get()
      docs.forEach((doc) => console.log(doc.data(), doc.id))
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = async () => {
    firebaseAuth.signOut()
  }

  return (
    <div>

      <Navbar />
      <Footer/>
      <button onClick={handleAuth} className="">
        Sign-in
      </button>
      <button onClick={getAllData}>Get All Data</button>
    </div>
  )
}

export default Home
