import { ProductType } from '@lib/types/common'
import Image from 'next/image'

type Props = {
  product: ProductType
}

const Card = ({ product }: Props) => {
  return (
    <div className=" w-1/3 max-w-6xl mx-auto flex flex-row lg:flex-row-2 text-white">
      <div className="group bg-black ">
        <div className=" flex flex-col flex-initial items-start">
          <h3 className="font-bold text-2xl text-white p-2 bg-black group-hover:bg-purple-600">
            <span>{product.name}</span>
          </h3>
          <div className="text-white p-4 font-bold text-xl group-hover:bg-purple-600 inline-block">
            {product.price}
          </div>
          <div className="w-10/12 mx-auto h-auto hover:w-11/12 cursor-pointer">
            <Image width={500} height={500} src={product.images[0]} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Card
