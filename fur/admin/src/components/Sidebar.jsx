import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

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

export default Sidebar

