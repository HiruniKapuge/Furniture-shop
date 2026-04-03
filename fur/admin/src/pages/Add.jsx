// import React, { useState } from 'react';
// import { assets } from '../assets/assets';
// import axios from 'axios';
// import { backendUrl } from '../App';
// import { toast } from 'react-toastify';

// const Add = ({ url, token }) => {
//     const [images, setImages] = useState([null, null, null, null]);
//     const [data, setData] = useState({
//         name: "",
//         description: "",
//         price: "",
//         category: "Bed",
//         subCategory: "Timber",
//         bestsellers: false,
//         sizes: []
//     });

//     const onChangeHandler = (e) => {
//         const { name, value, type, checked } = e.target;
//         setData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
//     };

//     const onSizeChange = (size) => {
//         setData(prev => ({
//             ...prev,
//             sizes: prev.sizes.includes(size) ? prev.sizes.filter(s => s !== size) : [...prev.sizes, size]
//         }));
//     };
    
//     const onImageChange = (e, index) => {
//         const newImages = [...images];
//         newImages[index] = e.target.files[0];
//         setImages(newImages);
//     };

//     const onSubmitHandler = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         Object.entries(data).forEach(([key, value]) => {
//             if (key === 'sizes') {
//                 formData.append(key, JSON.stringify(value));
//             } else {
//                 formData.append(key, value);
//             }
//         });
//         images.forEach((image, index) => {
//             if (image) formData.append(`image${index + 1}`, image);
//         });

//         try {
//             const response = await axios.post(`${url}/api/product/add`, formData, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             if (response.data.success) {
//                 toast.success("Product Added!");
//                 // Reset form
//                 setData({ name: "", description: "", price: "", category: "Bed", subCategory: "Timber", bestsellers: false, sizes: [] });
//                 setImages([null, null, null, null]);
//             } else {
//                 toast.error(response.data.message);
//             }
//         } catch (error) {
//             toast.error("Failed to add product.");
//         }
//     };
    
//     const sizeOptions = {
//         Bed: ['King', 'Queen', 'Normal'],
//         Table: ['4 Seater', '6 Seater', '8 Seater'],
//         Chair: ['Small', 'Medium', 'Large'],
//         Cupboard: ['2 Door', '3 Door', '4 Door']
//     };

//     return (
//         <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-6'>
//             <div>
//                 <p className='mb-2 font-medium'>Upload Images (up to 4)</p>
//                 <div className='flex gap-4'>
//                     {[0, 1, 2, 3].map(index => (
//                         <label key={index} htmlFor={`image${index}`} className="cursor-pointer">
//                             <img className='w-24 h-24 object-cover border-2 border-dashed rounded-md' src={images[index] ? URL.createObjectURL(images[index]) : assets.upload_area} alt='' />
//                         </label>
//                     ))}
//                      <input type='file' id="image0" hidden onChange={(e) => onImageChange(e, 0)} />
//                      <input type='file' id="image1" hidden onChange={(e) => onImageChange(e, 1)} />
//                      <input type='file' id="image2" hidden onChange={(e) => onImageChange(e, 2)} />
//                      <input type='file' id="image3" hidden onChange={(e) => onImageChange(e, 3)} />
//                 </div>
//             </div>
//             <div className='w-full'>
//                 <p className='mb-2 font-medium'>Product Name</p>
//                 <input name="name" onChange={onChangeHandler} value={data.name} className='w-full max-w-lg px-3 py-2 border rounded-md' type='text' placeholder='Type here' required />
//             </div>
//             <div className='w-full'>
//                 <p className='mb-2 font-medium'>Product Description</p>
//                 <textarea name="description" onChange={onChangeHandler} value={data.description} className='w-full max-w-lg px-3 py-2 border rounded-md' rows="4" placeholder='Write content here' required />
//             </div>
//             <div className='flex flex-wrap gap-6 w-full'>
//                 <div>
//                     <p className='mb-2 font-medium'>Category</p>
//                     <select name="category" onChange={onChangeHandler} value={data.category} className='px-3 py-2 border rounded-md'>
//                         <option value='Bed'>Bed</option>
//                         <option value='Table'>Table</option>
//                         <option value='Chair'>Chair</option>
//                         <option value='Cupboard'>Cupboard</option>
//                     </select>
//                 </div>
//                 <div>
//                     <p className='mb-2 font-medium'>Sub Category</p>
//                     <select name="subCategory" onChange={onChangeHandler} value={data.subCategory} className='px-3 py-2 border rounded-md'>
//                         <option value='Timber'>Timber</option>
//                         <option value='Glass'>Glass</option>
//                         <option value='Plastic'>Plastic</option>
//                         <option value='Cushion'>Cushion</option>
//                     </select>
//                 </div>
//                 <div>
//                     <p className='mb-2 font-medium'>Price</p>
//                     <input name="price" onChange={onChangeHandler} value={data.price} className='w-32 px-3 py-2 border rounded-md' type='number' placeholder='2500' required />
//                 </div>
//             </div>
//             <div className='w-full'>
//                 <p className='mb-2 font-medium'>Sizes</p>
//                 <div className='flex gap-3 flex-wrap'>
//                     {(sizeOptions[data.category] || []).map(size => (
//                         <div key={size} onClick={() => onSizeChange(size)} className={`border px-4 py-2 rounded-full cursor-pointer ${data.sizes.includes(size) ? 'bg-black text-white' : 'bg-gray-100'}`}>
//                             {size}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//              <div className='flex items-center gap-3'>
//                 <input name="bestsellers" type="checkbox" onChange={onChangeHandler} checked={data.bestsellers} id="bestseller"/>
//                 <label htmlFor="bestseller">Mark as Bestseller</label>
//             </div>
//             <button type="submit" className='w-32 py-3 mt-4 bg-black text-white rounded-md'>ADD</button>
//         </form>
//     );
// };

// export default Add;
// import React, { useContext, useMemo } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import Title from './Title';
// import Productitem from './Productitem';

// const BestSeller = () => {
//     const { products } = useContext(ShopContext);

//     // Use useMemo to efficiently filter and memoize the bestseller list.
//     // This calculation only re-runs when the 'products' array changes.
//     const bestSellerProducts = useMemo(() => {
//         return products
//             .filter((item) => item.bestsellers) // Correctly filter by the 'bestsellers' boolean flag
//             .slice(0, 5); // Get the top 5 bestsellers
//     }, [products]);

//     return (
//         <div className='my-10'>
//             <div className='text-center text-3xl py-8'>
//                 <Title text1={'BEST'} text2={'SELLERS'} />
//                 <p className='w-full max-w-3xl m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-4'>
//                     Discover our best-selling products that have captured the hearts of our customers. These items are loved for their quality, style, and performance. Don't miss out on the chance to own these favorites!
//                 </p>
//             </div>

//             {/* Grid for displaying the products */}
//             <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-6'>
//                 {bestSellerProducts.map((item) => (
//                     <Productitem
//                         key={item._id} // Use the unique item ID as the key
//                         id={item._id}
//                         image={item.image}
//                         name={item.name}
//                         price={item.price}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default BestSeller;

