import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faNairaSign, faTruckFast, faCartShopping, faMagnifyingGlass, faBars, faClose } from '@fortawesome/free-solid-svg-icons'
import {faWhatsapp} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faHeart } from '@fortawesome/free-regular-svg-icons'
import Image from 'next/image'
import Search from './search'
import Nav from './nav'

export default function Header() {
  const [openNav, setOpenNav] = useState(false)

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
        <div className='flex flex-col space-y-3 sm:flex-row sm:space-y-0 justify-between items-center pt-2 pb-0 sm:py-6 mx-2 sm:max-w-7xl sm:mx-auto sm:px-2'>
          <div className=''>
            <Image src='/logo.png' width={200} height={50} alt='store logo' />
          </div>
          <>
            <Search />
          </>
          <div className='flex space-x-10 sm:space-x-3'>
            <div className='block lg:hidden'>
              <IconPlusUnderText icon={faMagnifyingGlass} text='search' />
            </div>
            <IconPlusUnderText icon={faHeart} text='your wishlist' badge={2} />
            <IconPlusUnderText
              icon={faCartShopping}
              text='your cart'
              badge={5}
            />
            <div
              className='sm:hidden flex items-center'
              onClick={() => setOpenNav((prev) => !prev)}
            >
              <div
                className={`flex justify-center items-center w-10 h-10 ${
                  openNav ? 'bg-primary-color' : 'bg-transparent'
                }`}
              >
                <IconPlusUnderText
                  icon={openNav ? faClose : faBars}
                  text='Close Nav'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <>
        <Nav isOpen={openNav} />
      </>
    </div>
  )
}

function IconPlusSideText({icon, text}) {
  return (
    <div className="flex items-center space-x-1 sm:space-x-2 p-1">
      <FontAwesomeIcon icon={icon} className='text-primary-color' />
      <span className="text-white text-xs md:text-sm font-normal sm:font-medium">{text}</span>
    </div>
  )
}

function IconPlusUnderText({icon, text, badge}) {
  return (
    <div className='p-1 m-2 w-fit'>
      <div className='relative w-fit mx-auto'>
        <FontAwesomeIcon icon={icon} className='text-white text-2xl' />
        {badge && <div className='absolute -top-2 -right-2 w-4 h-4 bg-primary-color rounded-full flex justify-center items-center text-white text-xs font-medium'>
          {badge}
        </div>}
      </div>
      <div className='hidden sm:block capitalize text-sm font-medium text-white text-center'>
        {text}
      </div>
    </div>
  )
}