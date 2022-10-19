import ProductCard from "../product/product-card"

export default function GroupCard({ title, products}) {
  return (
    <div className="rounded-xl my-6">
      <div className="h-16 pl-1 sm:pl-5 flex items-center gap-4 rounded-t-xl bg-primary-color">
        <span className="text-xl font-bold text-white bg-primary-color leading-none uppercase">{title}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 place-items-center  rounded-b-xl bg-white">
        {products.map(product => (
          <ProductCard.LongVerticalCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  )
}