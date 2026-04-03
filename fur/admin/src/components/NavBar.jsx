import React from 'react'
import {assets} from '../assets/assets'

const Navbar = ({ logout }) => (
    <div className='flex items-center py-2 px-[4%] justify-between shadow-sm'>
        <img className='w-[max(10%,80px)]' src={assets.logo} alt="Logo" />
        <button onClick={logout} className='bg-red-500 text-white px-5 py-2 rounded-md text-sm'>Logout</button>
    </div>
);

export default Navbar
