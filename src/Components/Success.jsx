import React from 'react'
import { useNavigate } from 'react-router-dom'

const Success = () => {

    const navigate = useNavigate();

  return (
    <div className='fixed top-0 left-0 w-screen pb-16 grid h-screen bg-white'>
        <div className="w-3/4 h-max mt-auto mx-auto">
            <img src={"https://res.cloudinary.com/ddpo9zxts/image/upload/v1682528338/success_gmv3ln.png"} className='mx-auto' alt="" />
            <p className='text-2xl mt-3 text-center' id='SemiBold'>Success!</p>
            <p className='mt-5 text-center' id='Light'>Your payment is success, your order will proccess soon. Thank's for using Blanja app.</p>
        </div>
        <button onClick={()=>navigate('/')} className='bg-red-500 text-white py-2 w-11/12 lg:w-1/4 h-max mt-auto mb-7 lg:mb-20 mx-auto rounded-full text-xl lg:hover:opacity-70' id='Medium'>Continue shopping</button>
    </div>
  )
}

export default Success