import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../../Components/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';

const Register = () => {

    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showPass2, setShowPass2] = useState(false);
    const [password, setPassword] = useState("");
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        store_name: ""
    });

    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        })
      };

    const handleSubmit = async(e) => {
        setLoading(true);
        e.preventDefault();
        try {
            if(role && role.length > 0) {
            Swal.fire({
                title: 'Are you sure your email is active?',
                text: "OTP will send to your email",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, send OTP'
              }).then(async(result) => {
                if (result.isConfirmed) {
                    await axios({
                        method: "POST",
                        url: `${process.env.REACT_APP_URL}/user/register`,
                        data: {
                            name: form.name,
                            email: form.email,
                            phone: form.phone,
                            password: form.password,
                            store_name: form.store_name ? form.store_name : "",
                            role: role
                        }
                    })
                    setLoading(false);
                    navigate(`/auth-verification-otp/${form.email}`);
                  Swal.fire(
                    'Success!',
                    'OTP has been send, please check your email to get OTP.',
                    'success'
                  )
                }
              })
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    text: 'Choose your role!'
                  })
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
              })
        }
    }

  return (
    <div className='grid h-screen'>
        {/* Dekstop */}
        <div className="md:w-11/12 lg:w-10/12 xl:w-6/12 hidden md:grid m-auto py-10">
            <img src={'https://res.cloudinary.com/ddpo9zxts/image/upload/v1681319165/Assets%20Blanja/Group_1158_zurdcn.png'} className='mx-auto' alt="" />
            <div className="wrapper w-1/2 mx-auto my-9 flex">
                <button onClick={()=>setRole("customer")} className={`border-2 text-lg p-2 w-full rounded-tl-xl rounded-bl-xl hover:opacity-80 ${role === 'customer' ? "bg-red-500 text-white" : "bg-none"}`} id='Light'>Customer</button>
                <button onClick={()=>setRole("seller")} className={`border-2 text-lg p-2 w-full rounded-tr-xl rounded-br-xl hover:opacity-80 ${role === 'seller' ? "bg-red-500 text-white" : "bg-none"}`} id='Light'>Seller</button>
            </div>
            <p className='text-lg text-center' id='Medium'>Sign up here</p>        
            <form onSubmit={handleSubmit} className='my-5 w-1/2 mx-auto space-y-5' id='Light'>
                <input name='name' value={form.name} onChange={handleChange} type="text" placeholder='Insert your fullname' className='border-2 rounded-md w-full p-2 outline-none' />
                <input name='email' value={form.email} onChange={handleChange} type="email" placeholder='Insert your email' className='border-2 rounded-md w-full p-2 outline-none' />
                <input name='phone' value={form.phone} onChange={handleChange} type="text" placeholder='Insert your phone number' className='border-2 rounded-md w-full p-2 outline-none' />
                <input name='store_name' value={form.store_name} onChange={handleChange} type="text" placeholder='Insert your store name' className={`border-2 rounded-md w-full p-2 outline-none ${role === 'customer' ? 'hidden' : 'block'}`} />
                <div className="flex mb-5" id='Light'>
                    <input name='password' value={form.password} onChange={handleChange} type={showPass === false ? "password" : "text"} className='w-10/12 border-l-2 border-t-2 border-b-2 rounded-tl-md rounded-bl-md py-2 pl-4 outline-none' placeholder='Insert your password' />
                    <button type='button' onClick={()=>showPass === false ? setShowPass(true) : setShowPass(false)} className='align-center border-r-2 border-t-2 border-b-2 px-4 rounded-tr-md rounded-br-md'>{ showPass === false ? "Show" : "Hide" }</button>
                </div>
                <p id='Light' className={`text-sm text-red-500 mb-1 ${password.length >= 1 && form.password.length >= 1 && password !== form.password ? "block" : "hidden"}`}>Password doen't match!!</p>
                <div className="flex" id='Light'>
                    <input name='password2' onChange={(e)=>setPassword(e.target.value)} type={showPass2 === false ? "password" : "text"} className='w-10/12 border-l-2 border-t-2 border-b-2 rounded-tl-md rounded-bl-md py-2 pl-4 outline-none' placeholder='Confirmation your password' />
                    <button type='button' onClick={()=>showPass2 === false ? setShowPass2(true) : setShowPass2(false)} className='align-center border-r-2 border-t-2 border-b-2 px-4 rounded-tr-md rounded-br-md'>{ showPass2 === false ? "Show" : "Hide" }</button>
                </div>
                <button type='submit' className='w-full mx-auto bg-red-500 text-white rounded-full py-2 font-bold hover:opacity-80'>Register</button>
            </form>
            <p className='text-center text-lg mt-10' id='Light'>Already have an account? <span onClick={()=>navigate('/auth-login')} className='font-semibold text-red-500 cursor-pointer hover:opacity-60'>Login here!</span></p>
        </div>

        {/* Mobile */}
        <div className="w-full md:hidden py-5 px-5">
            <button onClick={()=>navigate('/')} className='flex'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <p id='Medium' className='text-2xl text-left my-auto ml-6'>Register</p>
            </button>
            <div className="wrapper py-10">
                <div className="option grid mb-5" id='Light'>
                    <select name="role" value={role} onChange={(e)=>setRole(e.target.value)} className='text-lg outline-none font-semibold mx-auto text-center focus:ring-red-500 focus:bg-white focus:text-black' id="">
                        <option value="">Choose your Role</option>
                        <option value="customer">Customer</option>
                        <option value="seller">Seller</option>
                    </select>
                </div>       
                <form onSubmit={handleSubmit}>
                    { role && role.length > 0 ?
                    <div className="wrap" id='Light'>
                        <p className='font-semibold'>Fullname</p>
                        <input name='name' value={form.name} onChange={handleChange} type="text" className='border-2 rounded-md py-2 px-4 w-full mb-5' placeholder='Insert your name' />
                        <p className='font-semibold'>E-mail</p>
                        <input name='email' value={form.email} onChange={handleChange} type="email" className='border-2 rounded-md py-2 px-4 w-full mb-5' placeholder='Insert your email' />
                        <p className='font-semibold'>Phone Number</p>
                        <input name='phone' value={form.phone} onChange={handleChange} type="text" className='border-2 rounded-md py-2 px-4 w-full mb-5' placeholder='Insert your phone number' />
                        <p className={`${role === "customer" ? "hidden" : "block"} font-semibold`}>Store Name</p>
                        <input name='store_name' value={form.store_name} onChange={handleChange} type="text" className={`${role === "customer" ? "hidden" : "block"} border-2 rounded-md py-2 px-4 w-full mb-5`} placeholder='Insert your phone number' />
                        <p className='font-semibold'>Password</p>
                        <div className="flex mb-5" id='Light'>
                            <input name='password' value={form.password} onChange={handleChange} type={showPass === false ? "password" : "text"} className='w-10/12 border-l-2 border-t-2 border-b-2 rounded-tl-md rounded-bl-md py-2 pl-4 outline-none' placeholder='Insert your password' />
                            <button type='button' onClick={()=>showPass === false ? setShowPass(true) : setShowPass(false)} className='align-center border-r-2 border-t-2 border-b-2 px-4 rounded-tr-md rounded-br-md'>{ showPass === false ? "Show" : "Hide" }</button>
                        </div>
                        <p className='font-semibold'>Confirmation Password</p>
                        <p id='Light' className={`text-sm text-red-500 mb-1 ${password.length >= 1 && form.password.length >= 1 && password !== form.password ? "block" : "hidden"}`}>Password doen't match!!</p>
                        <div className="flex" id='Light'>
                            <input name='password2' onChange={(e)=>setPassword(e.target.value)} type={showPass2 === false ? "password" : "text"} className='w-10/12 border-l-2 border-t-2 border-b-2 rounded-tl-md rounded-bl-md py-2 pl-4 outline-none' placeholder='Insert your password' />
                            <button type='button' onClick={()=>showPass2 === false ? setShowPass2(true) : setShowPass2(false)} className='align-center border-r-2 border-t-2 border-b-2 px-4 rounded-tr-md rounded-br-md'>{ showPass2 === false ? "Show" : "Hide" }</button>
                        </div>
                        <button type='submit' className='w-full mx-auto bg-red-500 text-white rounded-md py-2 mt-10 font-bold hover:opacity-80' disabled={ form.name.length >= 1 && form.email.length >= 1 && form.phone.length >= 1 && form.password.length >= 1 && password.length >= 1 ? false : true }>Register</button>
                        <p className='text-center mt-10' id='Light'>Already have an account? <span onClick={()=>navigate('/auth-login')} className='font-semibold text-red-500 cursor-pointer hover:opacity-60'>Login here!</span></p>
                    </div>
                    :
                    null }
                </form>
            </div>
        </div>
        { loading === true ? <Loading /> : null }
    </div>
  )
}

export default Register