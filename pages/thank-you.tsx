import Footer from '@components/common/Footer'
import Navbar from '@components/common/Navbar'
import { emptyCart, getAllCartItems, handlePlaceOrder } from '@lib/util/common'
import Loader from 'react-loader-spinner'
import { CheckCircle } from '@material-ui/icons'
import { useAuth } from 'contexts/auth'
import { useRouter } from 'next/dist/client/router'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const ThankYou = () => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const makeOrders = async () => {
    setIsLoading(true)
    const queryKey = 'uid'
    try {
      const uid =
        router.query[queryKey] ||
        router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))[1]

      if (!uid) {
        throw new Error('query param uid not found')
      }

      const cartItems = await getAllCartItems(uid as string)
      await emptyCart(uid as string)
      await handlePlaceOrder(cartItems)
    } catch (error) {
      console.error(error)
      router.replace('/error')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    makeOrders()
  }, [])

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="bg-black h-screen flex items-center justify-center ">
          <Loader type="ThreeDots" color="#FFFFFF" height={100} width={100} />
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="h-screen flex bg-black text-white text-center">
        <div className="px-5 flex flex-col max-w-6xl mx-auto lg:m-auto lg:items-center">
          <div className="flex items-center justify-center text-6xl lg:text-9xl py-10 lg:pt-0">
            <CheckCircle className="" fontSize="inherit" />
          </div>
          <h1 className="text-3xl lg:text-6xl font-bold py-5">
            Thank you for ordering with us.
          </h1>
          {user?.address && (
            <>
              <p className="font-bold text-lg py-3">
                Your order will be delivered to this address soon.
              </p>
              <div className="flex flex-col items-center">
                <div>{user.address.line1}</div>
                <div>{user.address.line2}</div>
                <div>
                  {user.address.city}, {user.address.postalCode}
                </div>
                <div>
                  {user.address.state}, {user.address.country}
                </div>
              </div>
            </>
          )}
          <Link href="/all">
            <a className="bg-white text-black py-5 duration-150 border lg:self-center px-16 hover:bg-gray-400 mt-5 lg:mt-20">
              Shop more
            </a>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ThankYou
