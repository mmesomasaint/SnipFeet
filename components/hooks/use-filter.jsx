import { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

export default function useFilter(isDeals = false, isCollections = false) {
  const DEFAULTFILTERS = {
    collections: [],
    brands: [],
    colors: [],
    sizes: [],
    deals: [],
  }
  const [filters, setFilters] = useState(DEFAULTFILTERS)
  const [activeFilters, setActiveFilters] = useState(DEFAULTFILTERS)
  const [showFiltersPanel, setShowFiltersPanel] = useState(false)

  useEffect(() => {
    fetch('/api/filters')
      .then((res) => res.json())
      .then((data) => {
        // Set all filters to inactive.
        for (const key in data) {
          data[key] = data[key].map((obj) => ({ ...obj, ['active']: false }))
        }
        setFilters(data)
      })
  }, [])

  useEffect(() => {
    const active_list = {}
    // Select only active filters.
    for (const key in filters) {
      active_list[key] = filters[key]
        .filter((obj) => obj.active === true)
        .map((obj) => obj.id)
    }
    setActiveFilters(active_list)
  }, [filters])

  const updateFilters = useCallback((update, key) => {
    setFilters((prev) => ({ ...prev, [key]: update }))
  })

  return [
    activeFilters,
    () => {
      return (
        <>
          {filters && (
            <>
              {showFiltersPanel && <div className='fixed inset-0 z-20 bg-[rgba(0,0,0,0.45)]' onClick={() => setShowFiltersPanel(false)} />}
              <div
                className={`absolute w-full lg:w-fit z-30 lg:static bg-white p-5 rounded-xl flex flex-col gap-4 ${
                  showFiltersPanel ? 'block' : 'hidden'
                } lg:block`}
              >
                <FontAwesomeIcon
                  icon={faClose}
                  className='lg:hidden absolute top-2 right-4 text-primary-color text-xl border border-primary-color w-5 h-5 focus:transform focus:scale-[1.09]'
                  onClick={() => setShowFiltersPanel(false)}
                />
                {!isCollections && (
                  <Collections
                    collections={filters.collections}
                    updateCollections={updateFilters}
                  />
                )}
                <Colors colors={filters.colors} updateColors={updateFilters} />
                <Sizes sizes={filters.sizes} updateSizes={updateFilters} />
                {!isDeals && (
                  <Deals deals={filters.deals} updateDeals={updateFilters} />
                )}
                <Brands brands={filters.brands} updateBrands={updateFilters} />
              </div>
            </>
          )}
        </>
      )
    },
    setShowFiltersPanel,
  ]
}

function Collections({ collections, updateCollections }) {
  return (
    <div>
      <div className='text-base font-semibold leading-none'>Collections</div>
      <div className='flex flex-wrap'>
        {collections.map((collection) => (
          <span
            key={collection.id}
            onClick={() => {
              const newCollections = collections.map((_c) => {
                if (_c.id === collection.id) {
                  _c.active = !collection.active
                }
                return _c
              })
              updateCollections(newCollections, 'collections')
            }}
            className={`border ${
              collection.active ? 'border-green-500' : 'border-gray-500'
            } px-3 py-1 m-2 text-sm font-medium leading-tight rounded-sm cursor-pointer hover:transform hover:scale-[1.06]`}
          >
            {collection.name.replace('Collection', '')}
          </span>
        ))}
      </div>
    </div>
  )
}

function Colors({ colors, updateColors }) {
  return (
    <div>
      <div className='text-base font-semibold leading-none'>Colors</div>
      <div className='flex flex-wrap'>
        {colors.map((color) => (
          <span
            key={color.id}
            onClick={() => {
              const newColors = colors.map((_c) => {
                if (_c.id === color.id) {
                  _c.active = !color.active
                }
                return _c
              })
              updateColors(newColors, 'colors')
            }}
            style={{ backgroundColor: `${color.name}` }}
            className={`border-2 ${
              color.active
                ? 'border-green-500 transform scale-[1.07]'
                : 'transform-none scale-0'
            } w-9 h-9 m-2 text-sm font-medium leading-tight rounded-sm cursor-pointer hover:transform hover:scale-[1.06]`}
          />
        ))}
      </div>
    </div>
  )
}

function Sizes({ sizes, updateSizes }) {
  return (
    <div>
      <div className='text-base font-semibold leading-none'>Sizes</div>
      <div className='flex flex-wrap'>
        {sizes.map((size) => (
          <span
            key={size.id}
            onClick={() => {
              const newSizes = sizes.map((_s) => {
                if (_s.id === size.id) {
                  _s.active = !size.active
                }
                return _s
              })
              updateSizes(newSizes, 'sizes')
            }}
            className={`border ${
              size.active ? 'border-green-500' : 'border-gray-500'
            } flex justify-center items-center w-9 h-9 m-2 text-sm font-medium leading-tight rounded-sm cursor-pointer hover:transform hover:scale-[1.06]`}
          >
            {size.name}
          </span>
        ))}
      </div>
    </div>
  )
}

function Deals({ deals, updateDeals }) {
  return (
    <div>
      <div className='text-base font-semibold leading-none'>Deals</div>
      <div className='flex flex-wrap'>
        {deals.map((deal) => (
          <span
            key={deal.id}
            onClick={() => {
              const newDeals = deals.map((_d) => {
                if (_d.id === deal.id) {
                  _d.active = !deal.active
                }
                return _d
              })
              updateDeals(newDeals, 'deals')
            }}
            className={`border ${
              deal.active ? 'border-green-500' : 'border-gray-500'
            } px-3 py-1 m-2 text-sm font-medium leading-tight rounded-sm cursor-pointer hover:transform hover:scale-[1.06]`}
          >
            {deal.name}
          </span>
        ))}
      </div>
    </div>
  )
}

function Brands({ brands, updateBrands }) {
  return (
    <div>
      <div className='text-base font-semibold leading-none'>Brands</div>
      <div className='flex flex-wrap'>
        {brands.map((brand) => (
          <span
            key={brand.id}
            onClick={() => {
              const newBrands = brands.map((_b) => {
                if (_b.id === brand.id) {
                  _b.active = !brand.active
                }
                return _b
              })
              updateBrands(newBrands, 'brands')
            }}
            className={`border ${
              brand.active ? 'border-green-500' : 'border-gray-500'
            } px-3 py-1 m-2 text-sm font-medium leading-tight rounded-sm cursor-pointer hover:transform hover:scale-[1.06]`}
          >
            {brand.name}
          </span>
        ))}
      </div>
    </div>
  )
}
