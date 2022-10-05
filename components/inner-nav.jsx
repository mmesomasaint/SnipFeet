import { faCircleArrowLeft, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import LinkBox from "./link-box";
import ProductCard from "./product-card";

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
    
  const [activeNav, setActiveNav] = useState(navs[0])
  const [contentList, setContentList] = useState(content(activeNav))

  return (
    <div className='w-full sm:max-w-7xl sm:mx-auto sm:px-1 my-10'>
      <div className="flex flex-wrap justify-between items-center px-1 py-3">
        <div className='w-fit'>
          <div className='text-xl font-bold text-gray-900 bg-white leading-none uppercase'>
            {header}
          </div>
          <div className='w-[40%] h-1 rounded-2xl bg-primary-color mt-1' />
        </div>
        <div className="flex justify-evenly items-center">
          {navs.map((nav) => (
            <LinkBox
              key={nav}
              active={activeNav === nav}
              setActive={() => {
                setActiveNav(nav)
                setContentList(content(nav))
              }}
            >
              {nav.replace('Collection', '')}
            </LinkBox>
          ))}
        </div>
      </div>
      <Content contentList={contentList} />
    </div>
  )
}

function Content({contentList}) {
  const SKIP = 4
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(SKIP)
  const [activeContent, setActiveContent] = useState(
    contentList.slice(start, end)
  )

  useEffect(() => {
    setActiveContent(contentList.slice(start, end))
  }, [start, end])

  useEffect(() => {
    setStart(0)
    setEnd(SKIP)
    setActiveContent(contentList.slice(0, SKIP))
  }, [contentList])

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 space-y-5 sm:space-y-0 place-items-center'>
        {activeContent.map((product) => (
          <ProductCard.ExtraLongVerticalCard
            key={product.slug}
            product={product}
          />
        ))}
      </div>
      <div className='w-full flex items-center justify-end space-x-2 pr-10 mt-5'>
        <button
          type='button'
          disabled={start === 0}
          className='disabled:opacity-50'
          onClick={() => {
            setStart((prev) => prev - SKIP)
            setEnd((prev) => prev - SKIP)
          }}
        >
          <FontAwesomeIcon icon={faCircleArrowLeft} className='text-primary-color text-3xl' />
        </button>
        <button
          type='button'
          disabled={end >= contentList.length - 1}
          className='disabled:opacity-50'
          onClick={() => {
            setStart((prev) => prev + SKIP)
            setEnd((prev) => prev + SKIP)
          }}
        >
          <FontAwesomeIcon icon={faCircleArrowRight} className='text-primary-color text-3xl' />
        </button>
      </div>
    </div>
  )
}