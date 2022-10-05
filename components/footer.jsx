export default function Footer() {
  return (
    <div className='mt-2 relative flex justify-center items-center '>
      <div className='flex justify-between items-center'>
        <div className='flex flex-wrap justify-evenly items-center'>
          <div className='text-center text-gray-300 hover:underline'>
            Send Feedback
          </div>
          <div className='text-center text-gray-300 hover:underline'>
            Delivery
          </div>
          <div className='text-center text-gray-300 hover:underline'>
            Policies
          </div>
          <div className='text-center text-gray-300 hover:underline'>Help</div>
        </div>
        <div className="flex justify-center items-center">
          <div className='text-center text-gray-500'>
            &copy; 2022 SnipFeet, All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  )
}