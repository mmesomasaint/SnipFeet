import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function LinkBox({active=false, href, text, full=false, children}) {
  const [open, setOpen] = useState(false)

  return (
    <Link href={`${href || '#'}`}>
      <div
        className='my-1 mx-1 sm:mx-4 sm:first:ml-0 py-2 px-2 sm:px-4 sm:first:pl-0 w-fit group cursor-pointer'
        onClick={() => setOpen((prev) => !prev)}
      >
        {open && (
          <div
            className='inset-0 z-70 bg-transparent'
            onClick={() => setOpen(false)}
          />
        )}
        <div
          className={`${
            active ? 'text-primary-color' : 'text-gray-700'
          } text-base capitalize font-extrabold w-fit`}
        >
          <span>{text}</span>
          {children && (
            <FontAwesomeIcon icon={faChevronDown} className='inline ml-2' />
          )}
          <div
            className={`border-t-[3px] border-t-primary-color ${
              active
                ? ' w-full'
                : 'w-[30%] rounded-xl transition-all duration-500 group-hover:w-full'
            }`}
          />
        </div>
        <div
          className={`${open ? 'block' : 'hidden'} relative sm:absolute ${
            full ? 'left-0' : ''
          } z-50 sm:group-hover:block sm:hidden w-fit mt-2`}
        >
          {children}
        </div>
      </div>
    </Link>
  )
}