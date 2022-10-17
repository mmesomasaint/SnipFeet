import { getAllFilters } from "../../lib/filters"

export default async function handler(_, res) {
  const data = await getAllFilters()
  if (!data) {
    res.status(401).json({message: "Something went wrong"}) 
  } 
  
  res.status(200).json(data)
  res.end()
}