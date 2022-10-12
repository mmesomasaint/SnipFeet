import Link from "next/link";

export default function LinkBox({active=false, href, children}) {
  return (
    <Link href={`${href}`}>
      <div className='my-1 mx-1 sm:mx-4 sm:first:ml-0 py-2 px-2 sm:px-4 sm:first:pl-0 w-fit group cursor-pointer'>
        <div
          className={`${
            active ? 'text-primary-color' : 'text-gray-700'
          } text-base capitalize font-extrabold group-hover:opacity-60`}
        >
          {children}
        </div>
        <div
          className={`border-t-[3px] border-t-primary-color ${
            active
              ? ' w-full'
              : 'w-[30%] rounded-xl transition-all duration-500 group-hover:w-full'
          }`}
        />
      </div>
    </Link>
  )
}