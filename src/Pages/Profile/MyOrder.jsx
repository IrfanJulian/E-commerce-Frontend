import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import Loading from '../../Components/Loading';

const MyOrder = () => {

    const {email} = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    const [dataOrder, setDataOrder] = useState();

    useEffect(()=>{
        if(role === "customer"){
            const getOrder = async() => {
                setLoading(true);
                const res = await axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_URL}/checkout/my-order/${email}`
                })
                setLoading(false);
                setDataOrder(res.data.data);
            }
            getOrder();
        } else {
            const getOrder = async() => {
                setLoading(true);
                const res = await axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_URL}/checkout/seller-order/${email}`
                })
                setLoading(false);
                setDataOrder(res.data.data);
            }
            getOrder();
        }
    }, [email, role])

    const proccess = (id) => {
        setLoading(true);
        Swal.fire({
            title: 'Are you sure want to proccess this order?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '',
            confirmButtonText: 'Yes'
          }).then(async(result) => {
            if (result.isConfirmed) {
                await axios({
                    method: "PUT",
                    url: `${process.env.REACT_APP_URL}/checkout/delievery/${id}`
                })
                // window.location.reload();
                setLoading(false);
              Swal.fire(
                'Success!',
                'You have 12 hours to send the order.',
                'success'
              )
            }
            setLoading(false);
          })
    }

    const paymentConfirm = (id) => {
        setLoading(true);
        try {
            Swal.fire({
                title: 'Are you sure have receiving payment?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '',
                confirmButtonText: 'Yes'
              }).then(async(result) => {
                if (result.isConfirmed) {
                    await axios({
                        method: "PUT",
                        url: `${process.env.REACT_APP_URL}/checkout/payment/${id}`
                    })
                    setLoading(false);
                    // window.location.reload();
                  Swal.fire(
                    'Success',
                    'Payment Confirm!',
                    'success'
                  )
                }
                setLoading(false);
              })
        } catch (error) {
            setLoading(false)
        }
    }

  return (
    <div>
        <div className="lg:hidden grid pt-5 pb-16 px-5">
            <button onClick={()=>navigate(`/profile/${email}`)} className='flex'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            <div className="wrapper my-10 space-y-5 bg-white">
                <p id='SemiBold' className='text-2xl mb-10'>My Order</p>
                { dataOrder && dataOrder.length >= 1 ? dataOrder.map((item)=>
                <div key={item.id} className="card shadow-lg rounded-lg p-3 border">
                    <div className="flex mb-5">
                        <p className='' id='SemiBold'>ID Number: {item.id}</p>
                        <p className='text-md my-auto ml-auto' id='Light'>{item.date_order}</p>
                    </div>
                    <div className="flex my-3">
                        <div className="wrap h-28 w-28 overflow-hidden border">
                            <img src={item.photo} className='h-28' alt="" />
                        </div>
                        <p className='text-md m-auto text-center' id='Medium'>{item.name}</p>
                    </div>
                    <div className="flex my-1">
                        <p className='' id='Medium'>{role === 'customer' ? 'Seller name' : 'Buyer name'}</p>
                        <p className='text-sm my-auto ml-auto' id='Light'>{role === 'customer' ? item.seller_name : item.buyer_name}</p>
                    </div>
                    <div className="flex my-1">
                        <p className='' id='Medium'>Payment status</p>
                        <p className='text-sm my-auto ml-auto' id='Light'>{item.status_payment}</p>
                    </div>
                    <div className="flex my-1">
                        <p className='' id='Medium'>Quantity</p>
                        <p className='text-sm my-auto ml-auto' id='Light'>{item.quantity}</p>
                    </div>
                    <div className="flex my-1">
                        <p className='' id='Medium'>Payment method</p>
                        <p className='text-sm my-auto ml-auto' id='Light'>{item.payment_method}</p>
                    </div>
                    <div className="flex">
                        <p className='' id='Medium'>Total amount</p>
                        <p className='text-sm my-auto ml-auto' id='SemiBold'>Rp. {item.total_order}</p>
                    </div>
                    <p className={`mt-5 text-green-500 text-center ${ role && role !== 'seller' ? "block" : "hidden"}`} id='Light'>{item.status_delivery}</p>
                    <button onClick={(e)=>{e.preventDefault(); paymentConfirm(item.id)}} className={`mt-5 w-full py-1 rounded-full bg-green-500 text-white ${ role && role === 'seller' ? "block" : "hidden"}`} id='Light'>Confirm Payment</button>
                    <button onClick={(e)=>{e.preventDefault(); proccess(item.id)}} className={`mt-2 w-full py-1 rounded-full bg-green-500 text-white ${ role && role === 'seller' ? "block" : "hidden"}`} id='Light'>Process</button>
                </div>
                )
                :
                <div className={`${role === "customer" ? "grid" : "hidden"}`}>
                    <p id='Medium' className='text-xl text-center'>Shop now</p>
                    <button onClick={()=>navigate('/')} className='my-5 w-max mx-auto'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-auto">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                        <p id='Light' className='text-red-500'>Click Here</p>
                    </button>
                </div>
                }
            </div>
        </div>
        { loading === true ? <Loading /> : null }
    </div>
  )
}

export default MyOrder