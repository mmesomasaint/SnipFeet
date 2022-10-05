export const getStaticPaths = async() => {
  // Get all products slug

  // return { path: slugs.map(slug => `/products/${slug}`), fallback: true}
}

export const getStaticProps = async({preview, params}) => {
  // Use the current params.slug to fetch the data needed for this product page.

  // return { props: {product, similarProduct, relatedHotDeal, }}
}