import fetchAPI from "../fetchApi";
import { responsiveImageFragment } from "../fragments";

export async function getHomeData() {
  // Get latest top deals
  return fetchAPI(
    `
      query HomeQuery {
        showcase {
          showcase {
            basename
            responsiveImage(imgixParams: {fit: crop, fm: jpg, h: "400", w: "800"}) {
              ...responsiveImageFragment
            }
          }
          miniad1  {
            basename
            responsiveImage(imgixParams: {fit: crop, fm: jpg, h: "430", w: "700"}) {
              ...responsiveImageFragment
            }
          }
          miniad2  {
            basename
            responsiveImage(imgixParams: {fit: crop, fm: jpg, h: "430", w: "700"}) {
              ...responsiveImageFragment
            }
          }
        }
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
        dailyDeals: hotDeal(filter: {name: {eq: "Daily Deals"}}) {
          name
          slug
        }
        dailyDealsProducts: allProducts (first: 6, filter: {deals: {anyIn: 32783072}}) {
          slug
          name
          price
          mainImage {
            responsiveImage(imgixParams: {fit: crop, fm: jpg, h: "2000", w: "2000"}) {
              alt
              src
            }
          }
        }
      }
      ${responsiveImageFragment}
    `
  )
}