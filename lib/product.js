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