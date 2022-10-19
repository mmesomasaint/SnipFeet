import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import Link from "next/link"
import LinkBox from "../link-box"
import HoverPanel from "./hover-panel"

export default function Nav({isOpen}) {
  const router = useRouter()
  const [collections, setCollections] = useState(null)
  const [hotDeals, setHotDeals] = useState(null)

  useEffect(() => {
    fetch('/api/collections')
    .then(res => res.json())
    .then(data => setCollections(data.collections))

    fetch('/api/hot-deals')
    .then(res => res.json())
    .then(data => setHotDeals(data.hotDeals))
  }, [])


  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } sm:block pt-1 shadow-md border-b-[3px] border-b-gray-300 bg-white relative`}
    >
      <div className='mx-4 sm:max-w-7xl sm:mx-auto sm:px-2'>
        <div className='flex flex-col sm:flex-row justify-start sm:items-center space-x-1'>
          <LinkBox href='/' active={router.pathname === '/'} text='Home' />
          <LinkBox href='' text='Hot Deals'>
            <div className='max-h-96 bg-white'>
              {hotDeals?.map((deal) => (
                <span
                  key={deal.slug}
                  className='block text-lg font-bold leading-none px-8 py-2 sm:py-4 hover:bg-primary-color hover:bg-opacity-20 hover:transform hover:scale-[1.11]'
                >
                  <Link href={`/hot-deals/${deal.slug}`}>{deal.name}</Link>
                </span>
              ))}
            </div>
          </LinkBox>
          <LinkBox href='' text='Collections' full>
            {collections && <HoverPanel items={collections} />}
          </LinkBox>
          <LinkBox
            href='/brands'
            active={router.pathname === '/brands'}
            text='Brands'
          />
          <LinkBox
            href='/our-story'
            active={router.pathname === '/our-story'}
            text='Our Story'
          />
        </div>
      </div>
    </div>
  )
}