import { COLOR_MAP } from '@lib/constants'
import { ProductType } from '@lib/types/common'
import Image from 'next/image'

type Props = {
  product: ProductType
  color: number
}

const Card = ({ product, color }: Props) => {
  return (
    <div className="m-5 bg-gray-900 relative">
      <div className="flex flex-col">
        <div className="group absolute top-0 left-0 flex flex-col items-start z-10">
          <div
            className={`${COLOR_MAP[color]} bg-black font-bold text-3xl text-white p-4 `}
          >
            {product.name}
          </div>
          <div
            className={`${COLOR_MAP[color]} bg-black font-bold text-xl text-white p-4 `}
          >
            ₹{product.price}
          </div>
        </div>
      </div>
      <div className="text-center ">
        <Image width={500} height={500} src={product.images[0]} />
      </div>
    </div>
  )
}
export default Card
