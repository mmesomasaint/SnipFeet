import Head from 'next/head'
import CollectionCard from '../components/collection-card'
import Footer from '../components/footer'
import Header from '../components/header'
import InnerNav from '../components/inner-nav'
import ProductCard from '../components/product-card'
import { getHomeData } from '../lib/page'

export default function Home({recent, topCollections, newProducts}) {
  return (
    <div className='bg-white'>
      <Head>
        <title>SnipFeet - Home</title>
      </Head>
      <Header />

      <main className='bg-white'>
        <div className='grid place-items-center grid-cols-1 space-y-3 md:grid-cols-3 md:space-y-0 sm:max-w-7xl sm:mx-auto sm:px-2'>
          {topCollections.map((collection) => (
            <CollectionCard collection={collection} key={collection.slug} />
          ))}
        </div>

        <InnerNav header='New Products' products={newProducts} />

        <div className='bg-gray-100 flex flex-wrap justify-evenly'>
          {recent.map((product) => (
            <ProductCard.ShortVerticalCard product={product} key={product.id} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export const getStaticProps = async ({ preview=false }) => {
  const data = await getHomeData()

  return {
    props: {
      recent: data.recent,
      topCollections: data.categories,
      newProducts: data.newProducts,
    },
    revalidate: 10,
  }
}
