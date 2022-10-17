import { getDealProducts } from "../../lib/pages/hotdeals";

export default async function handler(_, res) {
  const data = await getDealProducts()
  if (!data) {
    res.status(401).json({message: "Something went wrong"}) 
  } 

  res.status(200).json(data)
  res.end()
}