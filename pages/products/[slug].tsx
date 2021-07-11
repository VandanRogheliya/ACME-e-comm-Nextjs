import { FIREBASE_COLLECTIONS } from '@lib/constants'
import Navbar from '@components/common/Navbar'
import Footer from '@components/common/Footer'
import { firestore } from '@lib/firebase'
import { ProductType } from '@lib/types/common'
import { GetStaticPaths, GetStaticProps } from 'next'
import ProductPage from '@components/products/ProductPage'
import { getProductBySlug } from '@lib/util/common'

const Index = ({ product }) => (
  <>
    <Navbar />
    <ProductPage product={product} />
    <Footer />
  </>
)

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params.slug as string

  const product: ProductType = await getProductBySlug(slug)

  return {
    props: {
      product,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const productsRef = await firestore
    .collection(FIREBASE_COLLECTIONS.PRODUCTS)
    .get()
  const productIDs: string[] = []

  productsRef.forEach((productRef) => productIDs.push(productRef.data().slug))

  const paths = productIDs.map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}
export default Index
