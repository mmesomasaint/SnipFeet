import { getProductsInList } from '../../lib/product'

export default async function handler(req, res) {
  const { list, skip } = req.query

  if (!list || !skip) {
    res.status(401).json({ message: 'Invalid API' })
  }

  const data = await getProductsInList(JSON.parse(list), skip)
  if (!data) {
    res.status(401).json({ message: 'Something went wrong' })
  }

  res.status(200).json(data)
  res.end()
}
