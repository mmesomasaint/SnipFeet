import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { Image } from "react-datocms"

export default function CollectionCard({collection}) {
  const { slug, name, image } = collection

  return (
    <div className='border m-1 relative overflow-hidden h-[14rem] md:h-[15rem] lg:h-[17rem] max-w-[30rem] md:max-w-none md:w-[16rem] lg:w-[21rem] xl:w-[26rem] after:absolute text-white after:text-white bg-transparent after:bg-primary-color after:opacity-90 after:top-0 after:-left-[14rem] after:md:-left-[13rem] after:lg:-left-[17rem] after:w-full after:lg:w-[90%] after:h-full after:origin-bottom-left after:skew-x-[-38deg] lg:after:skew-x-[-45deg]'>
      <Image data={image.responsiveImage} />
      <div className='absolute w-48 md:w-36 lg:w-48 bg-transparent z-30 left-0 top-0 flex justify-center items-center'>
        <div className='my-6 md:my-3 lg:my-6 w-[70%] md:ml-3 md:w-full lg:ml-0 lg:w-[70%]'>
          <div className='text-3xl md:text-2xl lg:text-3xl font-bold leading-none text-white mb-3 md:mb-1 lg:mb-3'>
            {name}
          </div>
          <div className='flex items-center space-x-3 md:space-x-2 group lg:space-x-3'>
            <span className='text-base :text-sm lg:text-base md:font-medium lg:font-semibold uppercase group-hover:underline'>
              <Link href={`collections/${slug}`}>Shop now</Link>
            </span>{' '}
            <FontAwesomeIcon className='text-xl group-hover:scale-[1.3]' icon={faCircleArrowRight} />
          </div>
        </div>
      </div>
    </div>
  )
}