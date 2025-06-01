import React from 'react'

const Title = ({title1,title2}) => {
  return (
    <div className='flex items-center justify-center gap-2 mb-3'>
      <p className='text-gray-700  font-medium text-3xl'>{title1} <span className='font-medium text-gray-900 text-3xl'>{title2}</span></p>
      <p className='w-10 h-[3px] bg-gray-800 '></p>
    </div>
  )
}

export default Title
