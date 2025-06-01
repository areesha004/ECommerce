import React, { useEffect, useState } from 'react'
import { backend_url } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'
import { currency } from '../App'


const List = ({token}) => {
const[newList,setList]=useState([])

const fetchData=async()=>{
  try {
    const response=await axios.get(`${backend_url}/api/product/list`)
    if(response.data.success){
      setList(response.data.product);
      
    }
    else{
     toast.error(response.data.message)
    }
  } catch (error) {
     toast.error(error.message)
  }
  
  }
  useEffect(()=>{
  fetchData()
  },[])
  

const handleDelete=async(id)=>{
  try {
    const response =await axios.delete(`${backend_url}/api/product/remove`,{headers:{token},data: { id }})
    if(response.data.success){
      toast.success(response.data.message)
      await fetchData()
    }
    else{
      toast.error(response.data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}



  return (
    <div>
      <p className='mb-2'>All Products List</p>
<div className='flex flex-col gap-2'>

  {/* ------- List Table Title -------- */}

  <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border-b'>
    <b>Image</b>
    <b>Name</b>
    <b>Category</b>
    <b>Price</b>
    <b className='text-center'>Action</b>
  </div>

  {/* ------- Product List ------- */}

  {
    newList.map((item, index) => (
      <div className='border grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 text-sm' key={index}>
        <img className='w-12' src={item.image[0]} alt="" />
        <p>{item.name}</p>
        <p>{item.category} </p>
        <p>{currency}{item.price}</p>
        <p onClick={()=>handleDelete(item._id)} className='cursor-pointer text-right md:text-center text-lg'>X</p>
      </div>
    ))
  }

</div>

    </div>
  )
}

export default List
