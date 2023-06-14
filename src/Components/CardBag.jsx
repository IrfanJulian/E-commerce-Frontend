import React from 'react'

const CardBag = ({ key, onClick, onClickCheckout, photo, tittle, brand, price, qty }) => {
  return (
    <div key={key} className="card mb-5 relative grid border rounded-lg shadow-lg overflow-hidden">
        <button onClick={onClick} className='text-red-500 w-max h-max absolute top-3 right-3'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
        </button>
        <div className="flex">
        <div className="w-4/12">
            <img src={photo} className='h-28' alt="" />
        </div>
        <div className="w-8/12 p-2">
            <p className='' id='Medium'>{tittle}</p>
            <p className='text-sm text-gray-400' id='Light'>{brand}</p>
            <div className="wrapper flex mt-4">
            <div className="qty flex my-auto space-x-3" id='Light'>
                <button className='p-1 rounded-full bg-gray-300 hover:bg-gray-400 text-white'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                </svg>
                </button>
                <p className='text-sm my-auto'>{qty}</p>
                <button className='p-1 rounded-full hover:text-gray-700 hover:border-gray-400 text-gray-500 border border-gray-300'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                </button>
            </div>
            <p className='text-sm ml-auto' id='Medium'>Rp. {price}</p>
            </div>
        </div>
        </div>
        <button onClick={onClickCheckout} className='w-max mx-auto text-red-500 my-3 flex'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
        <p className='ml-2 my-auto'>Checkout now</p>
        </button>
    </div>
  )
}

export default CardBag