import React from 'react'

const CardProducts = ({ onClick, image, tittle, brand, price, stock, deleteProduct }) => {
  return (
    <div onClick={onClick} className='grid relative -z-10 border-2 rounded-xl shadow-lg transition-all duration-100 hover:scale-105 cursor-pointer'>
      <div className="flex space-x-3 absolute top-3 right-3">
      </div>
        <div className="h-1/2">
            <img src={image} className='h-28 lg:h-40 mx-auto' alt="" />
        </div>
        <div className="h-1/2 py-3 px-4">
            <p className='text-center text-sm lg:text-md' id='Medium'>{tittle}</p>
            <p className='text-center text-xs lg:text-md mt-3' id='Light'>{brand}</p>
            <p className='text-center text-red-500 text-xs lg:text-md' id='Medium'>Rp. {price}</p>
            <div className="flex mt-5">
              <p className='text-center text-xs lg:text-md ml-auto' id='Medium'>Stock :</p>
              <p className='text-center text-xs lg:text-md ml-2 mr-auto' id='Medium'>{stock}</p>
            </div>
        </div>
    </div>
  )
}

export default CardProducts