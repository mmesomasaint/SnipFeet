import { useKeenSlider } from 'keen-slider/react'
import React, {
  Children,
  isValidElement,
  useState,
  useRef,
  useEffect,
} from 'react'
import 'keen-slider/keen-slider.min.css'
import { faChevronCircleLeft, faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Slider = ({
  autoplay=false,
  loop=false,
  dots=false,
  thumbs=false,
  children,
  className = '',
}) => {
  let interval = 0
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const sliderContainerRef = useRef(null)
  const thumbsContainerRef = useRef(null)

  const autoPlay = React.useCallback((run) => {
    clearInterval(interval)
    interval = setInterval(() => {
      if (run && slider.current) {
        slider.current.next()
      }
    }, 2000)
  }, [autoplay])
  
  const [ref, slider] = useKeenSlider({
    loop: loop,
    slides: { perView: 1 },
    created: () => setIsMounted(true),
    slideChanged(s) {
      const slideNumber = s.track.details.rel
      setCurrentSlide(slideNumber)

      if (thumbsContainerRef.current) {
        const $el = document.getElementById(`thumb-${slideNumber}`)
        if (slideNumber >= 3) {
          thumbsContainerRef.current.scrollLeft = $el?.offsetLeft
        } else {
          thumbsContainerRef.current.scrollLeft = 0
        }
      }
    },
    dragStart: () => {
      autoplay && autoPlay(false);
    },
    dragEnd: () => {
      autoplay && autoPlay(true);
    }
  })

  // Set autoPlay to true, and
  // Stop the history navigation gesture on touch devices
  useEffect(() => {
    autoplay && autoPlay(true)

    const preventNavigation = (event) => {
      // Center point of the touch area
      const touchXPosition = event.touches[0].pageX
      // Size of the touch area
      const touchXRadius = event.touches[0].radiusX || 0

      // We set a threshold (10px) on both sizes of the screen,
      // if the touch area overlaps with the screen edges
      // it's likely to trigger the navigation. We prevent the
      // touchstart event in that case.
      if (
        touchXPosition - touchXRadius < 10 ||
        touchXPosition + touchXRadius > window.innerWidth - 10
      )
        event.preventDefault()
    }

    const slider = sliderContainerRef.current

    slider.addEventListener('touchstart', preventNavigation)

    // add autoPlay on hover
    slider.addEventListener('mouseover', () => {
      autoplay && autoPlay(false)
    })
    slider.addEventListener('mouseout', () => {
      autoplay && autoPlay(true)
    })

    return () => {
      if (slider) {
        slider.removeEventListener('touchstart', preventNavigation)
        slider.removeEventListener('mouseover', () => autoPlay(false))
        slider.removeEventListener('mouseout', () => autoPlay(true))
      }
    }
  }, [])

  return (
    <div ref={sliderContainerRef} className='relative group'>
      <div
        ref={ref}
        className={`${isMounted ? 'block' : 'hidden'} keen-slider`}
      >
        {Children.map(children, (child) => {
          // Add the keen-slider__slide className to children
          if (isValidElement(child)) {
            return {
              ...child,
              props: {
                ...child.props,
                className: `${
                  child.props.className ? `${child.props.className} ` : ''
                }keen-slider__slide`,
              },
            }
          }
          return child
        })}
      </div>

      {isMounted && slider.current && (
        <>
          <div
            className={`absolute left-2 sm:left-0 top-0 h-full ${
              autoplay
                ? 'group-hover:flex items-center hidden'
                : 'flex items-center'
            }`}
          >
            <button
              type='button'
              disabled={!loop && currentSlide === 0}
              onClick={(e) => e.stopPropagation() || slider.current?.prev()}
              className='opacity-80 disabled:opacity-0 active:transform active:scale-[1.1]'
            >
              <FontAwesomeIcon
                icon={faChevronCircleLeft}
                className='text-primary-color text-5xl'
              />
            </button>
          </div>
          <div
            className={`absolute right-2 sm:right-0 top-0 h-full ${
              autoplay
                ? 'group-hover:flex items-center hidden'
                : 'flex items-center'
            }`}
          >
            <button
              type='button'
              onClick={(e) => e.stopPropagation() || slider.current?.next()}
              disabled={
                !loop &&
                currentSlide === slider.current.track.details.slides.length - 1
              }
              className='opacity-80 disabled:opacity-0 active:transform active:scale-[1.1]'
            >
              <FontAwesomeIcon
                icon={faChevronCircleRight}
                className='text-primary-color text-5xl'
              />
            </button>
          </div>
        </>
      )}

      {isMounted && slider.current && dots && (
        <div className='absolute bottom-3 flex py-[10px] px-0 justify-center w-full'>
          {[...Array(slider.current.track.details.slides.length).keys()].map(
            (idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    slider.current?.moveToIdx(idx)
                  }}
                  className={`border-none w-[10px] h-[10px] ${
                    currentSlide === idx ? 'bg-primary-color' : 'bg-[#c5c5c5]'
                  } rounded-[50%] my-0 mx-[5px] p-[5px] cursor-pointer focus:outline-none`}
                />
              )
            }
          )}
        </div>
      )}
    </div>
  )
}
export default Slider