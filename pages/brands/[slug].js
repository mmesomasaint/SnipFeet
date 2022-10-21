import Head from 'next/head'
import BrandAvatar from '../../components/brand-avatar'
import Footer from '../../components/footer'
import GroupCard from '../../components/group/group-card'
import Header from '../../components/header/header'
import Results from '../../components/results'
import { getBrandBySlug, getSlugs } from '../../lib/pages/brand'

export default function Brand({ brand }) {
  return (
    <div className=' bg-[#b9f8e9]'>
      <Head>
        <title>Brand | {brand?.name} - SnipFeet</title>
      </Head>
      <Header />
      <main className='sm:max-w-7xl sm:mx-auto px-2'>
        <div className='px-2 py-5 sm:max-w-7xl sm:mx-auto flex flex-col gap-2 items-center'>
          <BrandAvatar img={brand?.logo} />
          <span className='text-4xl font-bold '>{brand?.name}</span>
        </div>
        <>
          {brand?.selections?.map((selection) => (
            <GroupCard
              key={selection.name}
              title={selection.name}
              products={selection.products}
            />
          ))}
        </>
        <Results id={brand?.id} brands />
      </main>
      <Footer />
    </div>
  )
}

export const getStaticPaths = async () => {
  const slugs = await getSlugs()

  return {
    paths: slugs.map((slug) => `/brands/${slug}`),
    fallback: true,
  }
}

export const getStaticProps = async ({ params }) => {
  const brand = await getBrandBySlug(params?.slug)

  return {
    props: {
      brand,
    },
    revalidate: 10,
  }
}
