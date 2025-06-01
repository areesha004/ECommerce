import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/shopContext'
import Title from './Title';
import ProductItem from './ProductItem';
const LatestCollection = () => {

    const {products}=useContext(ShopContext);
    const [latestProducts,setLatest]=useState([]);

    useEffect(()=>{
   setLatest(products.slice(0,10))
    },[products])
   
  return (
    <div className='my-10'>
        <div className='text-center py-8'>
      <Title title1={"Latest"} title2={"Collection"}></Title>
      <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta, pariatur! Distinctio, fugiat. Totam, delectus voluptas, quis deserunt ipsum nobis impedit dolore voluptatum doloremque iste nesciunt dolor, laboriosam consequuntur laborum dicta?
      </p>
      </div>

<div className='grid grid-col-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-col-5 gap-4'>
      {
        latestProducts.map((item)=>(
       <ProductItem key={item._id} name={item.name} id={item._id} image={item.image} price={item.price}></ProductItem>
        ))
      }
</div>

    </div>
  )
}

export default LatestCollection
