import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUpDown} from '@fortawesome/free-solid-svg-icons'

export default function Search() {
  const [query, setQuery] = useState('') 

  return (
    <div className='hidden lg:flex h-fit  w-[50%]'>
      <Filter />
      <input
        name='search'
        value={query}
        className='p-3 text-sm font-medium flex-grow focus:outline-none foucs:border-none'
        autoComplete='search'
        placeholder='Search here'
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className='rounded-r-full bg-primary-color text-white py-3 px-10 text-sm font-medium hover:opacity-90'>
        Search
      </button>
    </div>
  )
}

function Filter() {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState(['All Categories'])
  const [activeFilter, setActiveFilter] = useState(filters[0])

  useEffect(() => {
    setFilters(['All Categories'])

    fetch('/api/category-names')
      .then((res) => res.json())
      .then(({ categories }) => {
        setFilters([...filters, ...categories.map(({name}) => name)])})
  }, [])


  return (
    <div
      className={`relative bg-white inline-block p-3 text-sm font-medium ${
        open ? 'rounded-l-2xl' : 'rounded-l-full'
      } border-r border-r-gray-300 transition-all h-fit cursor-pointer`}
    >
      <div
        className='flex items-center space-x-2'
        onClick={() => setOpen(true)}
      >
        <span>{activeFilter}</span>
        <FontAwesomeIcon icon={faUpDown} className='text-gray-500' />
      </div>
      {open && (
        <>
          <div className='fixed inset-0 z-40' onClick={() => setOpen(false)} />
          <div className='absolute right-0 top-0 rounded-l-2xl shadow-md z-50 bg-white text-sm font-medium h-fit w-full'>
            {filters.map((filter) => (
              <div
                key={filter}
                className={`${
                  activeFilter === filter ? 'bg-gray-200' : 'bg-white'
                } border-y last:border-none border-gray-300 p-3 first:rounded-tl-2xl last:rounded-bl-2xl`}
                onClick={() => {
                  setOpen(false)
                  setActiveFilter(filter)
                }}
              >
                {filter}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}