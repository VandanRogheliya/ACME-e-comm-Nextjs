import { Close, ShoppingCart } from '@material-ui/icons'
import { useAuth } from 'contexts/auth'
import useCart from 'hooks/useCart'
import { ProductType } from '@lib/types/common'
import Loader from 'react-loader-spinner'
import Image from 'next/image'

const EmptyCart = () => (
  <div className="flex flex-col space-y-5 items-center justify-center h-full px-5">
    <p className="rounded-full bg-gray-100 border-2 border-black border-dashed">
      <ShoppingCart className="m-10 text-black" />
    </p>
    <h2 className="text-2xl font-bold text-gray-300">Your cart is empty</h2>
  </div>
)

type CartItemCardType = {
  product: ProductType
  size: string
  quantity: number
  handleRemoveItem: () => void
  handleIncreaseQuantity: () => void
  handleDecreaseQuantity: () => void
}

const CartItemCard = ({
  product,
  size,
  quantity,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
  handleRemoveItem,
}: CartItemCardType) => (
  <div className="flex flex-col w-full space-y-5">
    <div className="flex space-x-5">
      <div className="bg-purple-600 h-20 w-20">
        <Image src={product.images[0]} height={80} width={80} />
      </div>
      <div className="flex flex-col items-start leading-tight justify-evenly text-gray-100">
        <p>
          {product.name}
          {size && `, ${size}`}
        </p>
        <p>$ {(product.price * quantity).toFixed(2)}</p>
      </div>
    </div>
    <div className="flex space-x-3">
      <button
        className="border border-gray-700 cursor-pointer hover:bg-gray-900 duration-150"
        onClick={handleRemoveItem}
      >
        <Close className="text-gray-400 m-1" />
      </button>
      <div className="border border-gray-700 flex w-full text-gray-400">
        <p className="w-8/12 flex items-center text-xl px-3">{quantity}</p>
        <button
          className="border-l border-gray-700 flex items-center justify-center text-2xl w-2/12 cursor-pointer hover:bg-gray-900 duration-150"
          onClick={handleDecreaseQuantity}
        >
          -
        </button>
        <button
          className="border-l border-gray-700 flex items-center justify-center text-2xl w-2/12 cursor-pointer hover:bg-gray-900 duration-150"
          onClick={handleIncreaseQuantity}
        >
          +
        </button>
      </div>
    </div>
  </div>
)

const TotalSection = ({ total }) => (
  <div className="flex flex-col text-gray-300 text-sm space-y-3 border-t p-5 w-5/6 lg:w-1/3 bg-black fixed bottom-0">
    <div className="flex items-center justify-between">
      <p>Subtotal</p>
      <p>${total}</p>
    </div>
    <div className="flex items-center justify-between">
      <p>Shipping</p>
      <p>FREE</p>
    </div>
    <div className="w-full border h-0 border-gray-800" />
    <div className="flex items-center justify-between">
      <p>Total</p>
      <p>${total}</p>
    </div>
    <button className="bg-white text-black py-5 duration-150 border hover:bg-gray-400">
      PROCEED TO CHECKOUT
    </button>
  </div>
)

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CartSidebar = ({ setIsOpen }: Props) => {
  const { user } = useAuth()
  const { cartItems, total, removeProduct, updateQuantityTo, isLoading } =
    useCart(user?.uid)

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
            <TotalSection total={total} />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartSidebar
