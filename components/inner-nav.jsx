import { faCircleArrowLeft, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import LinkBox from "./link-box";
import ProductCard from "./product-card";
import useWindowSize from "./use-window-size"

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
        <div className="flex justify-evenly items-center w-full sm:w-fit">
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
  const size = useWindowSize()
  const [groups, setGroups] = useState([])
  const [activeIndex, setActiveIndex] = useState(0)

  // Re-assign transition if groups change.
  useEffect(() => {
    setActiveIndex(0)
    // Select all slides
    const slides = document.querySelectorAll('.slide')

    // loop through slides and set each slides translateX
    slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${indx * 100}%)`
    })

    // select next slide button
    const nextSlide = document.querySelector('.btn-next')

    // current slide counter
    let curSlide = 0
    // maximum number of slides
    let maxSlide = slides.length - 1

    const next = function () {
      // check if current slide is the last and reset current slide
      if (curSlide === maxSlide) {
        curSlide = 0
      } else {
        curSlide++
      }

      //   move slide by -100%
      slides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`
      })

      // Update active index 
      setActiveIndex(curSlide)
    }

    // add event listener and navigation functionality
    nextSlide.addEventListener('click', next)

    // select next slide button
    const prevSlide = document.querySelector('.btn-prev')

    const prev = function () {
      // check if current slide is the first and reset current slide to last
      if (curSlide === 0) {
        curSlide = maxSlide
      } else {
        curSlide--
      }

      // move slide by 100%
      slides.forEach((slide, indx) => {
        slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`
      })

      // Update active index 
      setActiveIndex(curSlide)
    }

    // add event listener and navigation functionality
    prevSlide.addEventListener('click', prev)

    return () => {
      prevSlide.removeEventListener('click', prev)
      nextSlide.removeEventListener('click', next)
    }
  }, [groups])

  // Restart scroll and update grouping system when content-list changes.
  useEffect(() => {
    setGroups(group(contentList, size.width))
  }, [contentList, size.width])

  return (
    <div className="slider">
      <div className='w-full max-w-full h-[490px] relative overflow-hidden rounded-2xl'>
        {groups.map((group) => (
          <div key={group[0].slug} className='slide w-full max-w-full h-[500px] absolute transition duration-500'>
            <div className='w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 space-y-5 sm:space-y-0 place-items-center'>
              {group.map((product) => (
                <ProductCard.ExtraLongVerticalCard
                  key={product.slug}
                  product={product}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className='w-full flex items-center justify-end space-x-2 pr-10 mt-5'>
        <button
          type='button'
          disabled={activeIndex === 0}
          className='btn-prev disabled:opacity-50 active:transform active:scale-[1.1]'
        >
          <FontAwesomeIcon
            icon={faCircleArrowLeft}
            className='text-primary-color text-3xl'
          />
        </button>
        <button
          type='button'
          disabled={activeIndex === groups.length - 1}
          className='btn-next disabled:opacity-50 active:transform active:scale-[1.1]'
        >
          <FontAwesomeIcon
            icon={faCircleArrowRight}
            className='text-primary-color text-3xl'
          />
        </button>
      </div>
    </div>
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