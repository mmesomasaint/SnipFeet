import fetchAPI from "../fetchApi";
import { responsiveImageFragment } from "../fragments";

export function getBrands(skip=0) {
  return fetchAPI(
    `
      query MyQuery($skip: IntType) {
        brands: allBrands(first: 5, skip: $skip) {
          logo {
            responsiveImage(imgixParams: {fit: crop, fm: jpg, h: "200", w: "200"}) {
              ...responsiveImageFragment
            }
          }
          slug
          name
        }
        pages: _allBrandsMeta {
          count
        }
      }
      ${responsiveImageFragment}
    `, {
      variables: {
        skip
      }
    }
  )
}

export async function getSlugs() {
  const data = await fetchAPI(
    `
      {
        slugs: allBrands {
          slug
        }
      }
    `
  )

  return data.slugs
}

export async function getBrandBySlug(slug) {
  const data = await fetchAPI(
    `
      query MyQuery($slug: String) {
        brand(filter: {slug: {eq: $slug}}) {
          id
          slug
          name
          logo {
            responsiveImage(imgixParams: {fit: crop, fm: jpg, h: "400", w: "400"}) {
              ...responsiveImageFragment
            }
          }
          selections {
            name
            products {
              id
              slug
              name
              price
              mainImage {
                responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 260, h: 260}) {
                  ...responsiveImageFragment
                }
              }
            }
          }
        }
      }
      ${responsiveImageFragment}
    `, {
      variables: {
        slug
      }
    }
  )

  return data.brand
}
