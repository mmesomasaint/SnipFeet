import { Image } from 'react-datocms'

export default function BrandAvatar({ img }) {
  return (
    <div className='m-3 bg-transparent'>
      <div className='w-fit h-fit p-1 border-y-[3px] transform rotate-45 border-primary-color rounded-full'>
        <div className='w-[150px] h-[150px] rounded-full overflow-hidden transform -rotate-45'>
          {img && <Image data={img.responsiveImage} />}
        </div>
      </div>
    </div>
  )
}
