import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default function Search({ mini }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [activeFilter, Filter] = useCategoryFilter()

  useEffect(() => {
    fetch(`/api/search-products?q=${query}&filter=${activeFilter.id}`)
      .then((res) => res.json())
      .then((data) => setResults(data.results))
  }, [activeFilter, query])

  return (
    <>
      {mini ? (
        <div className='relative w-full'>
          <div className='h-fit p-2 flex lg:hidden'>
            <input
              name='search'
              value={query}
              className='p-3 text-sm font-medium flex-grow focus:outline-none focus:border-none rounded-l-xl'
              autoComplete='search'
              placeholder='Search here'
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className='rounded-r-xl bg-primary-color text-white py-3 px-5 text-sm font-medium hover:opacity-90'>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
          {results.length > 0 && <ResultsBox results={results} />}
        </div>
      ) : (
        <div className='hidden lg:flex h-fit w-[50%]'>
          <Filter />
          <input
            name='search'
            value={query}
            className='p-3 text-sm font-medium flex-grow focus:outline-none focus:border-none'
            autoComplete='search'
            placeholder='Search here'
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className='rounded-r-full bg-primary-color text-white py-3 px-10 text-sm font-medium hover:opacity-90'>
            Search
          </button>
        </div>
      )}
    </>
  )
}

function ResultsBox({ results }) {
  return (
    <div className='absolute top-[100%] z-50 w-full max-h-[calc(100%_*_5)] p-2 rounded bg-white overflow-y-auto'>
      {results?.map((result) => (
        <div className='py-2 text-lg font-medium text-gray-700'>
          <Link href={`/search?q=${result.name}`}>{result.name}</Link>
        </div>
      ))}
    </div>
  )
}

function useCategoryFilter() {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState([{ name: 'All Collections', id: 0 }])
  const [activeFilter, setActiveFilter] = useState(filters[0])

  useEffect(() => {
    setFilters([{ name: 'All Collections', id: 0 }])

    fetch('/api/collection-id')
      .then((res) => res.json())
      .then(({ categories }) => {
        setFilters((prev) => [...prev, ...categories])
      })
  }, [])

  return [
    activeFilter,
    () => (
      <div
        className={`relative bg-white inline-block p-3 text-sm font-medium ${
          open ? 'rounded-l-2xl' : 'rounded-l-full'
        } border-r border-r-gray-300 transition-all h-fit cursor-pointer`}
      >
        <div
          className='flex items-center space-x-2'
          onClick={() => setOpen(true)}
        >
          <span>{activeFilter.name}</span>
          <FontAwesomeIcon icon={faUpDown} className='text-gray-500' />
        </div>
        {open && (
          <>
            <div
              className='fixed inset-0 z-40'
              onClick={() => setOpen(false)}
            />
            <div className='absolute right-0 top-0 rounded-l-2xl shadow-md z-50 bg-white text-sm font-medium h-fit w-full'>
              {filters.map((filter) => (
                <div
                  key={filter.id}
                  className={`${
                    activeFilter.name === filter.name
                      ? 'bg-gray-200'
                      : 'bg-white'
                  } border-y last:border-none border-gray-300 p-3 first:rounded-tl-2xl last:rounded-bl-2xl`}
                  onClick={() => {
                    setOpen(false)
                    setActiveFilter(filter)
                  }}
                >
                  {filter.name}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    ),
  ]
}
