import { useState, useCallback, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
  faBackwardStep,
  faForwardStep,
} from '@fortawesome/free-solid-svg-icons'

export default function usePagination(first) {
  const [total, setTotal] = useState(0)
  const [skip, setSkip] = useState(0)
  const [curPage, setCurPage] = useState(1)
  const hasNext = useCallback(
    (next = 1) => {
      const curContent = skip + first
      const nextContent = first * (next - 1)
      return curContent + nextContent < total
    },
    [skip, total]
  )
  const hasPrev = useCallback(
    (prev = 1) => {
      const curContent = skip + first
      const prevContent = first * prev
      return curContent - prevContent > 0
    },
    [skip]
  )

  // When total changes reset skip and current page.
  useEffect(() => {
    setSkip(0)
    setCurPage(1)
  }, [total])

  return [
    skip,
    setTotal,
    () => {
      return (
        <a
          className='w-full flex gap-2 justify-center items-center my-3'
          href='#list-top'
        >
          {hasPrev(2) && (
            <FontAwesomeIcon
              icon={faBackwardStep}
              className='text-primary-color'
              onClick={() => {
                setSkip(first * (curPage - 3))
                setCurPage(curPage - 2)
              }}
            />
          )}

          {hasPrev() && (
            <>
              <FontAwesomeIcon
                icon={faChevronLeft}
                className='text-primary-color'
                onClick={() => {
                  setSkip(first * (curPage - 2))
                  setCurPage(curPage - 1)
                }}
              />
              <button
                onClick={() => {
                  setSkip(first * (curPage - 2))
                  setCurPage(curPage - 1)
                }}
                className='border border-gray-500 leading-none text-sm text-primary-color font-medium w-6 h-6'
              >
                {curPage - 1}
              </button>
            </>
          )}

          <button
            className='border border-primary-color bg-primary-color leading-none text-sm text-white font-medium w-8 h-8'
            disabled
          >
            {curPage}
          </button>

          {hasNext() && (
            <>
              <button
                onClick={() => {
                  setSkip(first * curPage)
                  setCurPage(curPage + 1)
                }}
                className='border border-gray-500 leading-none text-sm text-primary-color font-medium w-6 h-6'
              >
                {curPage + 1}
              </button>
              <FontAwesomeIcon
                icon={faChevronRight}
                className='text-primary-color'
                onClick={() => {
                  setSkip(first * curPage)
                  setCurPage(curPage + 1)
                }}
              />
            </>
          )}

          {hasNext(2) && (
            <FontAwesomeIcon
              icon={faForwardStep}
              className='text-primary-color'
              onClick={() => {
                setSkip(first * (curPage + 1))
                setCurPage(curPage + 2)
              }}
            />
          )}
        </a>
      )
    },
  ]
}
