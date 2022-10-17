import fetchAPI from "./fetchApi";

export function getAllFilters() {
  return fetchAPI(
    `
      {
        collections: allCategories {
          id
          name
        }
        brands: allBrands {
          id
          name
        }
        colors: allColors {
          id
          name
        }
        sizes: allSizes {
          id
          name
        }
        deals: allHotDeals {
          id
          name
        }
      }
    `
  )
}

export function getProductsFilters() {
  //...
}