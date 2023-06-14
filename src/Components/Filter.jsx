import React from 'react'

const Filter = ({ onClick1, onClick2, onClick3 }) => {
  return (
    <div className='hidden lg:block fixed top-0 left-0'>
        <div className="bg-black opacity-50 h-screen w-screen"></div>
        <div className='hidden lg:grid fixed top-0 left-0 w-screen h-screen'>
            <div className="card relative rounded-xl p-5 w-1/4 bg-white h-max m-auto">
                <button onClick={onClick1} className='absolute top-3 right-5 hover:text-red-500 transition-all duration-200 hover:rotate-180'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <p id='SemiBold' className='text-3xl text-center'>Filter</p>
                <hr className='my-10 border-t-2' />
                <p id='SemiBold' className='text-xl'>Price</p>
                <div className="my-5 space-y-2">
                    <div className="flex">
                        <input type="checkbox" className='accent-red-500 w-4 h-4 cursor-pointer my-auto mr-6' name='lowerPrice' id='lowerPrice' />
                        <p className='my-auto' id='Medium'>Lower Price</p>
                    </div>
                    <div className="flex">
                        <input type="checkbox" className='accent-red-500 w-4 h-4 cursor-pointer my-auto mr-6' name='lowerPrice' id='lowerPrice' />
                        <p className='my-auto' id='Medium'>Higher Price</p>
                    </div>
                </div>
                <p id='SemiBold' className='text-xl mt-10'>Categories</p>
                <div className="my-5 space-y-2">
                    <div className="flex">
                        <input type="checkbox" className='accent-red-500 w-4 h-4 cursor-pointer my-auto mr-6' name='lowerPrice' id='lowerPrice' />
                        <p className='my-auto' id='Medium'>A ⇋ Z</p>
                    </div>
                    <div className="flex">
                        <input type="checkbox" className='accent-red-500 w-4 h-4 cursor-pointer my-auto mr-6' name='lowerPrice' id='lowerPrice' />
                        <p className='my-auto' id='Medium'>Z ⇋ A</p>
                    </div>
                </div>
                <div className="flex space-x-5 mt-10">
                    <button onClick={onClick2} className='rounded-full py-2 bg-red-500 text-white w-1/2 hover:opacity-70' id='Medium'>Cancel</button>
                    <button onClick={onClick3} className='rounded-full py-2 border border-red-500 text-red-500 w-1/2 hover:bg-red-50' id='Medium'>Filter</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Filter