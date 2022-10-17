import { getFilteredProducts } from "../../lib/product"

export default async function handler(req, res) {
  const filters = JSON.parse(req.query.filters)
  const skip = req.query.skip

  if (!filters) {
    res.status(401).json({message: "Invalid API"}) 
  }

  const data = await getFilteredProducts({...filters, ['brand']: filters.brands?.shift()}, skip)
  if (!data) {
    res.status(401).json({message: "Something went wrong"}) 
  }

  res.status(200).json(data)
  res.end()
}