import React from 'react'

const AddAddress = ({ close, onSubmmit, rname, rphone, address, city, postal_code, vrname, vrphone, vaddress, vcity, vpostal_code, onChange  }) => {

  return (
    <div>
        {/* Mobile */}
        <div className="w-screen h-full absolute lg:hidden top-0 left-0 bg-white p-5">
            <button onClick={close} className='flex'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            <div className="wrapper my-10 bg-white">
                <p id='SemiBold' className='text-2xl mb-10'>Add New Address</p>
                <form onSubmit={onSubmmit}>
                    <div className="card p-4 my-3 bg-white rounded-xl border-2">
                        <p id='Light' className='text-xs text-gray-500'>Save address as (Home, Office, etc).</p>
                        <input type="text" id='Light' className='outline-none w-full' />
                    </div>
                    <div className="card p-4 my-3 bg-white rounded-xl border-2">
                        <p id='Light' className='text-xs text-gray-500'>Recipient's name</p>
                        <input name={rname} value={vrname} onChange={onChange} type="text" id='Light' className='outline-none w-full' />
                    </div>
                    <div className="card p-4 my-3 bg-white rounded-xl border-2">
                        <p id='Light' className='text-xs text-gray-500'>Recipient's phone</p>
                        <input name={rphone} value={vrphone} onChange={onChange} type="text" id='Light' className='outline-none w-full' />
                    </div>
                    <div className="card p-4 my-3 bg-white rounded-xl border-2">
                        <p id='Light' className='text-xs text-gray-500'>Address</p>
                        <input name={address}  value={vaddress} onChange={onChange} type="text" id='Light' className='outline-none w-full' />
                    </div>
                    <div className="card p-4 my-3 bg-white rounded-xl border-2">
                        <p id='Light' className='text-xs text-gray-500'>City</p>
                        <input name={city} value={vcity} onChange={onChange} type="text" id='Light' className='outline-none w-full' />
                    </div>
                    <div className="card p-4 my-3 bg-white rounded-xl border-2">
                        <p id='Light' className='text-xs text-gray-500'>Postal code</p>
                        <input  name={postal_code} value={vpostal_code} onChange={onChange} type="text" id='Light' className='outline-none w-full' />
                    </div>
                    <button id='Medium' className='mt-10 mb-20 py-2 w-full border-2 bg-white border-gray-400 text-gray-600 rounded-full'>Save Address</button>
                </form>
            </div>
        </div>

        {/* Dekstop */}
        <div className='hidden lg:block fixed top-0 left-0'>
            <div className="bg-black opacity-50 h-screen w-screen"></div>
            <div className='hidden lg:grid fixed top-0 left-0 w-screen h-screen'>
                <div className="card relative rounded-xl px-10 py-8 w-1/2 h-3/4 overflow-auto bg-white m-auto">
                    <button onClick={close} className='absolute top-5 right-5 hover:text-red-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="wrapper bg-white">
                        <div className="wrapper my-10 bg-white">
                            <p id='SemiBold' className='text-2xl mb-10'>Add New Address</p>
                            <form onSubmit={onSubmmit}>
                                <div className="card p-4 my-3 bg-white rounded-xl border-2">
                                    <p id='Light' className='text-xs text-gray-500'>Save address as (Home, Office, etc).</p>
                                    <input type="text" id='Light' className='outline-none w-full' />
                                </div>
                                <div className="card p-4 my-3 bg-white rounded-xl border-2">
                                    <p id='Light' className='text-xs text-gray-500'>Recipient's name</p>
                                    <input name={rname} value={vrname} onChange={onChange} type="text" id='Light' className='outline-none w-full' />
                                </div>
                                <div className="card p-4 my-3 bg-white rounded-xl border-2">
                                    <p id='Light' className='text-xs text-gray-500'>Recipient's phone</p>
                                    <input name={rphone} value={vrphone} onChange={onChange} type="text" id='Light' className='outline-none w-full' />
                                </div>
                                <div className="card p-4 my-3 bg-white rounded-xl border-2">
                                    <p id='Light' className='text-xs text-gray-500'>Address</p>
                                    <input name={address}  value={vaddress} onChange={onChange} type="text" id='Light' className='outline-none w-full' />
                                </div>
                                <div className="card p-4 my-3 bg-white rounded-xl border-2">
                                    <p id='Light' className='text-xs text-gray-500'>City</p>
                                    <input name={city} value={vcity} onChange={onChange} type="text" id='Light' className='outline-none w-full' />
                                </div>
                                <div className="card p-4 my-3 bg-white rounded-xl border-2">
                                    <p id='Light' className='text-xs text-gray-500'>Postal code</p>
                                    <input  name={postal_code} value={vpostal_code} onChange={onChange} type="text" id='Light' className='outline-none w-full' />
                                </div>
                                <button id='Medium' className='mt-10 mb-20 py-2 w-full border-2 bg-white border-gray-400 text-gray-600 rounded-full'>Save Address</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default AddAddress