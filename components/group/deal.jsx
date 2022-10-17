import Link from "next/link"
import ProductCard from "../product/product-card"

export default function Deal({ deal}) {
  const {slug, name, products} = deal
  return (
    <div className="">
      <div className="h-16 pl-1 sm:pl-5 flex items-center gap-4 rounded-t-xl bg-primary-color">
        <span className="text-xl font-bold text-white bg-primary-color leading-none uppercase">{name}</span>
        <span>
          <Link href={`/hot-deals/${slug}`}>See all</Link>
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-b-xl bg-white">
        {products.map(product => (
          <ProductCard.HorizontalCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  )
}