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
        product(filter: {slug: {eq: $slug}}) {
          id
          slug
          name
          price
          sizes {
            name
          }
          categories {
            name
            slug
          }
          colors {
            name
          }
          gallery {
            responsiveImage(imgixParams: {fit: crop, fm: jpg, w: "1000", h: "900"}) {
              ...responsiveImageFragment
            }
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