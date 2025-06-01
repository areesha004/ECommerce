import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/shopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from './../components/CartTotal';
import { Link } from 'react-router-dom';


const Cart = () => {
  const {products,cartItems,currency,updateProducts}=useContext(ShopContext);

  const[cartProducts,setCartProducts]=useState([]);
  const[productData,setProductdata]=useState();

  useEffect(()=>{
  const tempData=[];
  for (let id in cartItems){
    for(let sizes in cartItems[id]){
      tempData.push({
        _id:id,
        size:sizes,
        quantity:cartItems[id][sizes]
      })
    }
  }
 setCartProducts(tempData)
  },[cartItems,products])

 
 

  return (
    <div className='flex flex-col gap-3 mt-3'>
    {/* Page title */}
    <Title title1={"Your"} title2={"Cart"} />
  
    {/* Cart items */}
    <div className='flex flex-col gap-3 mt-3'>
      {
        cartProducts.map((item, index) => {
          const productData = products.find(product => product._id === item._id);
          return (
            <React.Fragment key={`${item._id}-${item.size}`}>
              <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row gap-3'>
                  <img src={productData?.image[0]} alt="" className='w-16' />
                  <div className='flex flex-col gap-2'>
                    <p>{productData?.name}</p>
                    <div className='flex flex-row gap-4'>
                      <p className='text-md'> {currency}{productData?.price}</p>
                      <p className='flex justify-center items-center gap-3 bg-gray-200 w-8 rounded cursor-pointer'> {item.size}</p>
                    </div>
                  </div>
                </div>
                <input className="border border-gray-300 px-6 py-1 text-sm " type="number" min={1} defaultValue={item.quantity} />
                <img onClick={() => updateProducts({ itemId: item._id, size: item.size })} src={assets.bin_icon} alt="" className='w-4 cursor-pointer' />
              </div>
              <hr className='h-2 w-full text-gray-300' />
            </React.Fragment>
          );
        })
      }
    </div>

    <div className='flex justify-end my-20'>
  <div className='w-full sm:w-[450px]'>
    <CartTotal></CartTotal>
    <div className='w-full text-end'>
      <Link to={'/PlaceOrders'}>
      <button className="bg-black text-white p-3 cursor-pointer text-sm">PROCEED TO CHECKOUT</button>
      </Link>
    </div>
  </div>
    </div>

  </div>
  
  )
}

export default Cart
