import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import mastercards from '../../Assets/Image/mastercard.png'
import pos from '../../Assets/Image/pos.png'
import gopay from '../../Assets/Image/gopay.png'
import Loading from '../../Components/Loading'
import Success from '../../Components/Success'
import Payment from '../../Components/Payment'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import AddAddress from '../../Components/AddAddress'
import Swal from 'sweetalert2'

const Checkout = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const email = localStorage.getItem('email')
    const [payment, setPayment] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [choosePayment, setChoosePayment] = useState('');
    const [data, setData] = useState();
    const [dataAddress, setDataAddress] = useState();
    let distance = Math.floor((Math.random() * 4) + 3);
    const delievery = distance * 6400;
    const [add, setAdd] = useState(false);
    let date = new Date().toLocaleDateString();
    const total = data ? (data.price * data.quantity) + delievery : null;

    useEffect(()=> {
        setLoading(true)
        const getData = async() => {
        try {            
            const res = await axios({
                method: "GET",
                url: `${process.env.REACT_APP_URL}/bag/detail/${id}`
            })
                setData(res.data.data[0])
            } catch (error) {
                
            }
        }
        getData();
        setLoading(false);
    }, [id])

    useEffect(()=>{
        setLoading(true);
        const getDataAddress = async() => {
            try {
                const res = await axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_URL}/user/address/${email}`
                })
                setDataAddress(res.data.data[0])
            } catch (error) {
                
            }
        }
        setLoading(false);
        getDataAddress();
    }, [email])

    const [form, setForm] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        postal_code: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    
    const addAddress = async(e) => {
        setLoading(true);
        e.preventDefault();
        try {
            if(email.length >= 1){
                await axios({
                    method: "POST",
                    url: `${process.env.REACT_APP_URL}/user/address`,
                    data: {
                        name: form.name,
                        phone: form.phone,
                        address: form.address,
                        city: form.city,
                        postal_code: form.postal_code,
                        email_user: email
                    }
                })
                setForm('')
                setLoading(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Add new address success!'
                  })
            }else{
                console.log('data kosong');
            }
        } catch (error) {
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
              })
        }
    }

    const checkout = async(e) => {
        setLoading(true);
        e.preventDefault();
        if(choosePayment.length > 1){
            try {
                Swal.fire({
                    title: 'Are you sure want to checkout?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '',
                    confirmButtonText: 'Yes!'
                  }).then(async(result) => {
                    if (result.isConfirmed) {
                        await axios({
                            method: "POST",
                            url: `${process.env.REACT_APP_URL}/checkout`,
                            data: {
                                id_bags: id,
                                date_order: date,
                                total_order: total,
                                status_payment: "CONFIRMATION",
                                status_delivery: "ON PROCCESS",
                                email: email,
                                payment_method: choosePayment,
                                id_product: data ? data.id_product : null,
                                id_seller: data ? data.email : null,
                                quantity: data ? data.quantity : null
                            }
                        })
                        await axios({
                            method: "PUT",
                            url: `${process.env.REACT_APP_URL}/checkout/update-stock/${data.id_product}`,
                            data: {
                                stock: data ? data.stock - data.quantity : null
                            }
                        })
                        await axios({
                            method: "DELETE",
                            url: `${process.env.REACT_APP_URL}/bag/${id}`
                        })
                        setTimeout(() => {
                            setLoading(false);
                            setSuccess(true);
                            Swal.fire(
                                'Success!',
                                'Checkout success.',
                                'success'
                            )
                        }, 5000);
                    }
                  })
            } catch (error) {
                setLoading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                  })
            }
        } else {
            setLoading(false);
            Swal.fire('Please choose payment method')
        }
    }
    console.log(loading);

  return (
    <div>
        <Navbar />
        {/* Dekstop */}
        <div className="hidden lg:block">
            <div className="w-9/12 mx-auto p-10">
                <p className='text-4xl' id='SemiBold'>Checkout</p>
                <div className="flex mt-20">
                    <div className="w-7/12 pr-7">
                        <p id='Medium' className='text-xl'>Shipping Address</p>
                        { dataAddress && dataAddress.address.length > 0 ?
                        <div className="card w-full border-2 rounded-md shadow-lg p-5 mt-5">
                            <div className="flex">
                                <p className='text-lg' id='Medium'>{dataAddress ? dataAddress.name : null}</p>
                                <p className='text-lg my-auto ml-auto text-red-500' id='SemiBold'>Change</p>
                            </div>
                            <p className='text-lg mb-5' id='Light'>{dataAddress ? dataAddress.phone : null}</p>
                            <div className="grid">
                                <p className='text-lg' id='Medium'>Address</p>
                                <p className='text-md' id='Light'>{dataAddress.address} {dataAddress.city} {dataAddress.postal_code}</p>
                            </div>
                        </div>
                        :
                        <div className='my-20 grid'>
                            <p id='Medium' className='text-md text-center'>Set your address now.</p>
                            <button onClick={()=>setAdd(true)} className='w-1/2 mx-auto py-1 bg-red-500 rounded-full text-white my-3' id='Medium'>Add address</button>
                        </div>
                        }
                        <div className="card mt-5 w-full border-2 rounded-md shadow-lg p-5 flex">
                            <div className="w-7/12 flex">
                                <img src={data ? data.photo : null} className='w-24 rounded-lg mr-4' alt="" />
                                <div className="text my-auto">
                                    <p id='Medium'>{data ? data.name : null}</p>
                                    <p id='Light'>{data ? data.brand : null}</p>
                                </div>
                            </div>
                            <div className="w-5/12 flex">
                                <p id='Medium' className='text-lg my-auto ml-auto'>Rp. {data ? data.price : null}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-5/12 pl-7">
                        <div className="card p-5 border rounded-lg shadow-lg">
                            <p className='text-xl' id='SemiBold'>Shopping summary</p>
                            <div className="flex mt-5">
                                <p className='text-lg text-slate-400' id='Medium'>Order</p>
                                <p className='text-xl ml-auto' id='SemiBold'>Rp. {data ? data.price : null}</p>
                            </div>
                            <div className="flex mt-5">
                                <p className='text-lg text-slate-400' id='Medium'>Quantity</p>
                                <p className='text-xl ml-auto' id='SemiBold'>{data ? data.quantity : null}</p>
                            </div>
                            <div className="flex mt-5">
                                <p className='text-lg text-slate-400' id='Medium'>Deliver</p>
                                <p className='text-xl ml-auto' id='SemiBold'>Rp. {delievery}</p>
                            </div>
                            <hr className='my-5 border' />
                            <div className="flex mt-5">
                                <p className='text-lg text-slate-400' id='Medium'>Total Price</p>
                                <p className='text-xl ml-auto' id='SemiBold'>Rp. {total}</p>
                            </div>
                            <button onClick={()=>setPayment(true)} id='Medium' className='text-white bg-red-500 rounded-full w-full py-2 text-xl hover:opacity-70 mt-10'>Buy</button>
                        </div>
                    </div>
                </div>
            </div>
            { add === true ? 
            <AddAddress close={()=>setAdd(false)} onSubmmit={addAddress} onChange={handleChange} rname='name' rphone='phone' address='address' city='city' postal_code='postal_code' vrname={form.name} vrphone={form.phone} vaddress={form.address} vcity={form.city} vpostal_code={form.postal_code}  />
            : null }
            { payment === true ? <Payment onClickPay={checkout} onClick1={()=>setPayment(false)} onChangePayment1={()=>setChoosePayment("MasterCards")} onChangePayment2={()=>setChoosePayment("Pos-indonesia")} onChangePayment3={()=>setChoosePayment("Gopay")} checked1={choosePayment === "MasterCards" ? true : false} checked2={choosePayment === "Pos-indonesia" ? true : false} checked3={choosePayment === "Gopay" ? true : false} order={data.price} delievery={delievery} total={total} /> : null }
            { success === true ? <Success /> : null }
            { loading === true ? <Loading /> : null }
        </div>

        {/* Mobile */}
        <div className="lg:hidden grid pt-5 pb-48 px-5">
            <button onClick={()=>navigate(`/my-bag/${email}`)} className='flex'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            <div className="wrapper mt-10 mb-36">
                <p id='SemiBold' className='text-3xl mb-10'>Checkout</p>
                <p id='Medium' className='text-lg'>Shipping Address</p>
                { dataAddress ? 
                <div className="card shadow-lg rounded-lg p-5 border mt-5">
                    <div className="flex mb-5">
                        <div>
                        <p className='' id='Medium'>{dataAddress.name}</p>
                        <p className='' id='Light'>{dataAddress.phone}</p>
                        </div>
                        <p className='my-auto ml-auto text-red-500' id='SemiBold'>Change</p>
                    </div>
                    <div className="grid">
                        <p className='' id='Medium'>Address</p>
                        <p className='text-sm' id='Light'>{dataAddress.address} {dataAddress.city} {dataAddress.postal_code}</p>
                    </div>
                </div>
                : 
                <div className='my-5 grid'>
                 <p id='Medium' className='text-md text-center'>Set your address now.</p>
                 <button onClick={()=>setAdd(true)} className='w-1/2 mx-auto py-1 bg-red-500 rounded-full text-white my-3' id='Medium'>Add address</button>
                </div>
                }
                <p id='Medium' className='text-lg my-10'>Payment</p>
                <div className="flex mb-3">
                    <div className="wrapper p-1 mr-10 h-10 grid">
                        <img src={mastercards} className='w-12 my-auto' alt="" />
                    </div>
                    <p className='my-auto' id='Medium'>Mastercard</p>
                    <input type="checkbox" onChange={()=>setChoosePayment("MasterCards")} checked={choosePayment === "MasterCards" ? true : false} name='choosePayment' className='accent-red-500 w-4 h-4 cursor-pointer my-auto ml-auto' />
                </div>
                <div className="flex mb-3">
                    <div className="wrapper p-1 mr-10 h-10 grid">
                        <img src={pos} className='w-12 my-auto' alt="" />
                    </div>
                    <p className='my-auto' id='Medium'>Pos Indonesia</p>
                    <input type="checkbox" onChange={()=>setChoosePayment("Pos-indonesia")} checked={choosePayment === "Pos-indonesia" ? true : false} className='accent-red-500 w-4 h-4 cursor-pointer my-auto ml-auto' />
                </div>
                <div className="flex mb-3">
                    <div className="wrapper p-1 mr-10 h-10 grid">
                        <img src={gopay} className='w-12 my-auto' alt="" />
                    </div>
                    <p className='my-auto' id='Medium'>Gopay</p>
                    <input type="checkbox" onChange={()=>setChoosePayment("GoPay")} checked={choosePayment === "GoPay" ? true : false} className='accent-red-500 w-4 h-4 cursor-pointer my-auto ml-auto' />
                </div>
                <div className="fixed left-0 bottom-[68px] w-screen p-4 border-2 rounded-tl-xl rounded-tr-xl bg-white">
                    <div className="flex">
                        <p id='Medium'>Order</p>
                        <p id='Medium' className='ml-auto'>Rp. {data ? data.price : null}</p>
                    </div>
                    <div className="flex my-4">
                        <p id='Medium'>Delievery</p>
                        <p id='Medium' className='ml-auto'>Rp. {delievery}</p>
                    </div>
                    <div className="flex my-4">
                        <p id='Medium'>Quantity</p>
                        <p id='Medium' className='ml-auto'>{data ? data.quantity : null}</p>
                    </div>
                    <div className="flex">
                        <p id='Medium'>Total Amount</p>
                        <p id='Medium' className='ml-auto'>Rp. {total}</p>
                    </div>
                    <div className="grid">
                        <button onClick={checkout} id='SemiBold' className='rounded-full py-2 text-white bg-red-500 w-11/12 mt-5 mx-auto'>Checkout</button>
                    </div>
                </div>
            </div>
            { add === true ? 
            <AddAddress close={()=>setAdd(false)} onSubmmit={addAddress} onChange={handleChange} rname='name' rphone='phone' address='address' city='city' postal_code='postal_code' vrname={form.name} vrphone={form.phone} vaddress={form.address} vcity={form.city} vpostal_code={form.postal_code}  />
            : null }
            { success === true ? <Success /> : null }
            { loading === true ? <Loading /> : null }
        </div>
        

    </div>
  )
}

export default Checkout