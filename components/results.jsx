import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import ListGroup from './group/list-group'
import useFilter from './hooks/use-filter'
import usePagination from './hooks/use-pagination'

export default function Results({ brands=false, deals = false, collections = false, id }) {
  const [activeFilters, FiltersPanel, showPanel] = useFilter(brands, deals, collections)
  const [skip, setTotalProducts, PagePanel] = usePagination(3)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  // Magically generate products results based on id and activeFilters
  useEffect(() => {
    setLoading(true)

    // Adjust the activefilters to contain only the id 
    // of the queried deal or collection.
    const adjusted_filter = { ...activeFilters }
    if (deals) adjusted_filter['deals'] = id
    else if (collections) adjusted_filter['collections'] = id
    else if (brands) adjusted_filter['brands'] = id
    else adjusted_filter['pattern'] = id

    fetch(
      `/api/filter-products?skip=${skip}&filters=${encodeURIComponent(
        JSON.stringify(adjusted_filter)
      )}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setProducts(data.products)
        setTotalProducts(data.pages.count)
      })
  }, [activeFilters, skip])

  return (
    <div id='list-top' className='relative grid grid-cols-1 lg:grid-cols-7 gap-5 my-6'>
      <div className='lg:col-span-2'>
        <FiltersPanel />
      </div>
      <div className='lg:col-span-5'>
        <div className='lg:hidden flex justify-end gap-2 mb-1'>
          <button className='bg-white px-3 py-1 rounded-xl focus:transform focus:scale-[1.07]' onClick={() => showPanel(true)}>
            <FontAwesomeIcon icon={faFilter} className='text-primary-color' />
            <span className='font-medium text-sm text-gray-800 leading-none'>
              filter
            </span>
          </button>
        </div>
        <ListGroup loading={loading} products={products} />
        <PagePanel />
      </div>
    </div>
  )
}
