import Footer from '@components/common/Footer'
import Navbar from '@components/common/Navbar'
import { emptyCart, getAllCartItems, handlePlaceOrder } from '@lib/util/common'
import { CheckCircle } from '@material-ui/icons'
import { useAuth } from 'contexts/auth'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

const ThankYou = () => {
  const { user } = useAuth()
  return (
    <div>
      <Navbar />
      <div className="h-screen flex bg-black text-white">
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, res } = context
  if (!query.uid) {
    res.writeHead(302, { location: '/error' })
    res.end()
  }
  const uid = query.uid as string
  const cartItems = await getAllCartItems(uid)
  await emptyCart(uid)
  await handlePlaceOrder(cartItems)
  return { props: {} }
}

export default ThankYou
