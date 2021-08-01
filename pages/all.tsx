import Card from '@components/card/Card'
import Footer from '@components/common/Footer'
import Navbar from '@components/common/Navbar'
import { PID_ARRAY } from '@lib/constants'
import { ProductType } from '@lib/types/common'
import { getProductById } from '@lib/util/common'
import { GetStaticProps } from 'next'
import React from 'react'

type Props = {
  products: ProductType[]
}

const AllProducts = ({ products }: Props) => {
  return (
    <div>
      <Navbar />
      <div className="bg-black">
        <div className="max-w-6xl mx-auto">
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <Card product={product} key={product.pid} color={index % 4} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export const getStaticProps: GetStaticProps = async () => {
  const pidArray = PID_ARRAY
  const products: ProductType[] = []

  for (let i = 0; i < pidArray.length; i++) {
    products.push(await getProductById(pidArray[i]))
  }
  return {
    props: { products },
  }
}
export default AllProducts
