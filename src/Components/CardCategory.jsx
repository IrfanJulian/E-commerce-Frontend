import React from 'react'

const CardCategory = ({ image, background, onClick }) => {
  return (
    <div onClick={onClick} className={`w-full border-2 rounded-3xl cursor-pointer transition-all duration-300 hover:scale-110 ${background}`} id='Medium'>
        <img src={image} className='rounded-3xl' alt="" />
    </div>
  )
}

export default CardCategory