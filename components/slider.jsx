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
  sideControls=true,
  bottomControls=false,
  children,
  className = '',
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const sliderContainerRef = useRef(null)
  const thumbsContainerRef = useRef(null)

  const [ref, slider] = useKeenSlider({
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
  })

  // Stop the history navigation gesture on touch devices
  useEffect(() => {
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

    return () => {
      if (slider) {
        slider.removeEventListener('touchstart', preventNavigation)
      }
    }
  }, [])

  return (
    <div ref={sliderContainerRef} className='relative'>
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

      
      {isMounted && slider.current &&(
        <>
          <button
            type='button'
            disabled={currentSlide === 0}
            onClick={(e) => e.stopPropagation() || slider.current?.prev()}
            className='absolute left-2 sm:left-0 top-[40%] disabled:opacity-30 active:transform active:scale-[1.1]'
          >
            <FontAwesomeIcon
              icon={faChevronCircleLeft}
              className='text-primary-color text-5xl'
            />
          </button>
          <button
            type='button'
            onClick={(e) => e.stopPropagation() || slider.current?.next()}
            disabled={
              currentSlide === slider.current.track.details.slides.length - 1
            }
            className='absolute right-2 sm:right-0 top-[40%] disabled:opacity-30 active:transform active:scale-[1.1]'
          >
            <FontAwesomeIcon
              icon={faChevronCircleRight}
              className='text-primary-color text-5xl'
            />
          </button>
        </>
      )}
    </div>
  )
}
export default Slider