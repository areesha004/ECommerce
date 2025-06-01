import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from './../context/shopContext';
import { assets } from '../assets/assets';
import RelatedProducts from './../components/RelatedProducts';

const Product = () => {
  const {productId} =useParams();
  const {products,currency,addToCart,cartItems}=useContext(ShopContext);
const [newProducts,setProducts]=useState(null);
const [image,setImage]=useState();
const [size,setSize]=useState('');
   
useEffect(() => {
  const item= products.find(item => item._id === productId);
  if (item) {
    setImage(item.image[0]);
    setProducts(item);
  }
}, [productId, products]);

  return (
    <div className='flex flex-col mt-5 ' >
      <div className='flex flex-col sm:flex-row  gap-4 '>
            {/*images*/}
       <div className='flex flex-row gap-4 w-3/4'>
        {/* multiple images*/}
 <div className='flex flex-col gap-2'>
    {
      newProducts?.image?.length>0?
      newProducts.image.map((item,index)=>(
        <img onClick={()=>setImage(item)} key={index} src={item} alt=""   className="w-24  object-cover cursor-pointer hover:scale-110 transition ease-in-out "
/>     ))
      :null
    }
 </div>
 {/*single images*/}
 <div className='flex'>
     <img src={image} alt="" className='w-full'  />
 </div>
       </div>
        {/*product description*/}
        <div className='flex flex-col px-3'>
          <h1 className='font-medium text-2xl'>{newProducts?.name}</h1>

          <div className='flex flex-row gap-1 pt-2'>
<img src={assets.star_icon} alt=""  className='w-4'/>
<img src={assets.star_icon} alt="" className='w-4' />
<img src={assets.star_icon} alt="" className='w-4' />
<img src={assets.star_icon} alt=""  className='w-4'/>
<img src={assets.star_dull_icon} alt=""  className='w-4'/>
<p>(122)</p>
          </div>

   <h2 className=' text-2xl  pt-2'>{newProducts?.price}{currency}</h2>
   <p className=' text-sm pt-2 w-2/4'>{newProducts?.description}</p>

   <div className='flex flex-col gap-2 pt-2'>
    <h1 className=' text-xl font-medium pt-2'>Select Size</h1>
    <div className='pt-2 flex flex-row gap-3'>
      {
        newProducts?.sizes?.map((item,index)=>(
          <button key={index} onClick={()=>setSize(item)} className={`flex justify-center items-center gap-3 bg-gray-200 h-8 w-8 rounded cursor-pointer ${size==item? "border border-gray-700":null}`} >{item}</button>
        ))
      }
    </div>
    <button onClick={() => addToCart({ itemId: newProducts?._id, size })} className='p-3 bg-black text-white text-sm w-1/4 cursor-pointer mt-2'>ADD TO CART</button>
<hr className='h-2 w-full text-gray-300 mt-2' />
<div className='flex flex-col text-gray-400'>
<p className='text'>100% original product</p>
<p>Cash on deleivery available on this product</p>
<p>Every return and exchange policy within 7 days</p>
</div>

   </div>
  
        </div>
      </div>
       {/*reviews and deescription*/}
       <div className='flex flex-row mt-20 '>
        <p  className='p-2 border border-gray-400 cursor-pointer'> <b>Description</b></p>
        <p className='p-2 border border-gray-400 cursor-pointer'> <b>Reviews(122)</b></p>
       </div>
       <div className='flex flex-col border border-gray-400 gap-2 text-gray-600 p-3 mt-3'>
        <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the Internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
        <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
       </div>


<RelatedProducts category={newProducts?.category} subCategory={newProducts?.subCategory}></RelatedProducts>
      
    </div>
  )
}

export default Product
