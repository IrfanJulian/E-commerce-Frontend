import React from 'react'

const AddProduct = ({ close, onSubmit, onChange, onChangePhoto, name, vname, brand, vbrand, price, vprice, condition, vcondition, stock, vstock, description, vdescription, category, vcategory, photo }) => {
  return (
    <div>
        {/* Mobile */}
        <div className='fixed overflow-auto top-0 left-0 h-full w-screen block lg:hidden bg-white p-5' id='Light'>
            <button onClick={close}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            <div className="wrapper my-10 pb-10 bg-white">
                <p id='SemiBold' className='text-2xl mb-10'>Add new product</p>
                <form onSubmit={onSubmit}>
                    <div className="card p-4 my-3 bg-white rounded-xl border-2">
                        <p id='Light' className='text-xs text-gray-500'>Product name</p>
                        <input name={name} value={vname} onChange={onChange} type="text" id='Light' className='outline-none w-full' />
                    </div>
                    <div className="card p-4 my-3 bg-white rounded-xl border-2">
                        <p id='Light' className='text-xs text-gray-500'>Brand</p>
                        <input name={brand} value={vbrand} onChange={onChange} type="text" id='Light' className='outline-none w-full' />
                    </div>
                    <div className="card p-4 my-3 bg-white rounded-xl border-2">
                        <p id='Light' className='text-xs text-gray-500'>Choose Category</p>
                        <select name={category} value={vcategory} onChange={onChange} id="" className='outline-none w-full'>
                                <option value="">Choose Category</option>
                                <option value="Jacket">Jacket</option>
                                <option value="Pants">Pants</option>
                                <option value="Shoes">Shoes</option>
                                <option value="Short">Short</option>
                                <option value="Shirt">Shirt</option>
                                <option value="Hat">Hat</option>
                                <option value="Accesories">Accesories</option>
                                <option value="Electronic">Electronic</option>
                                <option value="Music">Music</option>
                        </select>
                    </div>
                    <div className="card p-4 my-3 bg-white rounded-xl border-2">
                        <p id='Light' className='text-xs text-gray-500'>Price</p>
                        <input name={price} value={vprice} onChange={onChange} type="number" id='Light' className='outline-none w-full' />
                    </div>
                    <div className="card p-4 my-3 bg-white rounded-xl border-2">
                        <p id='Light' className='text-xs text-gray-500'>Condition</p>
                        <select name={condition} value={vcondition} onChange={onChange} id="" className='outline-none w-full'>
                            <option value="">Choose Condition</option>
                            <option value="New">New</option>
                            <option value="Second">Second</option>
                        </select>
                    </div>
                    <div className="card p-4 my-3 bg-white rounded-xl border-2">
                        <p id='Light' className='text-xs text-gray-500'>Stock</p>
                        <input name={stock} value={vstock} onChange={onChange} type="text" id='Light' className='outline-none w-full' />
                    </div>
                    <div className="card p-4 my-3 bg-white rounded-xl border-2">
                        <p id='Light' className='text-xs text-gray-500'>Description</p>
                        <textarea name={description} value={vdescription} onChange={onChange} className='outline-none w-full' cols="30" rows="2" />
                    </div>
                    <div className="card p-4 my-3 bg-white rounded-xl border-2" id='Light'>
                        <p id='Light' className='text-xs text-gray-500'>Click to Choose Photo</p>
                        <label htmlFor="img">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32 mx-auto text-gray-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        </label>
                        <input name={photo} onChange={onChangePhoto} type="file" id='img' className='outline-none w-full' hidden />
                    </div>
                    <button type='submit' className='mt-5 py-2 w-full rounded-full bg-red-500 text-white text-lg' id='Medium'>Add Product</button>
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
                    <div className="wrapper pb-10 bg-white">
                        <p id='SemiBold' className='text-2xl mb-10'>Add new product</p>
                        <form onSubmit={onSubmit} className='grid'>
                            <div className="card p-4 my-3 bg-white rounded-xl border-2">
                                <p id='Light' className='text-xs text-gray-500'>Product name</p>
                                <input name={name} value={vname} onChange={onChange} type="text" id='Light' className='outline-none w-full' />
                            </div>
                            <div className="card p-4 my-3 bg-white rounded-xl border-2">
                                <p id='Light' className='text-xs text-gray-500'>Brand</p>
                                <input name={brand} value={vbrand} onChange={onChange} type="text" id='Light' className='outline-none w-full' />
                            </div>
                            <div className="card p-4 my-3 bg-white rounded-xl border-2">
                                <p id='Light' className='text-xs text-gray-500'>Choose Category</p>
                                <select name={category} value={vcategory} onChange={onChange} id="" className='outline-none w-full'>
                                    <option value="">Choose Category</option>
                                    <option value="Jacket">Jacket</option>
                                    <option value="Pants">Pants</option>
                                    <option value="Shoes">Shoes</option>
                                    <option value="Short">Short</option>
                                    <option value="Shirt">Shirt</option>
                                    <option value="Hat">Hat</option>
                                    <option value="Accesories">Accesories</option>
                                    <option value="Electronic">Electronic</option>
                                    <option value="Music">Music</option>
                                </select>
                            </div>
                            <div className="card p-4 my-3 bg-white rounded-xl border-2">
                                <p id='Light' className='text-xs text-gray-500'>Price</p>
                                <input name={price} value={vprice} onChange={onChange} type="number" id='Light' className='outline-none w-full' />
                            </div>
                            <div className="card p-4 my-3 bg-white rounded-xl border-2">
                                <p id='Light' className='text-xs text-gray-500'>Condition</p>
                                <select name={condition} value={vcondition} onChange={onChange} id="" className='outline-none w-full'>
                                    <option value="">Choose Condition</option>
                                    <option value="New">New</option>
                                    <option value="Second">Second</option>
                                </select>
                            </div>
                            <div className="card p-4 my-3 bg-white rounded-xl border-2">
                                <p id='Light' className='text-xs text-gray-500'>Stock</p>
                                <input name={stock} value={vstock} onChange={onChange} type="text" id='Light' className='outline-none w-full' />
                            </div>
                            <div className="card p-4 my-3 bg-white rounded-xl border-2">
                                <p id='Light' className='text-xs text-gray-500'>Description</p>
                                <textarea name={description} value={vdescription} onChange={onChange} className='outline-none w-full' cols="30" rows="2" />
                            </div>
                            <div className="card p-4 my-3 bg-white rounded-xl border-2" id='Light'>
                                <p id='Light' className='text-xs text-gray-500'>Click to Choose Photo</p>
                                <label htmlFor="img">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32 mx-auto text-gray-300">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                </label>
                                <input name={photo} onChange={onChangePhoto} type="file" id='img' className='outline-none w-full' hidden />
                            </div>
                            <button type='submit' className='mt-5 py-2 w-1/2 rounded-full bg-red-500 text-white text-lg mx-auto' id='Medium'>Add Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default AddProduct