import { getAllCategoryNames } from "../../lib/category";

export default async function handler(req, res) {
  const categories = await getAllCategoryNames()
  if (!categories) {
    res.status(401).json({message: "Something went wrong"}) 
  } 

  res.status(200).json({categories})
  res.end()
}