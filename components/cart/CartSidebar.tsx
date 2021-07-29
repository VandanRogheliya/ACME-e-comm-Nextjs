import { Close, ShoppingCart } from '@material-ui/icons'
import { useAuth } from 'contexts/auth'
import useCart from 'hooks/useCart'
import Loader from 'react-loader-spinner'
import CartItemCard from '@components/cart/CartItemCard'
import TotalSection from '@components/cart/TotalSection'

const EmptyCart = () => (
  <div className="flex flex-col space-y-5 items-center justify-center h-full px-5">
    <p className="rounded-full bg-gray-100 border-2 border-black border-dashed">
      <ShoppingCart className="m-10 text-black" />
    </p>
    <h2 className="text-2xl font-bold text-gray-300">Your cart is empty</h2>
  </div>
)

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CartSidebar = ({ setIsOpen }: Props) => {
  const { user } = useAuth()
  const { cartItems, total, removeProduct, updateQuantityTo, isLoading } =
    useCart(user?.uid)

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({ cartItems }),
        headers: {
          'content-type': 'application/json',
        },
      })
      if (!response.ok) throw new Error('Something went wrong')

      const data = await response.json()
      if (response.ok) window.open(data.url, '_self')
      else throw Error(response.statusText)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="fixed h-screen max-h-screen w-full top-0 left-0 right-0 bottom-0 grid grid-cols-6 text-white overflow-auto">
      <div className="col-span-1 lg:col-span-4 bg-black opacity-50" />
      <div className="col-span-5 lg:col-span-2 bg-black flex flex-col py-5 space-y-5">
        <div className="bg-black fixed z-10 w-5/6 lg:w-1/3 flex p-5 top-0">
          <Close
            className="text-white cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>
        {isLoading ? (
          <div className="h-full flex items-center justify-center px-5">
            <Loader type="ThreeDots" color="#a6a6a6" height={100} width={100} />
          </div>
        ) : !cartItems.length ? (
          <EmptyCart />
        ) : (
          <div className="flex flex-col justify-between">
            <div className="flex flex-col px-5 pt-5">
              <h1 className="text-2xl font-bold mb-10">My Cart</h1>
              <div className="flex flex-col space-y-16 pb-56">
                {cartItems.map(({ cid, product, quantity, size }) => (
                  <CartItemCard
                    key={cid}
                    product={product}
                    size={size}
                    quantity={quantity}
                    handleRemoveItem={() => removeProduct(cid)}
                    handleIncreaseQuantity={() =>
                      updateQuantityTo(cid, quantity + 1)
                    }
                    handleDecreaseQuantity={() =>
                      updateQuantityTo(cid, quantity - 1)
                    }
                  />
                ))}
              </div>
            </div>
            <TotalSection total={total} handleCheckout={handleCheckout} />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartSidebar
