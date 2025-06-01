import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title';
import CartTotal from './../components/CartTotal';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import Orders from './Orders';
import { ShopContext } from '../context/shopContext';
import axios from 'axios';

const PlaceOrders = () => {
  
  const{token,currency,cartItems,backend_url,getCartAmount,delivery_fee }=useContext(ShopContext);
const navigate=useNavigate();
  const[method,setMethod]=useState('cod');
  const [name, setName] = useState({ first: '', last: '' });
  const [address,setAddress]=useState({street:'',city:'',country:''})

  const formattedAddress = `${address.street} ${address.city} ${address.country}`;
  const ordering=async(e)=>{
         e.preventDefault();

      let newArr=[];
      for(let id in cartItems){
        for(let size in cartItems[id]){
          if(cartItems[id][size]>0){
            newArr.push({
              itemId:id,
              size:size,
              quantity:cartItems[id][size]
            })
          }
        }
      }
      

      const totalAmount = getCartAmount() + delivery_fee;

      try {
        if(token){
          if(method=='cod'){
           await axios.post(`${backend_url}/api/order/cash`,
              {items:newArr,
                amount:totalAmount,
                address:formattedAddress},
              {headers:{token}})
  
          }
          else if(method=='stripe'){
         await axios.post(`${backend_url}/api/order/stripe`,
              {items:newArr,
                amount:totalAmount,
                address:formattedAddress},
              {headers:{token}})
          }
          else if(method=='razor'){
           await axios.post(`${backend_url}/api/order/razor`,
              {items:newArr,
                amount:totalAmount,
                address:formattedAddress},
              {headers:{token}})
          }
      
        }

      } catch (error) {
        console.log(error)
      }


      navigate('/Orders')
  }
  

  return (
    <form onSubmit={ordering} className='flex flex-col sm:flex-row justify-between gap-20 pt-5 sm:pt-14 min-h-[80vh]'>
      {/* ----------- Left Side ----------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        
        <div className='text-md sm:text-xl my-3'>
          <Title title1={'DELIVERY'} title2={'INFORMATION'} />
        </div>
  
        <div className='flex gap-3'>
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='First Name'
            required
           onChange={(e)=>setName(prev=>({...prev,first:e.target.value}) )} 
           value={name.first}
          />
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='Last Name'
            onChange={(e)=>setName(prev=>({...prev,last:e.target.value})) } 
            required
            value={name.last}
          />
        </div>

        <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='email'
            placeholder='Email address'
            required
          />
           <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='street'
            value={address.street}
            onChange={(e)=>setAddress(prev=>({...prev,street:e.target.value})) } 
            required
          />

<div className='flex gap-3'>
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='City'
            value={address.city}
            onChange={(e)=>setAddress(prev=>({...prev,city:e.target.value}) )} 
            required
          />
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='State'
            required
          />
        </div>
        <div className='flex gap-3'>
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='number'
            placeholder='Zip Code'
            required
          />
          <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='Country'
            value={address.country}
            onChange={(e)=>setAddress(prev=>({...prev,country:e.target.value}) )} 
            required
          />
        </div>
        <input
            className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
            type='text'
            placeholder='Phone'
            required
          />

      </div>
 {/* ----------- Right Side ----------- */}
<div className='mt-8'>

<div className='mt-8 min-w-80'>
<CartTotal></CartTotal>
</div>

<div className='mt-12'>
<Title title1={'PAYMENT'} title2={'METHOD'} />
    {/* Payment Method Selection */}
    <div className='flex flex-col gap-3 sm:flex-row'>
        <div onClick={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
        <p className={`min-w-3.5 h-3.5 border rounded-full ${method=='stripe'? 'bg-green-400' :''}`}></p>
            <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
        </div>
        <div onClick={()=>setMethod('razor')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
        <p className={`min-w-3.5 h-3.5 border rounded-full ${method=='razor'? 'bg-green-400' :''}`}></p>
            <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
        </div>
        <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method=='cod'? 'bg-green-400' :''}`}></p>
            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
        </div>
    </div>

    <div className='w-full text-end mt-8'>
    
    <button  type='submit' className='bg-black text-white px-16 py-3 text-sm cursor-pointer'>PLACE ORDER</button>
  
</div>

    </div>
</div>

</form>
  );
  
}

export default PlaceOrders
