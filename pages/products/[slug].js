import Head from "next/head"
import Footer from "../../components/footer"
import Header from "../../components/header/header"
import ProductInfo from "../../components/product/product-info"
import { getProductBySlug, getProductSlug } from "../../lib/product"

export default function Product({product}) {
  if (product) return (
    <div className=" bg-[#b9f8e9]">
      <Head>
        <title>{product.name} | SnipFeet</title>
      </Head>
      <Header />
      <section className="bg-white">
        <div className="px-2 py-5 sm:max-w-7xl sm:mx-auto"><span className="text-4xl font-bold ">{product.name}</span></div>
      </section>
      <main className='sm:max-w-7xl sm:mx-auto px-2'>
        {product && <ProductInfo product={product} />}
      </main>
      <Footer />
    </div>
  )
}

export const getStaticPaths = async() => {
  const slugs = await getProductSlug()

  return {
    paths: slugs.map(slug => `/products/${slug}`),
    fallback: true
  } 
}

export const getStaticProps = async({preview=false, params}) => {
  const product = await getProductBySlug(params.slug, preview) 
  return {
    props: {
      product
    }, 
    revalidate: 10
  }
}