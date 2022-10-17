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

export async function getFilteredProducts(filters, skip) {
  const data = await fetchAPI(
    `
    query MyQuery($skip: IntType, $brand: ItemId, $categories: [ItemId], $colors: [ItemId], $deals: [ItemId], $sizes: [ItemId]) {
      products: allProducts(first:3, skip: $skip, filter: {brand: {eq: $brand}, categories: {anyIn: $categories}, colors: {anyIn: $colors}, deals: {anyIn: $deals}, sizes: {anyIn: $sizes}}) {
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
      pages: _allProductsMeta (filter: {brand: {eq: $brand}, categories: {anyIn: $categories}, colors: {anyIn: $colors}, deals: {anyIn: $deals}, sizes: {anyIn: $sizes}}) {
        count
      }
    }
    ${responsiveImageFragment}
    `, {
      variables: {
        skip: skip,
        brand: filters.brand,
        categories: filters.collections,
        colors: filters.colors, 
        deals: filters.deals, 
        sizes: filters.sizes
      }
    }
  )

  return data
}