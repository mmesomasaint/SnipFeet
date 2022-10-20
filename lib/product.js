import fetchAPI from './fetchApi'
import { responsiveImageFragment } from './fragments'

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
    `,
    {
      preview,
      variables: {
        slug,
      },
    }
  )

  return data.product
}

export async function getFilteredProducts(filters, skip) {
  const data = await fetchAPI(
    `
    query MyQuery($skip: IntType, $pattern: String="", $brand: ItemId, $categories: [ItemId], $colors: [ItemId], $deals: [ItemId], $sizes: [ItemId]) {
      products: allProducts(first:3, skip: $skip, filter: {name: {matches: {pattern: $pattern}}, brand: {eq: $brand}, categories: {anyIn: $categories}, colors: {anyIn: $colors}, deals: {anyIn: $deals}, sizes: {anyIn: $sizes}}) {
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
    `,
    {
      variables: {
        skip: skip,
        brand: filters.brands,
        categories: filters.collections,
        colors: filters.colors,
        deals: filters.deals,
        sizes: filters.sizes,
        pattern: filters.pattern,
      },
    }
  )

  return data
}

export async function getProductsByQuery(query, filter) {
  const data = await fetchAPI(
    `
      query MyQuery($query: String!, $filter: [ItemId]) {
        results: allProducts(filter: {name: {matches: {pattern: $query}}, categories: {anyIn: $filter}}) {
          name
        }
      }
    `,
    {
      variables: {
        query,
        filter,
      },
    }
  )

  return data.results
}

export async function getProductsInList(list = []) {
  const data = await fetchAPI(
    `
      query MyQuery($list: [ItemId]) {
        products: allProducts(first: 10, filter: {id: {in: $list}}) {
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
        pages: _allProductsMeta(filter: {id: {in: $list}}) {
          count
        }
      }
      ${responsiveImageFragment}
    `,
    {
      variables: {
        list,
      },
    }
  )

  return data
}
