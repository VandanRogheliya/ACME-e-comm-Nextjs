// import { ProductType } from '@lib/types/common'
import Image from 'next/image'
// type Props = {
//   product: ProductType
// }

const HomeCardHero = () => {
  return (
    <div className="grid grid-cols-4 lg:grid-cols-6">
      <div className="col-span-4 lg:col-span-6 lg:row-span-6 bg-purple-600">
        <div className="flex flex-grow-0 ">
          <div className="flex-initial items-start bg-black">
            <h3 className="font-bold text-4xl text-white p-2 ">
              {/* {product.name} */}
            </h3>
            <div className="text-white p-4 font-bold text-2xl pb-2 ">$40</div>
          </div>
        </div>
        <Image
          width={500}
          height={500}
          className="w-11/12 mx-auto h-auto "
          src="https://cdn11.bigcommerce.com/s-qfzerv205w/images/stencil/original/products/115/489/Hat-front-black__72990.1603748583.png"
        />
      </div>
    </div>
  )
}

export default HomeCardHero
