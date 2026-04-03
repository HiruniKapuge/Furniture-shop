// import axios from 'axios'
// import React, { useState } from 'react'
// import { backendUrl } from '../App'
// import { toast } from 'react-toastify';


// const Login = ({ setToken }) => {

//     const[email,setEmail]=useState('')
//     const[password,setpassword]= useState('')

//     const onSubmitHandler=async(e)=>{
//         try{
//             e.preventDefault();
//             const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
//             if(response.data.success){
//                 setToken(response.data.token); // Assuming the token is returned in the response


//             }
//             else{
//                 toast.error(response.data.message)
//             }
//         }catch(error){
//             console.error(error.response?.data?.message || error.message);
//             toast.error(error.response?.data?.message || error.message);


            
//         }
//     }


//   return (
//     <div className='min-h-screen flex items-center justify-center w-full'>
//       <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
//         <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
//         <form onSubmit={onSubmitHandler}>
//             <div className='mb-3 min-w-72'>
//                 <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
//                 <input onChange={(e)=>setEmail(e.target.value)} autoComplete='off' value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@gmail.com' required/>

//             </div>
//             <div>
//                 <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
//                 <input onChange={(e)=>setpassword(e.target.value)} autoComplete='off' value={password} className='rounded-md w-full px-3 py-2 border border-gray-300' type="password" placeholder='Enter your Password' required/>

//             </div>
//             <button className='mt-2 w-full py-2 px-4 rounded-3d text-white bg-black' type="Submit">Login</button>
//         </form>

//         </div>

//     </div>
//   )
// }

// export default Login

const Login = ({ setToken, url }) => {
    const [data, setData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

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
                navigate("/add");
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

