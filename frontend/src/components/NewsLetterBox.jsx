import React from 'react'

const NewsLetterBox = () => {
    const onsubmitInput=(event)=>{
     event.preventDefault();
    }

  return (
    <div className='text-center'>

      <p className='text-2xl font-medium  text-gray-800'>Subscribe Now and get 20% off </p>
      <p className='text-gray-400 mt-3'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe adipisci minus</p>
     
      <form onSubmit={()=>onsubmitInput()} className='w-full sm:w-1/2 flex items-center justify-center gap-3 mx-auto my-6 border '>
        <input type="email" placeholder='Enter your email' className='w-full outline-none sm:flex-1 px-2' />
      <button type='submit' className='bg-black text-white py-4 px-10 text-xs'>SUBSCRIBE</button>
      </form>

    </div>
  )
}

export default NewsLetterBox
