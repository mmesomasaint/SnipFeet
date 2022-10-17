import Link from "next/link"
import { useMemo, useState } from "react"
import { Image } from "react-datocms"

export default function HoverPanel({items}) {
  const links = items.map(item => ({name:item.name, slug: item.slug}))
  const [activeLink, setActiveLink] = useState(links[0].name)
  const activeImage = useMemo(() => {
    const [activeItem] = items.filter(item => item.name === activeLink)
    return activeItem.image
  }, [activeLink])

  return (
    <div className='left-5 w-full min-h-min bg-white'>
      <div className='grid grid-cols-1 sm:grid-cols-4 md:grid-cols-6 gap-2 md:gap-4 px-2 md:px-5 py-6'>
        <div className='sm:col-span-1 md:col-span-2 flex flex-col items-center justify-center'>
          {links.map((link) => (
            <div
              key={link.slug}
              onMouseOver={() => setActiveLink(link.name)}
              className={`${
                activeLink === link.name
                  ? 'sm:bg-primary-color sm:bg-opacity-20 sm:transform scale-[1.13]'
                  : 'bg-white bg-opacity-100'
              } w-full sm:w-[50%] py-4 px-3 leading-none text-lg text-center font-bold`}
            >
              <Link href={`/collections/${link.slug}`}>{link.name}</Link>
            </div>
          ))}
        </div>
        <div className='hidden sm:block sm:col-span-3 md:col-span-4 order-first md:order-last'>
          <Image data={activeImage.responsiveImage} className='rounded-xl' />
        </div>
      </div>
    </div>
  )
}