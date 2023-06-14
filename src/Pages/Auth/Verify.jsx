import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../Components/Loading';
import Swal from 'sweetalert2';

const Verify = () => {

    const navigate = useNavigate();
    const {email} = useParams();
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState("");

    const handleSubmit = async(e) => {
        setLoading(true);
        e.preventDefault();
        try {
            await axios({
                method: "PUT",
                url: `${process.env.REACT_APP_URL}/user/verification/${email}`,
                data: {
                    otp: otp
                }
            })
            setLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your account has been verified'
              })
            navigate('/auth-login');
        } catch (error) {
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Wrong OTP!'
              })
        }
    }

  return (
    <div className='grid h-screen'>
        {/* Mobile */}
        <div className="w-full py-5 px-5 md:hidden">
            <button onClick={()=>navigate('/auth-register')} className='flex'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                <p id='Medium' className='text-2xl text-left my-auto ml-6'>Verification</p>
            </button>
            <div className="wrapper py-10 mt-10">
                <form onSubmit={handleSubmit} id='Light'>
                    <p className='font-semibold'>OTP</p>
                    <input type="text" name='otp' value={otp} onChange={(e)=>setOtp(e.target.value)} maxLength={6} className='border-b-2 outline-none rounded-md py-2 px-4 w-full mb-5 text-center' placeholder='Insert your email' />
                    <button type='submit' className='w-full mx-auto bg-red-500 text-white rounded-md py-2 mt-5 font-bold hover:opacity-80'>Verification</button>
                    <p className='text-center mt-10' id='Light'>Already have an account? <span onClick={()=>navigate('/auth-login')} className='font-semibold text-red-500 cursor-pointer hover:opacity-60'>Login here!</span></p>
                </form>
            </div>
        </div>

        {/* Dekstop */}
        <div className="md:w-11/12 lg:w-10/12 xl:w-6/12 hidden md:grid m-auto py-10">
            <img src={'https://res.cloudinary.com/ddpo9zxts/image/upload/v1681319165/Assets%20Blanja/Group_1158_zurdcn.png'} className='mx-auto' alt="" />
            <p className='text-lg text-center' id='Medium'>Verification your account</p>
            <form onSubmit={handleSubmit}>
                <div id='Light' className='my-5 w-1/2 mx-auto space-y-5'>
                    <input name='otp' value={otp} onChange={(e)=>setOtp(e.target.value)} maxLength={6} className='border-2 rounded-md w-full p-2 outline-none text-center' />
                <button className='w-full mx-auto bg-red-500 text-white rounded-full py-2 font-bold hover:opacity-80'>Verification</button>
                </div>
                <p className='text-center mt-10' id='Light'>Already have an account? <span onClick={()=>navigate('/auth-login')} className='font-semibold text-red-500 cursor-pointer hover:opacity-60'>Login here!</span></p>
            </form>
        </div>

        { loading === true ? <Loading /> : null }
    </div>
  )
}

export default Verify