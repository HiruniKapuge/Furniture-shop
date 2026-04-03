
// import React, { useState, useEffect } from 'react'
// import { backendUrl,currency } from '../App'
// import axios from 'axios';
// import { toast } from 'react-toastify';


// const List = ({ url, token, currency }) => {
//     const [list, setList] = useState([]);

//     const fetchList = async () => {
//         try {
//             const response = await axios.get(`${url}/api/product/list`);
//             if (response.data.success) {
//                 setList(response.data.products);
//             } else {
//                 toast.error("Error fetching product list.");
//             }
//         } catch (error) {
//             toast.error("Network error fetching products.");
//         }
//     };

//     const removeProduct = async (productId) => {
//         try {
//             const response = await axios.post(`${url}/api/product/remove`, { id: productId }, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             if (response.data.success) {
//                 toast.success("Product removed!");
//                 fetchList();
//             } else {
//                 toast.error(response.data.message);
//             }
//         } catch (error) {
//             toast.error("Failed to remove product.");
//         }
//     };

//     useEffect(() => {
//         fetchList();
//     }, []);

//     return (
//         <div>
//             <p className='mb-4 text-xl font-semibold'>All Products List</p>
//             <div className='text-sm'>
//                 <div className='hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center py-3 px-4 bg-gray-100 font-medium'>
//                     <b>Image</b>
//                     <b>Name</b>
//                     <b>Category</b>
//                     <b>Price</b>
//                     <b className='text-center'>Action</b>
//                 </div>
//                 {list.map(item => (
//                     <div className='grid grid-cols-[1fr_2fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] items-center gap-4 py-3 px-4 border-b' key={item._id}>
//                         <img className='w-16 h-16 object-cover rounded-md' src={item.image[0]} alt={item.name} />
//                         <p>{item.name}</p>
//                         <p className='hidden md:block'>{item.category}</p>
//                         <p className='hidden md:block'>{currency}{item.price}</p>
//                         <p onClick={() => removeProduct(item._id)} className='text-center cursor-pointer text-xl font-bold text-red-500'>×</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// // --- Orders Component ---
// const Orders = ({ url, token, currency }) => {
//     const [orders, setOrders] = useState([]);

//     const fetchAllOrders = async () => {
//         try {
//             const response = await axios.get(`${url}/api/order/list`, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             if (response.data.success) {
//                 setOrders(response.data.data);
//             } else {
//                 toast.error("Error fetching orders");
//             }
//         } catch (error) {
//             toast.error("Network error fetching orders.");
//         }
//     };

//     const statusHandler = async (event, orderId) => {
//         try {
//             const response = await axios.post(`${url}/api/order/status`, {
//                 orderId,
//                 status: event.target.value
//             }, { headers: { Authorization: `Bearer ${token}` } });
//             if (response.data.success) {
//                 toast.success("Order status updated!");
//                 fetchAllOrders();
//             }
//         } catch (error) {
//             toast.error("Failed to update status.");
//         }
//     };

//     useEffect(() => {
//         fetchAllOrders();
//     }, []);

//     return (
//         <div>
//             <p className='mb-4 text-xl font-semibold'>All Orders</p>
//             <div className='flex flex-col gap-4'>
//                 {orders.map(order => (
//                     <div key={order._id} className='grid grid-cols-2 md:grid-cols-[0.5fr_2fr_1fr_1fr] items-start gap-4 p-4 border rounded-md text-sm'>
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
//                         <p className='text-center'>{currency}{order.amount}</p>
//                         <select onChange={(e) => statusHandler(e, order._id)} value={order.status} className='p-2 border rounded-md'>
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

// export default List
