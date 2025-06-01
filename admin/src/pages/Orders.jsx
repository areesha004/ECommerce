import React, { useState, useEffect } from 'react';
import { backend_url } from '../App';
import axios from 'axios';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);


  const ordersList = async () => {
    try {
      if (token) {
        const response = await axios.get(`${backend_url}/api/order/list`, {
          headers: { token },
        });
        setOrders(response.data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ordersList();
    
  }, [token]);


   const onchangeStatus=async({orderId,newStatus})=>{
  try {
    
  const response=await axios.post(`${backend_url}/api/order/status`,{orderId,newStatus},{headers:{token}});
  console.log(response)
  } catch (error) {
    console.log(error)
  }

   }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border p-4 mb-4 rounded-lg shadow-md bg-white"
          >
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Amount:</strong> Rs. {order.amount}</p>
            <p><strong>Payment Method:</strong> {order.paymentMethod}</p>

           <select   onChange={(e) => onchangeStatus({orderId:order._id, newStatus:e.target.value})} value={order.status}>
           <option value="Ordered Placed">Ordered Placed</option>
           <option value="Packing">Packing</option>
           <option value="Shipping">Shipping</option>
           <option value="Out for deleivery">Out for Deleivery</option>
           <option value="Deleivered">Deleiverd</option>
           </select>
           
            <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
            <div>
              <strong>Items:</strong>
              <ul className="list-disc pl-5">
                {order.items.map((item, idx) => (
                  <li key={idx}>{JSON.stringify(item)}</li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
