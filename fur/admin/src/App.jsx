
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

// --- Reusable Assets ---
const assets = {
    logo: 'https://placehold.co/150x40/000000/FFFFFF?text=AdminPanel',
    add_icon: 'https://placehold.co/30x30/4CAF50/FFFFFF?text=+',
    order_icon: 'https://placehold.co/30x30/2196F3/FFFFFF?text=≡',
    upload_area: 'https://placehold.co/100x100/E0E0E0/9E9E9E?text=Upload',
    parcel_icon: 'https://placehold.co/40x40/FF9800/FFFFFF?text=📦'
};

// --- Main App Component ---
const App = () => {
    const url = "http://localhost:4000";
    const currency = 'LKR ';
    const [token, setToken] = useState(localStorage.getItem("admin_token"));
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            localStorage.setItem("admin_token", token);
            if (window.location.pathname === "/login") {
                navigate("/add");
            }
        }
    }, [token, navigate]);

    const logout = () => {
        localStorage.removeItem("admin_token");
        setToken(null);
        toast.info("Logged out successfully.");
    };

    if (!token) {
        return (
            <>
                <ToastContainer />
                <Routes>
                    <Route path="/login" element={<Login setToken={setToken} url={url} />} />
                    <Route path="*" element={<Login setToken={setToken} url={url} />} />
                </Routes>
            </>
        );
    }

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            <Navbar logout={logout} />
            <hr />
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-6 bg-gray-50 min-h-screen">
                    <Routes>
                        <Route path="/add" element={<Add url={url} token={token} currency={currency} />} />
                        <Route path="/list" element={<List url={url} token={token} currency={currency} />} />
                        <Route path="/orders" element={<Orders url={url} token={token} currency={currency} />} />
                        <Route path="/edit/:productId" element={<EditProduct url={url} token={token} currency={currency} />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

// --- Login Component ---
const Login = ({ setToken, url }) => {
    const [data, setData] = useState({ email: "", password: "" });

    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/api/user/admin`, data);
            if (response.data.success) {
                setToken(response.data.token);
                toast.success("Login Successful!");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed.");
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <form onSubmit={onSubmitHandler} className='bg-white shadow-lg rounded-lg px-8 py-10 max-w-md w-full'>
                <h1 className='text-3xl font-bold mb-6 text-center'>Admin Login</h1>
                <div className='mb-4'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Email</label>
                    <input name="email" onChange={onChangeHandler} value={data.email} className='w-full px-3 py-2 border rounded-md' type="email" placeholder='admin@example.com' required />
                </div>
                <div className='mb-6'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
                    <input name="password" onChange={onChangeHandler} value={data.password} className='w-full px-3 py-2 border rounded-md' type="password" placeholder='••••••••' required />
                </div>
                <button className='w-full py-2 px-4 rounded-md text-white bg-black hover:bg-gray-800' type="submit">LOGIN</button>
            </form>
        </div>
    );
};

// --- Add Component (Modified to Make Image Upload Optional) ---
const Add = ({ url, token, currency }) => {
    const [images, setImages] = useState([null, null, null, null]);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        discount: "0",
        category: "Bed",
        subCategory: "Timber",
        bestsellers: false,
        sizes: []
    });

    const onChangeHandler = (e) => {
        const { name, value, type, checked } = e.target;
        setData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const onSizeChange = (size) => {
        setData(prev => ({
            ...prev,
            sizes: prev.sizes.includes(size) ? prev.sizes.filter(s => s !== size) : [...prev.sizes, size]
        }));
    };

    const onImageChange = (e, index) => {
        const newImages = [...images];
        newImages[index] = e.target.files[0];
        setImages(newImages);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        // Client-side validation
        if (!data.name.trim()) {
            toast.error("Product name is required.");
            return;
        }
        if (!data.description.trim()) {
            toast.error("Product description is required.");
            return;
        }
        if (!data.price || isNaN(data.price) || parseFloat(data.price) <= 0) {
            toast.error("Price must be a positive number.");
            return;
        }
        if (data.discount && (isNaN(data.discount) || parseFloat(data.discount) < 0 || parseFloat(data.discount) > 100)) {
            toast.error("Discount must be between 0 and 100.");
            return;
        }
        if (data.sizes.length === 0) {
            toast.error("At least one size must be selected.");
            return;
        }

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === 'sizes') formData.append(key, JSON.stringify(value));
            else formData.append(key, value);
        });
        images.forEach((image, index) => {
            if (image) formData.append(`image${index + 1}`, image);
        });

        try {
            const response = await axios.post(`${url}/api/product/add`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                toast.success("Product Added!");
                setData({
                    name: "",
                    description: "",
                    price: "",
                    discount: "0",
                    category: "Bed",
                    subCategory: "Timber",
                    bestsellers: false,
                    sizes: []
                });
                setImages([null, null, null, null]);
            } else {
                toast.error(response.data.message || "Failed to add product.");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add product.");
        }
    };

    // Calculate net value for display
    const price = parseFloat(data.price) || 0;
    const discount = parseFloat(data.discount) || 0;
    const netValue = price - (price * discount / 100);

    const sizeOptions = {
        Bed: ['King', 'Queen', 'Normal'],
        Table: ['4 Seater', '6 Seater', '8 Seater'],
        Chair: ['Small', 'Medium', 'Large'],
        Cupboard: ['2 Door', '3 Door', '4 Door']
    };

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-6'>
            <div>
                <p className='mb-2 font-medium'>Upload Images (Optional, up to 4)</p>
                <div className='flex gap-4'>
                    {[0, 1, 2, 3].map(index => (
                        <label key={index} htmlFor={`image${index}`} className="cursor-pointer">
                            <img className='w-24 h-24 object-cover border-2 border-dashed rounded-md' src={images[index] ? URL.createObjectURL(images[index]) : assets.upload_area} alt='' />
                            <input type='file' id={`image${index}`} hidden onChange={(e) => onImageChange(e, index)} accept="image/*" />
                        </label>
                    ))}
                </div>
            </div>
            <div className='w-full'>
                <p className='mb-2 font-medium'>Product Name</p>
                <input name="name" onChange={onChangeHandler} value={data.name} className='w-full max-w-lg px-3 py-2 border rounded-md' type='text' placeholder='Type here' required />
            </div>
            <div className='w-full'>
                <p className='mb-2 font-medium'>Product Description</p>
                <textarea name="description" onChange={onChangeHandler} value={data.description} className='w-full max-w-lg px-3 py-2 border rounded-md' rows="4" placeholder='Write content here' required />
            </div>
            <div className='flex flex-wrap gap-6 w-full'>
                <div>
                    <p className='mb-2 font-medium'>Category</p>
                    <select name="category" onChange={onChangeHandler} value={data.category} className='px-3 py-2 border rounded-md'>
                        <option value='Bed'>Bed</option>
                        <option value='Table'>Table</option>
                        <option value='Chair'>Chair</option>
                        <option value='Cupboard'>Cupboard</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2 font-medium'>Sub Category</p>
                    <select name="subCategory" onChange={onChangeHandler} value={data.subCategory} className='px-3 py-2 border rounded-md'>
                        <option value='Timber'>Timber</option>
                        <option value='Glass'>Glass</option>
                        <option value='Plastic'>Plastic</option>
                        <option value='Cushion'>Cushion</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2 font-medium'>Price</p>
                <input name="price" onChange={onChangeHandler} value={data.price} className='w-32 px-3 py-2 border rounded-md' type='number' placeholder='2500' required min="0" step="0.01" />
                </div>
                <div>
                    <p className='mb-2 font-medium'>Discount (%)</p>
                    <input
                        name="discount"
                        onChange={onChangeHandler}
                        value={data.discount}
                        className='w-32 px-3 py-2 border rounded-md'
                        type='number'
                        placeholder='0'
                        min="0"
                        max="100"
                        step="0.01"
                        required
                    />
                </div>
                <div>
                    <p className='mb-2 font-medium'>Net Value</p>
                    <input
                        value={netValue.toFixed(2)}
                        className='w-32 px-3 py-2 border rounded-md bg-gray-100'
                        type='text'
                        disabled
                    />
                </div>
            </div>
            <div className='w-full'>
                <p className='mb-2 font-medium'>Sizes (select at least one)</p>
                <div className='flex gap-3 flex-wrap'>
                    {(sizeOptions[data.category] || []).map(size => (
                        <div key={size} onClick={() => onSizeChange(size)} className={`border px-4 py-2 rounded-full cursor-pointer ${data.sizes.includes(size) ? 'bg-black text-white' : 'bg-gray-100'}`}>
                            {size}
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex items-center gap-3'>
                <input name="bestsellers" type="checkbox" onChange={onChangeHandler} checked={data.bestsellers} id="bestseller" />
                <label htmlFor="bestseller">Mark as Bestseller</label>
            </div>
            <button type="submit" className='w-32 py-3 mt-4 bg-black text-white rounded-md'>ADD</button>
        </form>
    );
};

// --- EditProduct Component ---
const EditProduct = ({ url, token, currency }) => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.post(`${url}/api/product/single`, { productId });
                if (response.data.success) {
                    setData(response.data.product);
                } else {
                    toast.error("Failed to fetch product data.");
                }
            } catch (error) {
                toast.error("Error fetching product.");
            }
        };
        fetchProductData();
    }, [productId, url]);

    const onChangeHandler = (e) => {
        const { name, value, type, checked } = e.target;
        setData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const onSizeChange = (size) => {
        setData(prev => ({
            ...prev,
            sizes: prev.sizes.includes(size) ? prev.sizes.filter(s => s !== size) : [...prev.sizes, size]
        }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const updatedData = {
            ...data,
            netValue: parseFloat(data.price) - (parseFloat(data.price) * parseFloat(data.discount || 0) / 100)
        };
        try {
            const response = await axios.put(`${url}/api/product/update/${productId}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                toast.success("Product Updated!");
                navigate("/list");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to update product.");
        }
    };

    if (!data) return <div className="text-center">Loading...</div>;

    const price = parseFloat(data.price) || 0;
    const discount = parseFloat(data.discount) || 0;
    const netValue = price - (price * discount / 100);

    const sizeOptions = {
        Bed: ['King', 'Queen', 'Normal'],
        Table: ['4 Seater', '6 Seater', '8 Seater'],
        Chair: ['Small', 'Medium', 'Large'],
        Cupboard: ['2 Door', '3 Door', '4 Door']
    };

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-6'>
            <h2 className="text-xl font-semibold">Edit Product</h2>
            <div className='w-full'>
                <p className='mb-2 font-medium'>Product Name</p>
                <input name="name" onChange={onChangeHandler} value={data.name} className='w-full max-w-lg px-3 py-2 border rounded-md' type='text' required />
            </div>
            <div className='w-full'>
                <p className='mb-2 font-medium'>Product Description</p>
                <textarea name="description" onChange={onChangeHandler} value={data.description} className='w-full max-w-lg px-3 py-2 border rounded-md' rows="4" required />
            </div>
            <div className='flex flex-wrap gap-6 w-full'>
                <div>
                    <p className='mb-2 font-medium'>Category</p>
                    <select name="category" onChange={onChangeHandler} value={data.category} className='px-3 py-2 border rounded-md'>
                        <option value='Bed'>Bed</option>
                        <option value='Table'>Table</option>
                        <option value='Chair'>Chair</option>
                        <option value='Cupboard'>Cupboard</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2 font-medium'>Sub Category</p>
                    <select name="subCategory" onChange={onChangeHandler} value={data.subCategory} className='px-3 py-2 border rounded-md'>
                        <option value='Timber'>Timber</option>
                        <option value='Glass'>Glass</option>
                        <option value='Plastic'>Plastic</option>
                        <option value='Cushion'>Cushion</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2 font-medium'>Price</p>
                    <input name="price" onChange={onChangeHandler} value={data.price} className='w-32 px-3 py-2 border rounded-md' type='number' required min="0" />
                </div>
                <div>
                    <p className='mb-2 font-medium'>Discount (%)</p>
                    <input
                        name="discount"
                        onChange={onChangeHandler}
                        value={data.discount}
                        className='w-32 px-3 py-2 border rounded-md'
                        type='number'
                        placeholder='0'
                        min="0"
                        max="100"
                        required
                    />
                </div>
                <div>
                    <p className='mb-2 font-medium'>Net Value</p>
                    <input
                        value={netValue.toFixed(2)}
                        className='w-32 px-3 py-2 border rounded-md bg-gray-100'
                        type='text'
                        disabled
                    />
                </div>
            </div>
            <div className='w-full'>
                <p className='mb-2 font-medium'>Sizes</p>
                <div className='flex gap-3 flex-wrap'>
                    {(sizeOptions[data.category] || []).map(size => (
                        <div key={size} onClick={() => onSizeChange(size)} className={`border px-4 py-2 rounded-full cursor-pointer ${data.sizes.includes(size) ? 'bg-black text-white' : 'bg-gray-100'}`}>
                            {size}
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex items-center gap-3'>
                <input name="bestsellers" type="checkbox" onChange={onChangeHandler} checked={data.bestsellers} id="bestseller" />
                <label htmlFor="bestseller">Mark as Bestseller</label>
            </div>
            <button type="submit" className='w-32 py-3 mt-4 bg-green-600 text-white rounded-md'>SAVE CHANGES</button>
        </form>
    );
};

// --- List Component ---
const List = ({ url, token, currency }) => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/product/list`);
        if (response.data.success) setList(response.data.products);
        else toast.error("Error fetching product list.");
    };

    const removeProduct = async (productId) => {
        const response = await axios.post(`${url}/api/product/remove`, { id: productId }, { headers: { Authorization: `Bearer ${token}` } });
        if (response.data.success) {
            toast.success("Product removed!");
            fetchList();
        } else toast.error(response.data.message);
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div>
            <p className='mb-4 text-xl font-semibold'>All Products List</p>
            <div className='text-sm'>
                <div className='hidden md:grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr_1fr] items-center py-3 px-4 bg-gray-100 font-medium'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Discount</b>
                    <b>Net Value</b>
                    <b className='text-center'>Action</b>
                </div>
                {list.map(item => {
                    const netValue = item.netValue !== undefined 
                        ? item.netValue 
                        : (item.price - (item.price * (item.discount || 0) / 100));
                    return (
                        <div className='grid grid-cols-[1fr_3fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_1fr_1fr_1fr] items-center gap-4 py-3 px-4 border-b' key={item._id}>
                            <img className='w-16 h-16 object-cover rounded-md' src={item.image[0] || 'https://placehold.co/100x100/E0E0E0/9E9E9E?text=No+Image'} alt={item.name} />
                            <p>{item.name}</p>
                            <p className='hidden md:block'>{item.category}</p>
                            <p className='hidden md:block'>{currency}{item.price}</p>
                            <p className='hidden md:block'>{item.discount || 0}%</p>
                            <p className='hidden md:block'>{currency}{netValue.toFixed(2)}</p>
                            <div className="flex justify-center items-center gap-4">
                                <Link to={`/edit/${item._id}`}>
                                    <button className='flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
                                        <FaEdit className='w-4 h-4' /> Edit
                                    </button>
                                </Link>
                                <button
                                    onClick={() => removeProduct(item._id)}
                                    className='flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600'
                                >
                                    <FaTrash className='w-4 h-4' /> Delete
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// --- Orders Component ---
const Orders = ({ url, token, currency }) => {
    const [orders, setOrders] = useState([]);
    const fetchAllOrders = async () => {
        const response = await axios.get(`${url}/api/order/list`, { headers: { Authorization: `Bearer ${token}` } });
        if (response.data.success) setOrders(response.data.data);
        else toast.error("Error fetching orders");
    };
    const statusHandler = async (event, orderId) => {
        const response = await axios.post(`${url}/api/order/status`, { orderId, status: event.target.value }, { headers: { Authorization: `Bearer ${token}` } });
        if (response.data.success) {
            toast.success("Order status updated!");
            fetchAllOrders();
        }
    };
    useEffect(() => { fetchAllOrders(); }, []);
    return (
        <div>
            <p className='mb-4 text-xl font-semibold'>All Orders</p>
            <div className='flex flex-col gap-4'>
                {orders.map(order => (
                    <div key={order._id} className='grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr_1fr] items-start gap-4 p-4 border rounded-md text-sm'>
                        <img src={assets.parcel_icon} alt="Parcel" className="w-10" />
                        <div>
                            <p className='font-semibold'>
                                {order.items.map((item, index) => `${item.name} x ${item.quantity}${index === order.items.length - 1 ? '' : ', '}`)}
                            </p>
                            <p className='font-bold mt-2'>{order.address.firstName} {order.address.lastName}</p>
                            <div className='text-gray-600'>
                                <p>{order.address.street},</p>
                                <p>{order.address.city}, {order.address.district}</p>
                            </div>
                            <p className='text-gray-600'>{order.address.phone}</p>
                        </div>
                        <p className='text-left md:text-center'>{currency}{order.amount}</p>
                        <select onChange={(e) => statusHandler(e, order._id)} value={order.status} className='p-2 border rounded-md w-full md:w-auto'>
                            <option value="Food Processing">Order Processing</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Navbar and Sidebar ---
const Navbar = ({ logout }) => (
    <div className='flex items-center py-2 px-[4%] justify-between shadow-sm'>
        <img className='w-[max(10%,80px)]' src={assets.logo} alt="Logo" />
        <button onClick={logout} className='bg-red-500 text-white px-5 py-2 rounded-md text-sm'>Logout</button>
    </div>
);

const Sidebar = () => (
    <div className='w-[18%] min-h-screen border-r-2 bg-gray-50'>
        <div className='flex flex-col gap-2 pt-8 pl-[15%]'>
            <NavLink to="/add" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-l-full ${isActive ? 'bg-pink-100 border-r-4 border-pink-500' : ''}`}>
                <img className='w-6' src={assets.add_icon} alt="" />
                <p className="hidden md:block">Add Items</p>
            </NavLink>
            <NavLink to="/list" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-l-full ${isActive ? 'bg-pink-100 border-r-4 border-pink-500' : ''}`}>
                <img className='w-6' src={assets.order_icon} alt="" />
                <p className="hidden md:block">List Items</p>
            </NavLink>
            <NavLink to="/orders" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-l-full ${isActive ? 'bg-pink-100 border-r-4 border-pink-500' : ''}`}>
                <img className='w-6' src={assets.order_icon} alt="" />
                <p className="hidden md:block">Orders</p>
            </NavLink>
        </div>
    </div>
);

export default App;
