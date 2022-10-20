import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPhone,
  faNairaSign,
  faTruckFast,
  faCartShopping,
  faBars,
  faClose,
  faHeart as filledHeart,
} from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import {
  faEnvelope,
  faHeart as shallowHeart,
} from '@fortawesome/free-regular-svg-icons'
import Image from 'next/image'
import Search from './search'
import Nav from './nav'
import { useSnipcart } from 'use-snipcart/useSnipcart'
import { useRouter } from 'next/router'
import useWishList from '../hooks/use-wishlist'

export default function Header() {
  const [openNav, setOpenNav] = useState(false)
  const { cart } = useSnipcart()
  const {count} = useWishList()
  const router = useRouter()
  const inWishPage = router.pathname === '/wishlist'

  return (
    <div className='bg-black translate-all duration-700'>
      <div className='bg-gray-900'>
        <div className='hidden sm:flex justify-between mx-4 sm:max-w-7xl sm:mx-auto sm:px-2 py-1'>
          <div className='flex justify-around space-x-2 sm:space-x-4'>
            <IconPlusSideText icon={faPhone} text='+2348157832809' />
            <IconPlusSideText icon={faEnvelope} text='snipfeet@gmail.com' />
            <IconPlusSideText icon={faWhatsapp} text='+2348157832809' />
          </div>
          <div className='flex justify-around space-x-2 sm:space-x-4'>
            <IconPlusSideText icon={faNairaSign} text='NGN' />
            <IconPlusSideText icon={faTruckFast} text='Delivery' />
          </div>
        </div>
      </div>
      <div className='bg-black border-b-4 border-b-primary-color'>
        <div className='flex space-y-3 flex-row sm:space-y-0 justify-between items-center pt-2 pb-0 sm:py-6 mx-2 sm:max-w-7xl sm:mx-auto sm:px-2'>
          <div className='flex justify-between'>
            <div
              className='sm:hidden flex items-center mx-1'
              onClick={() => setOpenNav((prev) => !prev)}
            >
              <FontAwesomeIcon
                icon={openNav ? faClose : faBars}
                className={`w-7 h-7 text-white ${
                  openNav ? 'bg-primary-color' : 'bg-transparent'
                }`}
              />
            </div>
            <Image src='/logo.png' width={200} height={50} alt='store logo' onClick={() => router.push('/')} />
          </div>
          <>
            <Search />
          </>
          <div className='w-auto sm:w-[60%] lg:w-auto relative flex space-x-4 sm:space-x-3 items-center'>
            <div className='sm:block hidden'>
              <Search mini />
            </div>
            <IconPlusUnderText
              active={inWishPage}
              icon={inWishPage ? filledHeart : shallowHeart}
              text='your wishlist'
              badge={count}
              onClick={() => router.push('/wishlist')}
            />
            <IconPlusUnderText
              className='snipcart-checkout'
              icon={faCartShopping}
              text='your cart'
              badge={cart?.items?.count || 0}
            />
          </div>
        </div>
        <div className='sm:hidden block'>
          <Search mini />
        </div>
      </div>
      <>
        <Nav isOpen={openNav} />
      </>
    </div>
  )
}

function IconPlusSideText({ icon, text }) {
  return (
    <div className='flex items-center space-x-1 sm:space-x-2 p-1'>
      <FontAwesomeIcon icon={icon} className='text-primary-color' />
      <span className='text-white text-xs md:text-sm font-normal sm:font-medium'>
        {text}
      </span>
    </div>
  )
}

function IconPlusUnderText({ icon, text, badge, className = '', onClick=() => {}, active=false }) {
  return (
    <div className={`${className} ${active ? ' transform scale-[1.07]' : ''} p-1 m-2 w-fit flex-shrink-0`} onClick={onClick}>
      <div className='relative w-fit mx-auto'>
        <FontAwesomeIcon icon={icon} className={`${active ? 'text-primary-color' : 'text-white'} text-2xl`} />
        {badge && (
          <div className='absolute -top-2 -right-2 w-4 h-4 bg-primary-color rounded-full flex justify-center items-center text-white text-xs font-medium'>
            {badge}
          </div>
        )}
      </div>
      <div className={`${active ? 'text-primary-color' : 'text-white'} hidden md:block capitalize text-sm font-medium text-center`}>
        {text}
      </div>
    </div>
  )
}
