import Navbar from '@components/common/Navbar'
import { getAllOrders, getProductByIds } from '@lib/util/common'
import Card from '@components/card/Card'
import { useEffect, useState } from 'react'
import { useAuth } from 'contexts/auth'
import { OrderItemWithProductType } from '@lib/types/common'
import Loader from 'react-loader-spinner'
import Footer from '@components/common/Footer'

const Orders = () => {
  const [isLoading, setisLoading] = useState(true)
  const [test, setTest] = useState([])
  const { user } = useAuth()

  const getOrders = async () => {
    if (!user) return
    setisLoading(true)
    const orders = await getAllOrders(user?.uid)

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
    setTest(ordersWithProducts)
  }

  useEffect(() => {
    getOrders()
  }, [user])

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className=" bg-black h-screen flex items-center justify-center ">
          <Loader type="ThreeDots" color="#FFFFF" height={100} width={100} />
        </div>

        <Footer />
      </div>
    )
  }
  return (
    <div>
      <Navbar />
      <div className="bg-black ">
        <div className="max-w-6xl mx-auto">
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {test.map((order, index) => (
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
      </div>
      <Footer />
    </div>
  )
}

export default Orders
