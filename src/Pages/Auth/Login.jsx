import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../../Components/Loading';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {

    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

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
            const res = await axios({
                method: "POST",
                url: `${process.env.REACT_APP_URL}/user/login`,
                data: {
                    email: form.email,
                    password: form.password
                }
            });
            localStorage.setItem('token', res.data.data.token)
            localStorage.setItem('email', res.data.data.email)
            localStorage.setItem('id', res.data.data.id)
            localStorage.setItem('name', res.data.data.name)
            localStorage.setItem('role', res.data.data.role)
            setLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your account has been verified'
              })
            navigate('/');
        } catch (error) {
            setLoading(false);
            if(error.response.data.message === "Your account not actived"){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Your account not actived!'
                  })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Wrong email or password!'
                  })
            }
        }
    }

  return (
    <div className='grid h-screen'>
        {/* Dekstop */}
        <div className="md:w-11/12 lg:w-10/12 xl:w-6/12 hidden md:grid m-auto py-10">
            <img src={'https://res.cloudinary.com/ddpo9zxts/image/upload/v1681319165/Assets%20Blanja/Group_1158_zurdcn.png'} className='mx-auto' alt="" />
            <div className="wrapper w-1/2 mx-auto my-9 flex">
                <button className='border-2 text-lg p-2 w-full rounded-tl-xl rounded-bl-xl focus:text-white focus:bg-red-500 hover:opacity-80' id='Light'>Customer</button>
                <button className='border-2 text-lg p-2 w-full rounded-tr-xl rounded-br-xl focus:text-white focus:bg-red-500 hover:opacity-80' id='Light'>Seller</button>
            </div>
            <p className='text-lg text-center' id='Medium'>Login with you're account</p>
            <form onSubmit={handleSubmit}>
                <div id='Light' className='my-5 w-1/2 mx-auto space-y-5'>
                    <input name='email' value={form.email} onChange={handleChange} type="email" placeholder='Insert your email' className='border-2 rounded-md w-full p-2 outline-none' />
                    <div className="flex mb-5">
                        <input name='password' type={showPass === false ? "password" : "text"} value={form.password} onChange={handleChange} className='w-10/12 border-l-2 border-t-2 border-b-2 rounded-tl-md rounded-bl-md py-2 pl-4 outline-none' placeholder='Insert your password' />
                        <button type='button' onClick={()=>showPass === false ? setShowPass(true) : setShowPass(false)} className='align-center border-r-2 border-t-2 border-b-2 px-4 rounded-tr-md rounded-br-md'>{ showPass === false ? "Show" : "Hide" }</button>
                    </div>
                    {/* <p className='text-end'>Forgot password? <span className='font-semibold text-red-500 cursor-pointer hover:opacity-60'>Click here!</span></p> */}
                    <button className='w-full mx-auto bg-red-500 text-white rounded-full py-2 font-bold hover:opacity-80'>Login</button>
                </div>
            </form>
            <p className='text-center text-lg mt-10' id='Light'>Don't have an account? <span onClick={()=>navigate('/auth-register')} className='font-semibold text-red-500 cursor-pointer hover:opacity-60'>Sign up here!</span></p>
        </div>

        {/* Mobile */}
        <div className="w-full py-5 px-5 md:hidden">
            <button onClick={()=>navigate('/')} className='flex'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <p id='Medium' className='text-2xl text-left my-auto ml-6'>Login</p>
            </button>
            <div className="wrapper py-10 mt-10">
                <form onSubmit={handleSubmit}>
                    <div id='Light'>
                        <p className='font-semibold'>E-mail</p>
                        <input name='email' value={form.email} onChange={handleChange} type="email" className='outline-none border-2 rounded-md py-2 px-4 w-full mb-5' placeholder='Insert your email' />
                        <p className='font-semibold'>Password</p>
                        <div className="flex mb-5">
                            <input name='password' type={showPass === false ? "password" : "text"} value={form.password} onChange={handleChange} className='w-10/12 border-l-2 border-t-2 border-b-2 rounded-tl-md rounded-bl-md py-2 pl-4 outline-none' placeholder='Insert your password' />
                            <button type='button' onClick={()=>showPass === false ? setShowPass(true) : setShowPass(false)} className='align-center border-r-2 border-t-2 border-b-2 px-4 rounded-tr-md rounded-br-md'>{ showPass === false ? "Show" : "Hide" }</button>
                        </div>
                        {/* <p className='text-end text-sm'>Forgot password? <span className='font-semibold text-red-500 cursor-pointer hover:opacity-60'>Click here!</span></p> */}
                        <button type='submit' className='w-full mx-auto bg-red-500 text-white rounded-md py-2 mt-10 font-bold hover:opacity-80'>Login</button>
                        <p className='text-center mt-10' id='Light'>Don't have an account? <span onClick={()=>navigate('/auth-register')} className='font-semibold text-red-500 cursor-pointer hover:opacity-60'>Sign up here!</span></p>
                    </div>
                </form>
            </div>
        </div>
        { loading === true ? <Loading /> : null }
    </div>
  )
}

export default Login