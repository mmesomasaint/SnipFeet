import Head from 'next/head'
import { useState, useEffect } from 'react'
import Footer from '../components/footer'
import Header from '../components/header/header'
import usePagination from '../components/hooks/use-pagination'
import useWishList from '../components/hooks/use-wishlist'
import ProductCard from '../components/product/product-card'

export default function WishList() {
  const { list } = useWishList()
  const [wishList, setWishList] = useState([])
  const [skip, setTotalProducts, PagePanel] = usePagination(6)

  useEffect(() => {
    fetch(
      `/api/wish-list-products?skip=${skip}&list=${encodeURIComponent(
        JSON.stringify(list)
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTotalProducts(data.pages.count)
        setWishList(data.products)
      })
  }, [skip])

  return (
    <div className=' bg-[#b9f8e9]'>
      <Head>
        <title>WishList - SnipFeet</title>
      </Head>
      <Header />
      <section className='bg-white'>
        <div className='px-2 py-5 sm:max-w-7xl sm:mx-auto'>
          <span className='text-4xl font-bold '>Your WishList</span>
        </div>
      </section>
      <main className='sm:max-w-7xl sm:mx-auto px-2'>
        {wishList ? (
          <>
            <div className='my-6 bg-white rounded-xl p-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 place-items-center'>
              {wishList?.map((product) => (
                <ProductCard.LongVerticalCard
                  key={product.slug}
                  product={product}
                />
              ))}
            </div>
            <PagePanel />
          </>
        ) : (
          <div className='h-fit w-full text-center font-medium text-sm text-gray-800 py-4 leading-none'>
            You don't like any shoes yet!
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
