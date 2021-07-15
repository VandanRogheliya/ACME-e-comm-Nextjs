import { ProductType } from '@lib/types/common'
import Image from 'next/image'

type Props = {
  product: ProductType
  isHero?: boolean
}

const HomeCard = ({ product, isHero }: Props) => {
  return (
    <div>
      <div>
        <div className="flex flex-grow-1 ">
          <div className="flex-initial  bg-black">
            <h3 className="font-bold text-4xl text-white p-2 ">
              {product.name}
            </h3>
            <div className="text-white p-4 font-bold text-2xl pb-2 ">
              ₹{product.price}
            </div>
          </div>
        </div>
        <div className="mx-auto text-center">
          <Image
            width={isHero ? 1000 : 500}
            height={isHero ? 1000 : 500}
            src={product.images[0]}
          />
        </div>
      </div>
    </div>
  )
}
export default HomeCard
