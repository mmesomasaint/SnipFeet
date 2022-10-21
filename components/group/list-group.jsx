import ProductCard from '../product/product-card'

export default function ListGroup({ loading = false, products }) {
  const Output = () => (
    <>
      {products.length > 0 ? (
        products?.map((product) => (
          <ProductCard.LongHorizontal key={product.slug} product={product} />
        ))
      ) : (
        <span className='w-full text-center text-lg font-bold leading-tight my-5 text-gray-800'>
          No Match Found!!
        </span>
      )}
    </>
  )

  return (
    <div className='relative flex flex-col gap-1 bg-white p-1 pb-0 rounded-xl'>
      {loading && (
        <div className='inset-0 absolute bg-[rgba(0,0,0,0.45)] flex justify-center items-center rounded-xl'><Spinner /></div>
      )}
      <Output />
    </div>
  )
}

function Spinner() {
  return (
    <div className=' min-h-fit flex items-center justify-center space-x-3 p-10'>
      <div className='w-8 h-8 border-4 border-gray-700 border-t-transparent border-dotted rounded-full animate-spin' />
    </div>
  )
}
