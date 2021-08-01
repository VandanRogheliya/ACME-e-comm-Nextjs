import { ProductType } from '@lib/types/common'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  product: ProductType
  isHero?: boolean
}

const HomeCard = ({ product, isHero }: Props) => {
  return (
    <Link href={`/products/${product.slug}`}>
      <a className="group relative text-white">
        <div className="mx-auto text-center transform group-hover:scale-125 duration-500">
          <Image
            width={isHero ? 1000 : 500}
            height={isHero ? 1000 : 500}
            src={product.images[0]}
          />
        </div>
        <div className="absolute top-0 left-0 flex flex-col items-start">
          <p className="bg-black font-bold text-3xl p-5 whitespace-nowrap">
            {product.name}
          </p>
          <p className="bg-black font-bold text-sm p-5 pt-2">
            ₹ {product.price.toFixed(2)}
          </p>
        </div>
      </a>
    </Link>
  )
}
export default HomeCard
