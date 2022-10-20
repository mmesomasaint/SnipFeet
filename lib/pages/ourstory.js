import fetchAPI from "../fetchApi";
import { responsiveImageFragment } from "../fragments";

export async function getContent() {
  const data = await fetchAPI(
    `
      {
        ourStory {
          id
          centerImage {
            responsiveImage(imgixParams: {fit: crop, fm: jpg, h: "1000", w: "2000"}) {
              ...responsiveImageFragment
            }
          }
          content {
            value
          }
        }
      }
      ${responsiveImageFragment}
    `
  )

  return data.ourStory
}