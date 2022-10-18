import { getProductsByQuery } from "../../lib/product"

export default async function handler(req, res) {
  let {filter, q} = req.query
  if (q === '') q = '##'
  if (filter === '0') filter = []

  const results = await getProductsByQuery(q, filter)
  if (!results) {
    res.status(401).json({message: "Something went wrong"}) 
  }

  res.status(200).json({results})
  res.end()
} 