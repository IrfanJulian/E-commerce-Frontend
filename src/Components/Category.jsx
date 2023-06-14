import React from 'react'

const Category = ({ close, onClick1, onClick2, onClick3, onClick4, onClick5, onClick6, onClick7, onClick8, onClick9, cancel, search }) => {
  return (
        <div className="fixed top-0 left-0 wrapper">
          <div className="bg-black opacity-50 h-screen w-screen"></div>
          <div className='grid fixed top-0 left-0 w-screen h-screen'>
              <div className="card relative rounded-xl px-10 py-8 w-3/4 lg:w-1/2 h-3/4 overflow-auto bg-white m-auto">
                  <button onClick={close} className='absolute top-5 right-5 hover:text-red-500'>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                  </button>
                  <div className="wrapper pb-3 bg-white">
                      <p id='SemiBold' className='text-2xl mb-10'>Search by Category</p>
                      <div className="grid space-y-7">
                        <button onClick={onClick1} className='text-lg w-full text-left pb-2 border-b border-black' id='Medium'>Jacket</button>
                        <button onClick={onClick2} className='text-lg w-full text-left pb-2 border-b border-black' id='Medium'>Pants</button>
                        <button onClick={onClick3} className='text-lg w-full text-left pb-2 border-b border-black' id='Medium'>Shoes</button>
                        <button onClick={onClick4} className='text-lg w-full text-left pb-2 border-b border-black' id='Medium'>Short</button>
                        <button onClick={onClick5} className='text-lg w-full text-left pb-2 border-b border-black' id='Medium'>Shirt</button>
                        <button onClick={onClick6} className='text-lg w-full text-left pb-2 border-b border-black' id='Medium'>Hat</button>
                        <button onClick={onClick7} className='text-lg w-full text-left pb-2 border-b border-black' id='Medium'>Accessories</button>
                        <button onClick={onClick8} className='text-lg w-full text-left pb-2 border-b border-black' id='Medium'>Electronic</button>
                        <button onClick={onClick9} className='text-lg w-full text-left pb-2 border-b border-black' id='Medium'>Music</button>
                        {/* <div className="flex">
                          <button onClick={cancel} className='w-max py-1 text-white bg-red-500 rounded-full px-7 ml-auto' id='Light'>Cancel</button>
                          <button onClick={search} className='w-max py-1 text-white bg-red-500 rounded-full px-7 ml-5' id='Light'>Search</button>
                        </div> */}
                      </div>
                  </div>
              </div>
          </div>
        </div>
  )
}

export default Category