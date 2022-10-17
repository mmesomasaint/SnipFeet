import React, { useCallback, useEffect, useState } from "react";
import ProductCard from "../product/product-card";
import useWindowSize from "../hooks/use-window-size"
import Slider from "../slider";

export default function InnerNav({header='new header', products=[]}) {
  const categories = products.map((product) =>
  product.categories.map((category) => category.name)
  )
  const navs = [...new Set(...categories)]
  const content = (_) => {
    return products.filter((product) =>
    product.categories.some((category) => category.name === _)
    )
  }
  
  const size = useWindowSize()
  const [activeNav, setActiveNav] = useState(navs[0])
  const [contentList, setContentList] = useState(content(activeNav))
  const [groups, setGroups] = useState(group(contentList, size.width))

  // Update grouping system when size of window size or content changes.
  useEffect(() => {
    setGroups(group(contentList, size.width))
  }, [size.width, contentList])

  return (
    <div className='w-full sm:max-w-7xl sm:mx-auto sm:px-3 my-10 bg-white rounded-xl p-1 sm:p-5'>
      <div className='flex flex-wrap justify-between items-center p-1 mb-5'>
        <div className='w-fit my-3 sm:my-0'>
          <div className='text-xl font-bold text-gray-900 bg-white leading-none uppercase'>
            {header}
          </div>
          <div className='w-[40%] h-1 rounded-2xl bg-primary-color mt-1' />
        </div>
        <div className='flex flex-wrap justify-center sm:justify-evenly items-center w-full sm:w-fit'>
          {navs.map((nav) => (
            <div
              key={nav}
              className={`border border-primary-color ${
                activeNav === nav ? 'bg-primary-color' : 'bg-white'
              } mt-3 sm:mt-0 my-1 mx-1 sm:mx-4 px-2 sm:px-4 py-0 sm:py-1 w-fit group cursor-pointer`}
              onClick={() => {
                setActiveNav(nav)
                setContentList(content(nav))
              }}
            >
              <div
                className={`${
                  activeNav === nav ? 'text-white' : 'text-gray-700'
                } text-sm sm:text-base font-bold sm:font-extrabold leading-tight sm:leading-none group-hover:opacity-60 uppercase`}
              >
                {nav.replace('Collection', '')}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Content groups={groups} />
    </div>
  )
}

function Content({groups}) {
  const SlideManager = useCallback(() => {
    return (
      <Slider>
        {groups.map((group, idx) => (
          <div key={`group-${idx}`} className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-1 sm:gap-0'>
            {group.map((product) => (
              <ProductCard.ExtraLongVerticalCard
                key={product.slug}
                product={product}
              />
            ))}
          </div>
        ))}
      </Slider>
    )
  }, [groups])

  return (
    <SlideManager />
  )
}

function group(list, screenWidth) {
  const sm = 640,
    md = 768,
    lg = 1024,
    groupedList = []

  let skip = 2

  if (screenWidth >= lg) skip = 5
  else if (screenWidth >= md) skip = 4
  else if (screenWidth >= sm) skip = 3

  let start, end
  for (
    start = 0, end = skip;
    end < (list.length + skip);
    start += skip, end += skip
  ) {
    groupedList.push(list.slice(start, end))
  }

  return groupedList
}