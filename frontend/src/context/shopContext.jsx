import React, {createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10; 
  const backend_url=import.meta.env.VITE_BACKEND_URL;
  const[showSearch,setShowSearch]=useState(false);
  const[search,setSearch]=useState('');
  const[cartItems,setCartItems]=useState([]);
  const[products,setProducts]=useState([])
  const[token,setToken]=useState('')
  const[orders,setOrders]=useState([]);

  const fetchdata=async()=>{
    try {
      
      const response= await axios.get(`${backend_url}/api/product/list`)
      if(response.data.success){
     
        setProducts(response.data.product)
        
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
   
  }
  const getCartData=async(token)=>{
    try {
      const response=await axios.get(`${backend_url}/api/cart/data`,{headers:{token}})
      console.log(response.data.cartData)
  if(response.data.success){
    setCartItems(response.data.cartData)
  }

    } 
    catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    fetchdata()
  
  },[])
  useEffect(()=>{
  if(!token && localStorage.getItem("token")){
    setToken(localStorage.getItem("token"))
    getCartData(localStorage.getItem("token"));
  }
  },[])

  const addToCart=async({itemId,size})=>{
    const cartData=structuredClone(cartItems);
    if(!size){
toast.error('Select product size');
return;
    }
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
          cartData[itemId][size] += 1;
      } else {
          cartData[itemId][size] = 1;
      }
  } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
  }
  
  setCartItems(cartData);

  if(token){
    try {
      const response=await axios.post(`${backend_url}/api/cart/add`,{itemId,size},{headers:{token}})
  console.log(response.data)
    } catch (error) {
      toast.error(error.message)
    }
  }
  }

  const getCartCount=()=>{
    let count=0
    for(let itemId in cartItems){
      for(let size in cartItems[itemId]){
        count+=cartItems[itemId][size]
      }
    }
    return count;
  }
  const getCartAmount = () => {
    let totalAmount = 0;
  
    for (const productId in cartItems) {
      const itemInfo = products.find(product => product._id === productId);
  
      if (!itemInfo) continue;
  
      for (const size in cartItems[productId]) {
        try {
          const quantity = cartItems[productId][size];
          if (quantity > 0) {
            totalAmount += Number(itemInfo.price) * quantity;
          }
        } catch (error) {
          console.error(`Error calculating total for product ${productId}, size ${size}:`, error);
        }
      }
    }
  
    return totalAmount;
  };
  

  const updateProducts=async({itemId,size})=>{
   
      if(token){
        try {
         const response= await axios.post(`${backend_url}/api/cart/update`,{itemId,size},{headers:{token}})
         if (response.data.success) {
          // Immediately update cart in frontend
          const updatedCart = structuredClone(cartItems);
          
          if (updatedCart[itemId]) {
            delete updatedCart[itemId][size];
    
            if (Object.keys(updatedCart[itemId]).length === 0) {
              delete updatedCart[itemId];
            }
          }
    
          setCartItems(updatedCart);
          toast.success('Item removed from cart');
        }
        } catch (error) {
          toast.error(error.message)
        }
      }  
  }

  const ordersList=async()=>{
   try {
    if(token){
      const response= await axios.get(`${backend_url}/api/order/userOrders`,{headers:{token}})
       setOrders(response.data.response);
       console.log(orders)
    }
   } catch (error) {
    console.log(error)
   }
  }
  useEffect(()=>{
    ordersList()
  },[token])

  const value = {
    products,
    delivery_fee, 
    currency,
    showSearch,
    setSearch,search,setShowSearch,addToCart,cartItems,getCartCount,updateProducts,
    getCartAmount,setCartItems,
    backend_url,
    token,setToken,
    orders
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
