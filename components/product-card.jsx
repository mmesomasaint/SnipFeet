import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart as faHeart2, faCartPlus } from "@fortawesome/free-solid-svg-icons"
import { faHeart as faHeart1 } from "@fortawesome/free-regular-svg-icons"
import Link from "next/link"
import { Image } from "react-datocms"

function ExtraLongVerticalCard({product}) {
  const {name, price, mainImage, slug} = product 
  const [wished, setWished] = useState(false)

  return (
    <div className='w-72 sm:w-max-none sm:w-[19rem] lg:w-[15rem] xl:w-[19rem] border border-gray-300 hover:border-primary-color shadow-md sm:shadow-none hover:shadow-md rounded-sm p-1 my-3 sm:mx-0 lg:my-0'>
      <div className='flex flex-col space-y-1'>
        <div className="relative">
        <div className='absolute top-1 right-1 z-20 flex items-center justify-end space-x-2'>
          <div className='border border-primary-color px-2 py-1 leading-none bg-white text-primary-color text-sm font-medium uppercase'>
            -30%
          </div>
          <div className='border border-primary-color px-2 py-1 leading-none bg-primary-color text-white text-sm font-medium uppercase'>
            NEW
          </div>
        </div>
          <Image data={mainImage.responsiveImage} />
        </div>
      </div>
      <div className='flex flex-col justify-center items-center space-y-2 my-4'>
        <div className='text-sm font-medium uppercase text-gray-400 leading-none'>
          CATEGORY
        </div>
        <div className='text-base font-medium uppercase text-gray-700 leading-none hover:underline line-clamp-1'>
          <Link href={`/products/${slug}`}>{name}</Link>
        </div>
        <div className='flex justify-center items-center space-x-4 mt-5 py-2 border-y border-y-gray-400 w-[70%]'>
          <span className='text-2xl font-semibold uppercase text-black leading-none'>
            ${price}
          </span>
          <span className='text-base font-medium uppercase text-gray-500 leading-none line-through'>
            $500
          </span>
        </div>
      </div>
      <div className='flex justify-evenly items-center w-full mt-3'>
        <div className='flex items-center space-x-2 h-fit w-fit py-1 px-4 cursor-pointer'>
          <FontAwesomeIcon icon={faCartPlus} className='text-primary-color text-2xl lg:text-base xl:text-xl' />
          <span className='capitalize text-base font-medium text-primary-color leading-none hidden lg:block'>
            Buy
          </span>
        </div>
        <div className='flex items-center space-x-2 h-fit w-fit py-1 px-4 cursor-pointer'>
          <FontAwesomeIcon
            icon={wished ? faHeart2 : faHeart1}
            className='text-primary-color text-2xl lg:text-base xl:text-xl'
            onClick={() => setWished((prev) => !prev)}
          />
          <span className='capitalize text-base font-medium text-primary-color leading-none hidden lg:block'>
            Add to wishlist
          </span>
        </div>
      </div>
    </div>
  )
}

function LongVerticalCard({product}) {
  const {id, name, price, mainImage, slug} = product

  return (
    <div className='w-72 sm:w-52 flex-shrink-0 p-4 bg-white hover:shadow-xl rounded-sm m-4'>
      <div>
        <Image data={mainImage.responsiveImage} />
      </div>
      <div className='w-full'>
        <div className="my-2 text-base font-medium leading-tight hover:underline line-clamp-2">
          <Link href={`/products/${slug}`}>{name}</Link>
        </div>
        <div className="text-xl font-bold my-2">${price}</div>
        <div className='w-full'>
          <button
            className='snipcart-add-item block border-2 border-primary-color hover:opacity-70 w-full my-4 py-2 px-5 text-sm font-medium'
            data-item-id={id}
            data-item-image={mainImage.responsiveImage.src}
            data-item-name={name}
            data-item-url='/'
            data-item-price={price}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

function ShortVerticalCard({product}) {
  const {name, price, mainImage, slug} = product 
  return (
    <div className='w-72 sm:w-52 flex-shrink-0 p-0 bg-white shadow-xl sm:shadow-none sm:hover:shadow-xl rounded-sm m-4'>
      <div className="">
        <Image data={mainImage.responsiveImage} />
      </div>
      <div className="px-2 py-1 bg-white">
        <div className="text-base font-light leading-tight capitalize line-clamp-1 my-1 hover:underline"><Link href={`/products/${slug}`}>{name}</Link></div>
        <div className="text-lg font-medium leading-tight my-1">${price}</div>
      </div>
    </div>
  )
}

function HorizontalCard({product}) {
  const {name, price, mainImage, slug} = product 
  return (
    <div className="w-full sm:w-96 flex-shrink-0 grid grid-cols-6 hover:shadow-xl rounded-sm m-3">
      <div className="col-span-2">
        <Image data={mainImage.responsiveImage} />
      </div>
      <div className="col-span-4 w-full bg-white p-2 sm:p-4">
        <div className="text-base sm:text-lg font-normal leading-tight captalize line-clamp-1 my-1 hover:underline"><Link href={`/products/${slug}`}>{name}</Link></div>
        <div className="text-2xl font-bold leading-tight my-1 mt-3">${price}</div>
      </div>
    </div>
  )
}

const ProductCard = {
  ExtraLongVerticalCard,
  LongVerticalCard,
  ShortVerticalCard, 
  HorizontalCard
}

export default ProductCard