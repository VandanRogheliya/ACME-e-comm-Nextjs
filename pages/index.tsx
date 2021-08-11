import Navbar from '@components/common/Navbar'
import Footer from '@components/common/Footer'
import HomeCard from '@components/card/HomeCard'
import { HOME_PID_ARRAY } from '@lib/constants'
import { ProductType } from '@lib/types/common'
import { getProductById } from '@lib/util/common'
import { GetStaticProps } from 'next'

type Props = {
  products: ProductType[]
}

const Home = ({ products }: Props) => {
  return (
    <div>
      <Navbar />
      <div className="lg:grid lg:grid-rows-2 lg:grid-flow-col overflow-hidden">
        <div className="bg-purple-700  lg:row-span-2 lg:col-span-2">
          <HomeCard
            product={products.filter((products) => products.pid == '115')[0]}
            isHero
          />
        </div>
        <div className="bg-white lg:row-span-1">
          <HomeCard
            product={products.filter((products) => products.pid == '116')[0]}
          />
        </div>
        <div className="bg-pink-600 lg:row-span-1">
          <HomeCard
            product={products.filter((products) => products.pid == '117')[0]}
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const pidArray = HOME_PID_ARRAY
  const products: ProductType[] = []

  for (let i = 0; i < pidArray.length; i++) {
    products.push(await getProductById(pidArray[i]))
  }
  return {
    props: { products },
  }
}
export default Home
