import Navbar from '@components/common/Navbar'
import { getAllOrders, getProductByIds } from '@lib/util/common'
import Card from '@components/card/Card'
import { useEffect, useState } from 'react'
import { useAuth } from 'contexts/auth'
import { OrderItemWithProductType } from '@lib/types/common'
import Loader from 'react-loader-spinner'
import Footer from '@components/common/Footer'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import * as tz from 'timezone/loaded'

const Orders = () => {
  const [isLoading, setisLoading] = useState(true)
  const [orders, setOrders] = useState([])
  const { user, isLoading: isUserAuthLoading } = useAuth()
  const router = useRouter()

  const getOrders = async () => {
    if (!user) return
    setisLoading(true)
    let orders = await getAllOrders(user?.uid)
    if (!orders.length) {
      setisLoading(false)
      return
    }

    orders.sort((orderA, orderB) =>
      tz((orderA.timestamp as any).toDate()) >
      tz((orderB.timestamp as any).toDate())
        ? -1
        : 0
    )

    // Cant have an array more than 10 for `in` query in firebase. Using it to fetch products
    if (orders.length > 10) orders = orders.slice(0, 10)

    const pids: string[] = orders.map((order) => order.pid)

    const products = await getProductByIds(pids)
    setisLoading(false)
    const ordersWithProducts: OrderItemWithProductType[] = orders.map(
      (order) =>
        ({
          product: products.find((product) => product.pid === order.pid),
          quantity: order.quantity,
          size: order.size,
          timestamp: order.timestamp,
          uid: order.uid,
          oid: order.oid,
        } as OrderItemWithProductType)
    )

    setOrders(ordersWithProducts)
  }

  useEffect(() => {
    if (isUserAuthLoading) return
    user ? getOrders() : router.replace('/')
  }, [user, isUserAuthLoading])

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
      <div className="bg-black min-h-screen">
        {orders.length ? (
          <div className="max-w-6xl mx-auto">
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              {orders.map((order, index) => (
                <Card
                  product={order.product}
                  key={order.oid}
                  color={index % 4}
                  orderDate={order.timestamp}
                  quantity={order.quantity}
                  isOrderCard
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center my-auto h-screen space-y-10">
            <p className="text-white text-2xl font-bold">No orders yet.</p>
            <Link href="/all">
              <a className="bg-white text-black py-5 px-10 duration-150 border hover:bg-gray-400">
                SHOP NOW
              </a>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Orders
