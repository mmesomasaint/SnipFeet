import { getAllDeals } from "../../lib/pages/hotdeals";

export default async function handler(_, res) {
  const hotDeals = await getAllDeals()
  if (!hotDeals) {
    res.status(401).json({message: "Something went wrong"}) 
  } 

  res.status(200).json({hotDeals})
  res.end()
}