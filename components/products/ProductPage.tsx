import { ProductType } from '@lib/types/common'
import { useEffect, useRef, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider'
import Image from 'next/image'
import { ArrowBack, ArrowForward } from '@material-ui/icons'
import { useAuth } from 'contexts/auth'
import useCart from 'hooks/useCart'
import { useCartSidebar } from 'contexts/cartSidebar'

const DEFAULT_ADD_TO_CART_PRODUCT_QUANTITY = 1

type Props = {
  product: ProductType
}

type SizeRadioButtonsProps = {
  sizes: string[]
  selectedSize: string
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>
}

const SizeRadioButtons = ({
  selectedSize,
  sizes,
  setSelectedSize,
}: SizeRadioButtonsProps) => (
  <div className="flex flex-col space-y-4">
    <span>SIZE</span>
    <div className="flex space-x-3">
      {sizes.map((size) => (
        <div
          key={size}
          className={` duration-100 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer ${
            size === selectedSize
              ? 'border-2 border-white '
              : 'border border-gray-500'
          }`}
          onClick={() => setSelectedSize(size)}
        >
          {size}
        </div>
      ))}
    </div>
  </div>
)

const ProductPage = ({ product }: Props) => {
  const [selectedSize, setSelectedSize] = useState<string>(null)
  const descriptionDiv = useRef<HTMLDivElement>(null)
  const { user } = useAuth()
  const { addProduct } = useCart(user?.uid)
  const { setIsCartSidebarVisible } = useCartSidebar()

  useEffect(() => {
    if (product?.sizes) setSelectedSize(product.sizes[0])

    descriptionDiv.current.innerHTML = product.description
  }, [])

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({ loop: true })

  const handleAddToCart = async () => {
    await addProduct(
      product.pid,
      DEFAULT_ADD_TO_CART_PRODUCT_QUANTITY,
      selectedSize
    )
    setIsCartSidebarVisible(true)
  }

  return (
    <div className="grid lg:grid-cols-3 bg-black text-white w-full">
      <div className="relative lg:col-span-2">
        <div
          ref={sliderRef}
          className="flex h-96 lg:h-screen overflow-hidden bg-purple-600"
        >
          {product.images.map((image) => (
            <div
              key={image}
              className="keen-slider__slide flex items-center justify-center"
            >
              <Image src={image} layout="fill" objectFit="contain" />
            </div>
          ))}
        </div>
        <div className="absolute top-0 left-0 flex flex-col items-start">
          <p className="bg-black font-bold text-3xl p-4">{product.name}</p>
          <p className="bg-black font-bold text-sm p-4 pt-0">
            $ {product.price.toFixed(2)} USD
          </p>
        </div>
        <div className="absolute flex bottom-0 right-0 mb-10 mr-10">
          <button
            className="duration-150 border border-black px-8 py-3 bg-purple-600 hover:bg-purple-800"
            onClick={() => slider.prev()}
          >
            <ArrowBack className="text-black " />
          </button>
          <button
            className="duration-150 border border-l-0 border-black px-8 py-3 bg-purple-600 hover:bg-purple-800"
            onClick={() => slider.next()}
          >
            <ArrowForward className="text-black " />
          </button>
        </div>
      </div>
      <div className="flex flex-col px-6 space-y-10 mt-10">
        {product?.sizes && (
          <SizeRadioButtons
            sizes={product.sizes}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
        )}
        <div ref={descriptionDiv} className="leading-7" />
        <button
          className="bg-white text-black py-5 duration-150 border hover:bg-gray-400"
          onClick={handleAddToCart}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  )
}

export default ProductPage
