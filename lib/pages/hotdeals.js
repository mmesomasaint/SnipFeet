import fetchAPI from "../fetchApi";

export async function getAllDeals() {
  const data = await fetchAPI(
    `
      {
        hotDeals: allHotDeals {
          slug
          name
        }
      }
    `
  )

  return data.hotDeals
}

export async function getSlugs() {
  const data = await fetchAPI(
    `
      {
        slugs: allHotDeals {
          slug
        }
      }
    `
  )

  return data.slugs
}

export async function getDealBySlug(slug) {
  const data = await fetchAPI(
    `
      query MyDeal($slug: String) {
        hotDeal(filter: {slug: {eq: $slug}}) {
          id
          slug
          name
        }
      }
    `, {
      variables: {
        slug
      }
    }
  )

  return data.hotDeal
}

export function getDealProducts(dealID, skip=0) {
  return fetchAPI(
    `
      query DealProduct($skip: IntType, $dealID: [ItemId]) {
        products: allProducts(first: 10, skip: $skip, filter: {deals: {anyIn: $dealID}}) {
          id
          slug
          name
          price
          mainImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 300, h: 300}) {
              ...responsiveImageFragment
            }
          }
        }
        _allProductsMeta {
          count
        }
      }
    `, {
      variables: {
        skip,
        dealID
      }
    }
  )
}