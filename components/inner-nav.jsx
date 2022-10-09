import React, { useCallback, useEffect, useState } from "react";
import ProductCard from "./product-card";
import useWindowSize from "./use-window-size"
import Slider from "./slider";

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
    <div className='w-full sm:max-w-7xl sm:mx-auto sm:px-1 my-10'>
      <div className='flex flex-wrap justify-between items-center px-1 py-3'>
        <div className='w-fit'>
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
              } mt-3 sm:mt-0 my-1 mx-2 sm:mx-4 px-2 sm:px-4 w-fit group cursor-pointer`}
              onClick={() => {
                setActiveNav(nav)
                setContentList(content(nav))
              }}
            >
              <div
                className={`${
                  activeNav === nav ? 'text-white' : 'text-gray-700'
                } text-base font-extrabold group-hover:opacity-60 uppercase`}
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
          <div key={`group-${idx}`} className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 place-items-center'>
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
    lg = 1024,
    groupedList = []

  let skip = 1

  if (screenWidth >= lg) skip = 4
  else if (screenWidth >= sm) skip = 2

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