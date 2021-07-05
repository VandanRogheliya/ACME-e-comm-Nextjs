import '../styles/globals.css'
import type { AppProps } from 'next/app'

//Layout is Just a Container aligning all the elements to the center.
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
