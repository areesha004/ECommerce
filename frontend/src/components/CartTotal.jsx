import React, { useCallback, useContext } from 'react'
import { ShopContext } from '../context/shopContext'
import Title from './Title';

const CartTotal = () => {
    const{delivery_fee,getCartAmount,currency}=useContext(ShopContext);
    return (
        <div className='w-full'>
          <div className='text-2xl'>
            <Title title1={'CART'} title2={'TOTALS'} />
          </div>
      
          <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
              <p>Subtotal</p>
           <p>{currency} {getCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
              <p>Shipping Fee</p>
              <p>{currency} {delivery_fee}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
              <b>Total</b>
              <b>
  {currency} {
    getCartAmount() === 0
      ? '0.00'
      : (getCartAmount() + delivery_fee)
  }
</b>

            </div>
          </div>
        </div>
      );
      
}

export default CartTotal
