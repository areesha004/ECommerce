import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../context/shopContext';
import Title from '../components/Title';

const Orders = () => {
  const { products, currency, orders } = useContext(ShopContext);

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  return (
    <div>
      <div className='border-t pt-8'>
        <div>
          <Title title1={'My'} title2={'Orders'} />
        </div>
        <div>
          {
            orders.map((order, orderIndex) => (
              order.items.map((item, itemIndex) => {
                const productData = products.find(product => product._id === item.itemId);

                return (
                  <div key={`${orderIndex}-${itemIndex}`} className='py-2 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                    <div className='flex items-start gap-6 text-sm'>
                      <img className='w-16 sm:w-20' src={productData?.image} alt="" />
                      <div>
                        <p className='sm:text-base font-medium'>{productData?.name}</p>
                        <div className='flex items-center gap-3 mt-2 text-base text-gray-900'>
                          <p className='text-lg'>{currency} {productData?.price}</p>
                          <p>Qty: {item.quantity}</p>
                          <p>Size: {item.size}</p>
                        </div>
                        <p className='mt-2'>Date: <span className='text-gray-400'>{new Date(order.date).toLocaleString() }</span></p>
                      </div>
                    </div>
                    <div className='md:w-1/2 flex justify-between'>
                      <div className='flex items-center gap-2'>
                        <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                        <p className='text-sm md:text-base'>{order.status}</p>
                      </div>
                      <button className='border px-4 py-2 text-small font-medium rounded-sm cursor-pointer'>Track Order</button>
                    </div>
                  </div>
                );
              })
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Orders;
