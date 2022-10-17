import fetchAPI from "./fetchApi";
import { responsiveImageFragment } from "./fragments";

export async function getAllCategoryNames() {
  const data = await fetchAPI(
    `
    {
      categories: allCategories {
        name
      }
    }
    `
  )

  return data.categories
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