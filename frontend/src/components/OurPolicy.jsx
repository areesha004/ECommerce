import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around text-center items-center gap-12 sm:gap-2 text-xs sm:text-xs py-20 md:text-base text-gray-700'>
      <div className=' flex flex-col items-center justify-center'>
        <img src={assets.exchange_icon} className='w-12 m-uto mb-5 ' alt="" />
        <p className='font-semibold'>Fast Exchange Property</p>
        <p className='text-gray-400'>We offer hassle free exchange property</p>
      </div>
      <div className=' flex flex-col items-center justify-center'>
        <img src={assets.quality_icon} className='w-12 m-uto mb-5 ' alt="" />
        <p className='font-semibold'>Seven Days Return Policy</p>
        <p className='text-gray-400'>We provide seven days free return policy</p>
      </div>
      <div className=' flex flex-col items-center justify-center'>
        <img src={assets.support_img} className='w-12 m-uto mb-5 ' alt="" />
        <p className='font-semibold'>Best Customer Support</p>
        <p className='text-gray-400'>We provide 24/7 customer support</p>
      </div>
    </div>
  )
}

export default OurPolicy
