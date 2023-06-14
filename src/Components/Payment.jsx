import React from 'react'
import mastercards from '../Assets/Image/mastercard.png'
import pos from '../Assets/Image/pos.png'
import gopay from '../Assets/Image/gopay.png'

const Payment = ({ onClick1, onChangePayment1, onChangePayment2, onChangePayment3, checked1, checked2, checked3, order, delievery, total, onClickPay }) => {
  return (
    <div className='fixed top-0 left-0 h-screen w-screen'>
        <div className="bg-black opacity-50 w-screen h-screen"></div>
        <div className="absolute top-0 left-0 h-screen w-screen grid">
            <div className="card px-8 bg-white p-3 w-3/4 lg:w-1/4 m-auto grid rounded-lg relative">
                <button onClick={onClick1} className='absolute top-3 right-5 hover:text-red-500 transition-all duration-200 hover:rotate-180'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <p id='SemiBold' className='text-3xl text-center'>Payment</p>
                <hr className='my-10 border-t-2' />
                <p id='SemiBold' className='text-xl mb-5'>Payment method</p>
                <div className="flex mb-3">
                    <div className="wrapper p-1 mr-10 h-10 grid">
                        <img src={mastercards} className='w-12 my-auto' alt="" />
                    </div>
                    <p className='my-auto' id='Medium'>Mastercard</p>
                    <input type="checkbox" onChange={onChangePayment1} checked={checked1} name='choosePayment' className='accent-red-500 w-4 h-4 cursor-pointer my-auto ml-auto' />
                </div>
                <div className="flex mb-3">
                    <div className="wrapper p-1 mr-10 h-10 grid">
                        <img src={pos} className='w-12 my-auto' alt="" />
                    </div>
                    <p className='my-auto' id='Medium'>Pos Indonesia</p>
                    <input type="checkbox" onChange={onChangePayment2} checked={checked2} className='accent-red-500 w-4 h-4 cursor-pointer my-auto ml-auto' />
                </div>
                <div className="flex mb-3">
                    <div className="wrapper p-1 mr-10 h-10 grid">
                        <img src={gopay} className='w-12 my-auto' alt="" />
                    </div>
                    <p className='my-auto' id='Medium'>Gopay</p>
                    <input type="checkbox" onChange={onChangePayment3} checked={checked3} className='accent-red-500 w-4 h-4 cursor-pointer my-auto ml-auto' />
                </div>
                <hr className='my-10 border-t-2' />
                <p id='SemiBold' className='text-xl mb-5'>Shoping summary</p>
                <div className="flex mb-5">
                    <p className='' id='Medium'>Order</p>
                    <p className='my-auto ml-auto' id='SemiBold'>Rp. {order}</p>
                </div>
                <div className="flex mb-5">
                    <p className='' id='Medium'>Delivery</p>
                    <p className='my-auto ml-auto' id='SemiBold'>Rp. {delievery}</p>
                </div>
                <hr className='mt-10 border-t-2' />
                <div className="my-5">
                    <div className="flex w-full">
                        <p className='text-lg' id='Medium'>Total amount</p>
                        <p className='my-auto ml-auto' id='SemiBold'>Rp. {total}</p>
                    </div>
                    <button onClick={onClickPay} id='SemiBold' className='rounded-full py-2 text-white bg-red-500 w-full mt-10'>Pay now</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment