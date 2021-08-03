import { COLOR_MAP } from '@lib/constants'

import { ProductType } from '@lib/types/common'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  product: ProductType

  color: number
  isOrderCard?: boolean
  orderDate?: any
  quantity?: number
}

const Card = ({ product, color, isOrderCard, orderDate, quantity }: Props) => {
  const orderedContent = (
    <div>
      <div className="group absolute bottom-0 left-0  bg-black font-bold text-xl text-white p-4">
        Qty:{quantity}
      </div>
      <div className="group absolute bottom-0 right-0  bg-black font-bold text-xl text-white p-4">
        OrderedOn:{orderDate.toLocaleString('en-US ')}
      </div>
    </div>
  )
  return (
    <Link href={`/products/${product.slug}`}>
      <a className="group m-5 bg-gray-900 relative overflow-hidden">
        <div className="text-center transform group-hover:scale-110 duration-500">
          <Image width={500} height={500} src={product.images[0]} />
        </div>
        <div className="absolute top-0 left-0 flex flex-col items-start text-white">
          <p
            className={`${COLOR_MAP[color]} bg-black transition ease-in-out duration-500 font-bold text-xl p-5 whitespace-nowrap`}
          >
            {product.name}
          </p>
          <p
            className={`${COLOR_MAP[color]} bg-black transition ease-in-out duration-500 font-bold text-sm p-5 pt-2`}
          >
            ₹ {product.price.toFixed(2)}
          </p>
        </div>
        {isOrderCard && orderedContent}
      </a>
    </Link>
  )
}
export default Card
