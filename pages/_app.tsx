import '@styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { AuthProvider } from 'contexts/auth'
import { CartSidebarProvider } from 'contexts/cartSidebar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ACME: Clothing Store</title>
      </Head>
      <AuthProvider>
        <CartSidebarProvider>
          <Component {...pageProps} />
        </CartSidebarProvider>
      </AuthProvider>
    </>
  )
}
export default MyApp
