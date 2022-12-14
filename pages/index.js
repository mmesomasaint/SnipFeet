import Head from 'next/head'
import { Image } from 'react-datocms'
import Marquee from 'react-fast-marquee'
import CollectionCard from '../components/collection/collection-card'
import Deal from '../components/group/deal'
import Footer from '../components/footer'
import Header from '../components/header/header'
import InnerNav from '../components/group/inner-nav'
import ProductCard from '../components/product/product-card'
import Slider from '../components/slider'
import { getHomeData } from '../lib/pages/home'

export default function Home({showcase, recent, topCollections, newProducts, dailyDeals}) {
  return (
    <div className='bg-[#b9f8e9]'>
      <Head>
        <title>Home - SnipFeet</title>
      </Head>
      <Header />

      <main className='bg-[#b9f8e9] sm:max-w-7xl sm:mx-auto px-2 my-6'>
        <div className='grid grid-cols-1 lg:grid-cols-7 gap-4 mb-7'>
          <div className='lg:col-span-5 rounded-sm'>
            <Slider loop dots autoplay>
              {showcase.showcase.map((c) => (
                <Image key={c.basename} data={c.responsiveImage} />
              ))}
            </Slider>
          </div>
          <div className='lg:col-span-2 flex justify-center lg:grid lg:grid-cols-1 lg:place-items-center gap-4 w-full'>
            <div className=''>
              <Image data={showcase.miniad1.responsiveImage} />
            </div>
            <div className=''>
              <Image data={showcase.miniad2.responsiveImage} />
            </div>
          </div>
        </div>

        <div className='grid place-items-center grid-cols-1 space-y-3 md:grid-cols-3 md:space-y-0 mb-7'>
          {topCollections.map((collection) => (
            <CollectionCard collection={collection} key={collection.slug} />
          ))}
        </div>
        
        <div className='p-5 bg-white rounded-xl'>
          <Marquee pauseOnHover gradient={false}>
            {recent.map((product) => (
              <ProductCard.ShortVerticalCard
                product={product}
                key={product.id}
              />
            ))}
          </Marquee>
        </div>


        <InnerNav header='New Products' products={newProducts} />

        <Deal deal={dailyDeals} />

      </main>

      <Footer />
    </div>
  )
}

export const getStaticProps = async ({ preview=false }) => {
  const data = await getHomeData()

  return {
    props: {
      showcase: data.showcase,
      recent: data.recent,
      topCollections: data.categories,
      newProducts: data.newProducts,
      dailyDeals: {
        ...data.dailyDeals,
        products: data.dailyDealsProducts
      }
    },
    revalidate: 10,
  }
}
