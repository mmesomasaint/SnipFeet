import Head from 'next/head'
import Header from '../../components/header/header'
import Footer from '../../components/footer'
import Results from '../../components/results'

import { getAllCollectionSlugs, getCollectionBySlug } from '../../lib/category'
import { Image } from 'react-datocms'

export default function Collection({ collection }) {
  return (
    <div className=' bg-[#b9f8e9]'>
      <Head>
        <title>{collection?.name} | SnipFeet</title>
      </Head>
      <Header />
      <main className='sm:max-w-7xl sm:mx-auto px-2'>
      <div className='relative mt-6'>
        <div className='absolute inset-0 z-10 bg-[rgba(0,0,0,0.35)] rounded-xl flex justify-center items-center'><span className='text-4xl text-white font-bold'>{collection?.name}</span></div>
        {collection && <Image data={collection.image.responsiveImage} className='rounded-xl' />}</div>
        <Results id={collection?.id} collections />
      </main>
      <Footer />
    </div>
  )
}

export const getStaticPaths = async () => {
  const slugs = await getAllCollectionSlugs()

  return {
    paths: slugs.map((slug) => `/collections/${slug}`),
    fallback: true,
  }
}

export const getStaticProps = async ({ params }) => {
  const collection = await getCollectionBySlug(params.slug)

  return {
    props: {
      collection,
    },
  }
}
