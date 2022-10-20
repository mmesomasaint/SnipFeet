import { getContent } from '../lib/pages/ourstory'
import { Image, StructuredText } from 'react-datocms'
import Head from 'next/head'
import Header from '../components/header/header'
import Footer from '../components/footer'

export default function OurStory({ ourStory }) {
  return (
    <div className='bg-[#b9f8e9]'>
      <Head>
        <title>Our Story | SnipFeet</title>
      </Head>
      <Header />
      <main className='sm:max-w-7xl sm:mx-auto px-2 py-4'>
        <Image data={ourStory.centerImage.responsiveImage} className='rounded-xl my-4' />
        <div className='prose lg:prose-2xl mx-auto block px-4 py-7 rounded-xl bg-white'>
          <StructuredText data={ourStory.content} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export const getStaticProps = async () => {
  const ourStory = await getContent()

  return {
    props: {
      ourStory,
    },
  }
}
