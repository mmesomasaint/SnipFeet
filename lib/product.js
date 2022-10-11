import fetchAPI from "./fetchApi";
import { responsiveImageFragment } from "./fragments";

export async function relatedBy(slug, by={title:'color', value:'brown'}) {
  const data = await fetchAPI(
    `
      query RelationshipQuery($slug: String) {
        related: allProducts(filter: {slug: {eq: $slug}, ${by.title}: {eq: ${by.value}}})
      }
    `
  )
}

export async function getProductSlug() {
  const data = await fetchAPI(
    `
      {
        slugs: allProducts {
          slug
        }
      }
    `
  )

  return data.slugs
}

export async function getProductBySlug(slug, preview) {
  const data = await fetchAPI(
    `
      query MyQuery($slug: String) {
        product: allProducts(filter: {slug: {eq: $slug}}) {
          slug
          categories {
            name
            slug
          }
          colors {
            name
          }
          gallery {
            responsiveImage(imgixParams: {fit: crop, fm: jpg, w: "2000", h: "2000"}) {
              ...responsiveImageFragment
            }
          }
          id
          name
          price
          sizes {
            name
          }
        }
      } 
      
      ${responsiveImageFragment}
    `, {
      preview, 
      variables: {
        slug
      }
    }
  )

  return data.product
}