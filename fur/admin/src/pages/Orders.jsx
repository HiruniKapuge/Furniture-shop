// import React from 'react'
// import axios from 'axios';
// import { useEffect } from 'react';
// import { useState } from 'react';

// const Orders = ({ url, token, currency }) => {
//     const [orders, setOrders] = useState([]);
//     const fetchAllOrders = async () => {
//         const response = await axios.get(`${url}/api/order/list`, { headers: { Authorization: `Bearer ${token}` } });
//         if (response.data.success) setOrders(response.data.data);
//         else toast.error("Error fetching orders");
//     };
//     const statusHandler = async (event, orderId) => {
//         const response = await axios.post(`${url}/api/order/status`, { orderId, status: event.target.value }, { headers: { Authorization: `Bearer ${token}` } });
//         if (response.data.success) {
//             toast.success("Order status updated!");
//             fetchAllOrders();
//         }
//     };
//     useEffect(() => { fetchAllOrders(); }, []);
//     return (
//         <div>
//             <p className='mb-4 text-xl font-semibold'>All Orders</p>
//             <div className='flex flex-col gap-4'>
//                 {orders.map(order => (
//                     <div key={order._id} className='grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr_1fr] items-start gap-4 p-4 border rounded-md text-sm'>
//                         <img src={assets.parcel_icon} alt="Parcel" className="w-10" />
//                         <div>
//                             <p className='font-semibold'>
//                                 {order.items.map((item, index) => `${item.name} x ${item.quantity}${index === order.items.length - 1 ? '' : ', '}`)}
//                             </p>
//                             <p className='font-bold mt-2'>{order.address.firstName} {order.address.lastName}</p>
//                             <div className='text-gray-600'>
//                                 <p>{order.address.street},</p>
//                                 <p>{order.address.city}, {order.address.district}</p>
//                             </div>
//                             <p className='text-gray-600'>{order.address.phone}</p>
//                         </div>
//                         <p className='text-left md:text-center'>{currency}{order.amount}</p>
//                         <select onChange={(e) => statusHandler(e, order._id)} value={order.status} className='p-2 border rounded-md w-full md:w-auto'>
//                             <option value="Food Processing">Food Processing</option>
//                             <option value="Out for delivery">Out for delivery</option>
//                             <option value="Delivered">Delivered</option>
//                         </select>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Orders
