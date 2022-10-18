import Head from "next/head"
import Footer from "../components/footer"
import Header from "../components/header/header"
import Results from "../components/results"

export default function Search({query}) {
  return (
    <div className=" bg-[#b9f8e9]">
      <Head>
      <title>Search - {query} | SnipFeet</title>
      </Head>
      <Header />
      <section className="bg-white">
        <div className="px-2 py-5 sm:max-w-7xl sm:mx-auto"><span className="text-4xl font-bold ">Results for: {query}</span></div>
      </section>
      <main className='sm:max-w-7xl sm:mx-auto px-2'>
        <Results id={query} />
      </main>
      <Footer />
    </div>
  )
}

export const getServerSideProps = ({query}) => {
  const first = 10
  const results = 0

  return {
    props: {
      query: query.q,
      skip: first,
      results
    }
  }
}