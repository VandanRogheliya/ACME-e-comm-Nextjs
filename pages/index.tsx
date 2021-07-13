import Navbar from '@components/common/Navbar'
import Footer from '@components/common/Footer'
import Card from '@components/card/Card'
import HomeCard from '@components/card/HomeCard'
import HomeCardHero from '@components/card/HomeCardHero'
import { PID_ARRAY } from '@lib/constants'
import { ProductType } from '@lib/types/common'
import { getProductById } from '@lib/util/common'
import { GetStaticProps } from 'next'
import { useEffect } from 'react'

type Props = {
  products: ProductType[]
}

const Home = ({ products }: Props) => {
  useEffect(() => {
   console.log(products) 
  },[])
  return (
    <div>
      <Navbar />
      <div className="flex  flex-col flex-intial lg:flex-row">
        <div className="grid lg:grid-cols-7">
          <div className="lg:col-span-5 lg:row-span-4">
            <HomeCardHero />
          </div>
          <div className="lg:row-span-3 lg:col-span-2">
            {/* <HomeCard />  */}
          </div>
        </div>
      </div>
      <Card product={products[0]} />
      <Footer />
    </div>
  )
}

export const getStaticProps: GetStaticProps =async () => {
  const pidArray = PID_ARRAY
  const products: ProductType[] = []
  // pidArray.forEach(async (pid) => products.push(await getProductById(pid)))
  for (let i = 0; i < pidArray.length; i++){
    products.push(await getProductById(pidArray[i]))
  }
  return {
    props: { products:JSON.stringify(products) },
  }
}
export default Home
