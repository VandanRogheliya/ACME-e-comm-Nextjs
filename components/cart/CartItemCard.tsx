import Image from 'next/image'
import { ProductType } from '@lib/types/common'
import { Close } from '@material-ui/icons'

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
        <p>₹ {(product.price * quantity).toFixed(2)}</p>
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

export default CartItemCard
