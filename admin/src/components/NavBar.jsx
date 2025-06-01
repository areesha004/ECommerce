import React from 'react'
import { assets } from '../assets/assets'

const NavBar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between py-2 px-[4%]'>
      <img src={assets.logo} className='w-[max(10%,80px)]' alt="" />
      <button onClick={()=> setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:py-2 sm:text-sm rounded-full text-xs '>Logout</button>
    </div>
  )
}

export default NavBar
