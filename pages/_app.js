import '../styles/globals.css'
import { SnipcartProvider } from 'use-snipcart'
import { WishListProvider } from '../components/hooks/use-wishlist'

function MyApp({ Component, pageProps }) {
  return (
    <SnipcartProvider>
      <WishListProvider>
        <Component {...pageProps} />
      </WishListProvider>
    </SnipcartProvider>
  )
}

export default MyApp
