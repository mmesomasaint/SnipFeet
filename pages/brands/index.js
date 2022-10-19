import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Image } from 'react-datocms'
import Footer from '../../components/footer'
import Header from '../../components/header/header'
import usePagination from '../../components/hooks/use-pagination'
import { getBrands } from '../../lib/pages/brand'

export default function Brands({ initBrands }) {
  const [brands, setBrands] = useState(initBrands)
  const [skip, setTotalProducts, PagePanel] = usePagination(5)


  useEffect(() => {
    fetch(`/api/list-brands?skip=${skip}`)
      .then((res) => res.json())
      .then((data) => {
        setTotalProducts(data.pages.count)
        setBrands(data.brands)
      })
  }, [skip])

  return (
    <div className=' bg-[#b9f8e9]'>
      <Head>
        <title>Brands - SnipFeet</title>
      </Head>
      <Header />
      <section className="bg-white">
        <div className="px-2 py-5 sm:max-w-7xl sm:mx-auto"><span className="text-4xl font-bold ">Brands</span></div>
      </section>
      <main className='sm:max-w-7xl sm:mx-auto px-2'>
        <div className='my-6 bg-white rounded-xl p-3 grid grid-cols-5 gap-2 place-items-center'>
          {brands.map((brand) => (
            <div className='w-[200px]'>
              <Image data={brand.logo.responsiveImage} />
              <span className='block w-full text-center text-lg font-bold text-gray-800 leading-none my-2'>
                <Link href={`/brands/${brand.slug}`}>{brand.name}</Link>
              </span>
            </div>
          ))}
        </div>
        <PagePanel />
      </main>
      <Footer />
    </div>
  )
}

export const getStaticProps = async () => {
  const data = await getBrands()
  return {
    props: {
      initBrands: data.brands,
    },
    revalidate: 10,
  }
}
