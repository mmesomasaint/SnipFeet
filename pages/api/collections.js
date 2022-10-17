import { getAllCollections } from "../../lib/category";

export default async function handler(_, res) {
  const collections = await getAllCollections()
  if (!collections) {
    res.status(401).json({message: "Something went wrong"}) 
  } 

  res.status(200).json({collections})
  res.end()
}