import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import CardProducts from '../../Components/CardProducts';
import axios from 'axios';
import Loading from '../../Components/Loading';
import Swal from 'sweetalert2';

const Detail = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token')
    const {id:idProduct} = useParams();
    const idUser = localStorage.getItem('id');
    const [confirm, setConfirm] = useState(false);
    const [add, setAdd] = useState("");
    const [loading, setLoading] = useState(false);
    const [qty, setQty] = useState(1);
    const [data, setData] = useState();
    const [dataProduct, setDataProduct] = useState();

    useEffect(()=>{
        setLoading(true);
        const getData = async() => {
            try {
                const res = await axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_URL}/product`
                })
                setDataProduct(res.data.data);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        getData();
    }, [idProduct])

    useEffect(()=>{
        setLoading(true);
        const getData = async() => {
            try {
                const res = await axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_URL}/product/${idProduct}`
                })
                setData(res.data.data[0]);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        getData();
    }, [idProduct])

    const addBag = async(e) => {
        setLoading(true);
        e.preventDefault();
        if (token) {      
            try {
                await axios({
                    method: "POST",
                    url: `${process.env.REACT_APP_URL}/bag/add-bag`,
                    data: {
                        id_customer: idUser,
                        id_seller: data.id_seller,
                        id_product: idProduct,
                        quantity: qty
                    }
                })
                setLoading(false);
                setConfirm(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'The item has been add to your bag!'
                    })
            } catch (error) {
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                  })
            }
        } else {
            setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Login for add this item to cart'
                  })
        }
    }

  return (
    <div>
        <Navbar />
        {/* Mobile */}
        <div className="md:hidden grid pt-5 pb-20 px-5">
            <button onClick={()=>navigate('/')} className='flex absolute top-5 left-5'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            <div className="wrap border-b-4 border-black w-max mx-auto mb-2 pb-2">
                <p id='Medium' className='text-2xl'>Detail Item</p>
            </div>
            <img src={ data ? data.photo : null } className='h-100 mx-auto' alt="" />
            <div className="wrapper my-5">
                <p id='Medium' className='text-xl text-center'>{ data ? data.name : null }</p>
                <p id='Medium' className='text-md text-center text-gray-400'>{ data ? data.brand : null }</p>
                <div className="description mt-5">
                    <p id='Medium' className='text-xl text-left mb-2'>Description</p>
                    <p id='Light'>{ data ? data.description : null }</p>
                </div>
                <div className="description mt-5">
                    <p id='Medium' className='text-xl text-left mb-2'>Price</p>
                    <p id='Light'>Rp. { data ? data.price : null }</p>
                </div>
                <div className="flex mt-5 space-x-2">
                    <button onClick={()=>{setConfirm(true); setAdd("bag")}} className='rounded-full w-full bg-red-500 text-white py-1' id='Medium'>Add to cart</button>
                    <button onClick={()=>{setConfirm(true); setAdd("buy")}} className='rounded-full w-full bg-red-500 text-white py-1' id='Medium'>Buy now</button>
                </div>
            </div>
            {confirm === true ?
                <div className="fixed grid bottom-0 left-0 rounded-tl-3xl rounded-tr-3xl border-2 bg-slate-50 p-5 w-full pb-16">
                    <button onClick={()=>setConfirm(false)} className='w-max ml-auto'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <p id='Medium' className='text-xl text-center'>{add === "bag" ? "Add to cart" : "Buy now"}</p>
                    <div className="flex mt-5" id='Light'>
                        <p className='text-lg'>Choose Quantity</p>
                        <div className="flex ml-auto space-x-8">
                            <button onClick={()=>setQty(qty <= 1 ? 1 : qty - 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                </svg>
                            </button>
                            <p className='font-semibold'>{qty}</p>
                            <button onClick={()=>setQty(qty + 1)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <button onClick={addBag} className='my-10 text-lg text-white bg-red-500 rounded-full py-1' id='Medium'>{add === "bag" ? "Add to cart" : "Buy now"}</button>
                </div>
            :
                null
            }
            { loading === true ? <Loading /> : null }
        </div>

        {/* Dekstop */}
        <div className="md:grid hidden w-10/12 mx-auto py-20">
            <div className="flex">
                <div className="w-5/12">
                    <img src={data ? data.photo : null} className='md:h-60 lg:h-80 xl:h-100 mx-auto' alt="" />
                </div>
                <div className="w-7/12">
                    <p id='SemiBold' className='md:text-2xl lg:text-3xl text-4xl'>{data ? data.name : null}</p>
                    <p id='Light' className='md:text-md lg:text-lg'>{data ? data.brand : null}</p>
                    <div className="price my-10">
                        <p id='Medium' className='md:text-xl text-2xl'>Price</p>
                        <p id='SemiBold' className='md:text-2xl xl:text-4xl'>Rp. {data ? data.price : null}</p>
                    </div>
                    <div className="order my-10">
                        <div className="flex">
                            <div className="w-1/4">
                                <p id='Medium' className='md:text-xl text-2xl'>Quantity</p>
                                <div className="flex mt-5 space-x-5">
                                    <div onClick={()=>qty <= 1 ? setQty(1) : setQty(qty - 1)} className="min p-1 border cursor-pointer hover:opacity-60 border-black rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                        </svg>
                                    </div>
                                    <p className='text-lg my-auto' id='Medium'>{qty}</p>
                                    <div onClick={()=>setQty(qty + 1)} className="plus p-1 border cursor-pointer hover:opacity-60 border-black rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 mt-20 space-y-5">
                        <button onClick={addBag} id='Medium' className='md:text-xl text-2xl border-2 border-red-500 text-white bg-red-500 w-full md:py-1 py-2 rounded-full hover:opacity-60'>Add to cart</button>
                        {/* <button id='Medium' className='text-2xl border-2 text-red-500 border-red-500 w-full py-2 rounded-full hover:opacity-60'>Buy now</button> */}
                    </div>
                </div>
            </div>
            <div className="grid mt-10">
                <p id='Medium' className='md:text-2xl lg:text-3xl text-4xl'>Product Information</p>
                <p id='Medium' className='text-2xl mt-10'>Condition</p>
                <p id='Light' className='text-xl md:text-lg text-red-500'>{data ? data.condition : null}</p>
                <p id='Medium' className='text-2xl mt-10'>Description</p>
                <p id='Light' className='text-xl md:text-lg'>{data ? data.description : null}</p>
                <hr className='my-20 border-t-2' />
                <p id='Medium' className='md:text-2xl lg:text-3xl text-4xl mb-14'>Other Products</p>
                <div className="products categories grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 gap-10">
                    { dataProduct ? dataProduct.map((item)=>
                    <CardProducts
                    image={item.photo}
                    tittle={item.name} brand={item.brand} price={item.price} stock={item.stock}
                    />
                    ) : null } 
                </div>
            </div>
        { loading === true ? <Loading /> : null}
        </div>
    </div>
  )
}

export default Detail