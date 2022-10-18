import fetchAPI from "./fetchApi";
import { responsiveImageFragment } from "./fragments";

export async function getAllCollectionNames() {
  const data = await fetchAPI(
    `
    {
      categories: allCategories {
        id
        name
      }
    }
    `
  )

  return data.categories
}

export async function getAllCollectionSlugs() {
  const data = await fetchAPI(
    `
      {
        slugs: allCategories {
          slug
        }
      }
    `
  )

  return data.slugs
}

export async function getAllCollections() {
  const data = await fetchAPI(
    `
      {
        collections: allCategories {
          slug
          name
          image {
            responsiveImage(imgixParams: {fit: crop, fm: jpg, h: "400", w: "1000"}) {
              ...responsiveImageFragment
            }
          }
        }
      }
      ${responsiveImageFragment}
    `
  )

  return data.collections
}

export async function getCollectionBySlug(slug) {
  const data = await fetchAPI(
    `
      query MyQuery($slug: String) {      
        collection: category(filter: {slug: {eq: $slug}}) {
          id
          name
          image {
            responsiveImage(imgixParams: {fit: crop, fm: jpg, h: "350", w: "1500"}) {
              ...responsiveImageFragment
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
  return data.collection 
}