import fetchAPI from "./fetchApi";
import { responsiveImageFragment } from "./fragments";

export async function getHomeData() {
  // Get latest top deals
  return fetchAPI(
    `
      query HomeQuery {
        newProducts: allProducts(filter: {updatedAt: {gte: "2022-09-19T03:38:06.964Z"}}, first: "15", orderBy: createdAt_DESC) {
          categories {
            name
          }
          mainImage {
            responsiveImage(imgixParams: {fit: crop, fm: jpg, h: "2000", w: "2000"}) {
              ...responsiveImageFragment
            }
          }
          name
          price
          slug
        }
        categories: allCategories(first: 3) {
          slug
          name
          image {
            responsiveImage(imgixParams: {fit: crop, fm: jpg, h: "1000", w: "1000"}) {
              ...responsiveImageFragment
            }
          }
        }
        recent: allProducts(first: "10", orderBy: _createdAt_DESC) {
          mainImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 300, h: 300}) {
              ...responsiveImageFragment
            }
          }
          id
          name
          price
          slug
        }
      }
      ${responsiveImageFragment}
    `
  )
}

export async function getProductData(slug) {
  // Get the main product 
  // Get related products
    // Same size, 
    // Same category,
    // Same color,
  // Get recent products

  return fetchAPI(
    `
      query ProductQuery($slug: String) {
        mainProduct: product(slug: $slug) {
          categories {
            name
          }
          mainImage {
            responsiveImage(imgixParams: {fit: crop, fm: jpg, h: "2000", w: "2000"}) {
              ...responsiveImageFragment
            }
          }
          name
          price
          colors {
            name
          }
          sizes {
            name
          }
          slug
        }
        recent: allProducts(first: "10", orderBy: _createdAt_DESC) {
          mainImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 300, h: 300}) {
              ...responsiveImageFragment
            }
          }
          id
          name
          price
          slug
        }
      }
    `
  )
}