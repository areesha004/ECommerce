import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/shopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const {products}=useContext(ShopContext);
    const[bestseller,setBestSeller]=useState([])
useEffect(()=>{
 const bestProduct=products.filter((product)=>( product.bestseller==true))
 setBestSeller(bestProduct.slice(0,5));
},[products])

  return (
    <div className='py-10'>

      <div className='text-center py-8'>
    <Title title1={"Best"} title2={"Seller"}></Title>
    <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus perferendis voluptatum nisi, eos sed cumque neque! Inventore maxime quo obcaecati ratione accusantium aperiam numquam molestiae aliquam. Recusandae quos nihil nisi.</p>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8'>
    {
        bestseller.map((item)=>(
            <ProductItem key={item._id} name={item.name} id={item._id}  image={item.image} price={item.price}/>
        ))
    }
      </div>

    </div>
  )
}

export default BestSeller
