import '@styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from 'contexts/auth'
import { CartSidebarProvider } from 'contexts/cartSidebar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartSidebarProvider>
        <Component {...pageProps} />
      </CartSidebarProvider>
    </AuthProvider>
  )
}
export default MyApp
