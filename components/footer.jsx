export default function Footer() {
  return (
    <div className='mt-2 relative bg-gray-900 w-full'>
      <div className='flex flex-col sm:max-w-4xl sm:mx-auto pt-5 pb-3 gap-5'>
        <div className='flex flex-wrap justify-evenly items-center'>
          <div className='text-lg font-medium text-center text-gray-300 hover:underline'>
            Send Feedback
          </div>
          <div className='text-lg font-medium text-center text-gray-300 hover:underline'>
            Delivery
          </div>
          <div className='text-lg font-medium text-center text-gray-300 hover:underline'>
            Policies
          </div>
          <div className='text-lg font-medium text-center text-gray-300 hover:underline'>Help</div>
        </div>
        <div className="flex justify-center items-center">
          <div className='text-center text-gray-500'>
            <span className="text-zinc-300">&copy; 2022 SnipFeet,</span> All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  )
}