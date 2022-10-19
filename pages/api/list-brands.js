import { getBrands } from "../../lib/pages/brand"

export default async function handler(req, res) {
  const {skip} = req.query

  if (!skip) {
    res.status(401).json({message: "Invalid API"})
  }

  const data = await getBrands(skip)
  if (!data) {
    res.status(401).json({message: "Something went wrong"}) 
  } 

  res.status(200).json(data)
  res.end()
}