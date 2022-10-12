import { useState } from 'react'
import { Image } from 'react-datocms'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as wished } from '@fortawesome/free-solid-svg-icons'
import { faHeart as notWished } from '@fortawesome/free-regular-svg-icons'
import { faWhatsapp, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'
import Slider from './slider'

export default function ProductInfo({ product }) {
  const [hasWished, setHasWished] = useState(false)
  const { id, name, price, sizes, categories, colors, gallery } = product

  return (
    <div className='bg-transparent'>
      <div className='bg-white p-5 rounded-xl my-5 grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Slider thumbs>
          {gallery.map((img) => (
            <div key={img.responsiveImage.src} className='h-fit'>
              <Image data={img.responsiveImage} />
            </div>
          ))}
        </Slider>
        <div className='p-1'>
          <div className='my-7 pl-3'>
            <div className='text-2xl font-semibold leading-none mb-3'>
              {name}
            </div>
            <div className='grid md:grid-cols-10 lg:grid-cols-9 mb-3'>
              <span className='md:col-span-3 lg:col-span-2 text-lg font-normal leading-none opacity-40'>
                Product ID:
              </span>{' '}
              <span className='md:col-span-7 lg:col-span-7 text-lg font-normal leading-none font-medium'>
                {id}
              </span>
            </div>
            <div className='grid md:grid-cols-10 lg:grid-cols-9 lg:grid-cols-9'>
              <span className='md:col-span-3 lg:col-span-2 opacity-40 font-normal text-base'>
                Collections:
              </span>
              <div className='md:col-span-7 lg:col-span-7 inline-flex items-center'>
                {categories.map((category) => (
                  <div className='text-sm leading-none font-medium text-gray-500 border-r last:border-none border-primary-color border-opacity-50 py-1 px-5 first:pl-0 hover:underline'>
                    <Link key={category.slug} href={category.slug}>
                      {category.name.replace('Collection', '')}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='border-t border-primary-color border-opacity-20 w-[90%] mx-auto' />
          <div className='my-7 pl-3'>
            <span className='text-3xl font-bold leading-none'>${price}</span>
          </div>
          <div className='border-t border-primary-color border-opacity-20 w-[90%] mx-auto' />
          <div className='my-5 flex flex-col gap-5 pl-3'>
            <div className='grid md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7'>
              <span className='text-gray-600 opacity-70'>Color(s):</span>
              <div className='md:col-span-3 lg:col-span-5 xl:col-span-6 flex gap-2'>
                {colors.map((color) => (
                  <div
                    key={color.name}
                    style={{ backgroundColor: `${color.name}` }}
                    className='w-7 h-7'
                  />
                ))}
              </div>
            </div>
            <div className='grid md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7'>
              <span className='text-gray-600 opacity-70'>Size(s):</span>
              <div className='md:col-span-3 lg:col-span-5 xl:col-span-6 flex gap-2'>
                {sizes.map((size) => (
                  <div key={size.name} className='border border-primary-color border-opacity-20 text-primary-color w-7 h-7 text-sm font-medium flex justify-center items-center'>
                    {size.name}{' '}
                  </div>
                ))}
              </div>
            </div>
            <div className='grid md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7'>
              <span className='text-gray-600 opacity-70'>Quantity:</span>
              <div className='md:col-span-3 lg:col-span-5 xl:col-span-6'>
                <div className='w-7 h-7 border border-primary-color  bg-primary-color text-white inline-flex justify-center items-center'>
                  -
                </div>
                <div className='w-14 h-7 border-y border-primary-color border-opacity-20 col-span-2 inline-flex justify-center items-center bg-white text-black'>
                  1
                </div>
                <div className='w-7 h-7 border border-primary-color  bg-primary-color text-white inline-flex justify-center items-center'>
                  +
                </div>
              </div>
            </div>
            <div className=''>
              <span className='block text-sm font-medium leading-none mb-1 text-gray-500 opacity-90'>
                Call us for custom design
              </span>
              <span className='block text-sm font-medium leading-none text-gray-900 opacity-90'>
                Click here to show phone number{' '}
              </span>
            </div>
          </div>
          <div className='border-t border-primary-color border-opacity-20 w-[90%] mx-auto' />
          <div className='my-5 pl-3'>
            <div className='flex gap-9 items-center'>
              <button className='bg-primary-color rounded-md w-[50%] py-3 text-white'>
                Buy Now
              </button>
              <div className='flex gap-4 items-center'>
                <FontAwesomeIcon
                  icon={hasWished ? wished : notWished}
                  onClick={() => setHasWished((prev) => !prev)}
                  className='text-primary-color text-3xl'
                />
                <span className='text-sm font-medium text-gray-600'>Add to Wishlist</span>
              </div>
            </div>
          </div>
          <div className='border-t border-primary-color border-opacity-20 w-[90%] mx-auto' />
          <div className='my-5 pl-3'>
            <span className='block opacity-40 font-normal text-base mb-2'>Share with friends</span>
            <div className='flex gap-5 items-center'>
              <FontAwesomeIcon className='text-2xl text-primary-color opacity-90' icon={faWhatsapp}/>
              <FontAwesomeIcon className='text-2xl text-primary-color opacity-90' icon={faFacebook}/>
              <FontAwesomeIcon className='text-2xl text-primary-color opacity-90' icon={faInstagram}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
