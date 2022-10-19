import { getDealBySlug, getSlugs } from '../../lib/pages/hotdeals'
import Head from 'next/head'
import Header from '../../components/header/header'
import Footer from '../../components/footer'
import Results from '../../components/results'

export default function HotDeal({ deal }) {
  const title = (deal ? 'HotDeal | ' + deal.name : 'Deal') + ' - SnipFeet'
  return (
    <div className='bg-[#b9f8e9]'>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <section className='bg-white'>
        <div className='px-2 py-5 sm:max-w-7xl sm:mx-auto'>
          <span className='text-4xl font-bold '>{deal?.name}</span>
        </div>
      </section>
      <main className='sm:max-w-7xl sm:mx-auto px-2'>
        <Results id={deal?.id} deals />
      </main>
      <Footer />
    </div>
  )
}

export const getStaticProps = async ({ params }) => {
  const deal = await getDealBySlug(params.slug)

  return {
    props: {
      deal,
    },
    revalidate: 10,
  }
}

export const getStaticPaths = async () => {
  const slugs = await getSlugs()

  return {
    paths: slugs.map((slug) => `/hot-deals/${slug}`),
    fallback: true,
  }
}
