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