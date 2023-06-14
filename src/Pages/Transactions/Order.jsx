import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CardBag from '../../Components/CardBag';
import Loading from '../../Components/Loading';
import Swal from 'sweetalert2';
import Navbar from '../../Components/Navbar';

const Order = () => {

    const navigate = useNavigate();
    const idUser = localStorage.getItem('id')
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const getData = async() => {
            setLoading(true);
            try {
                const res = await axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_URL}/bag/${idUser}`
                })
                setData(res.data.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [idUser]);

    const deleteBag = (id) => {
        setLoading(true);
        try {
            Swal.fire({
                title: 'Are you sure want to delete this item?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then(async(result) => {
                if (result.isConfirmed) {
                    await axios({
                        method: "DELETE",
                        url: `${process.env.REACT_APP_URL}/bag/${id}`
                    })
                    setLoading(false);
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
                // window.location.reload();
                setLoading(false);
              })
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
        {/* Mobile */}
        <div className="grid p-5 md:hidden">
            <button onClick={()=>navigate(`/`)} className='flex'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            <div className="wrapper my-5 bg-white">
                <p id='SemiBold' className='text-2xl mb-10'>My Bag</p>
                { data && data.length > 0 ? data.map(item =>
                <div key={item.id} className="">
                    <CardBag onClick={(e)=>{e.preventDefault(); deleteBag(item.id)}} onClickCheckout={()=>navigate(`/checkout/${item.id}`)} photo={item.photo} tittle={item.name} brand={item.brand} price={item.price * item.quantity} qty={item.quantity} />
                </div>
                )
                :
                <p id='Medium' className='text-lg text-center'>No data for show.</p>}
            </div>
        </div>

        {/* Dekstop */}
        <div className="hidden md:block">
            <Navbar />
            <div className="w-9/12 mx-auto p-10">
                <p className='md:text-2xl lg:text-3xl text-4xl' id='SemiBold'>My Bag</p>
                <div className="mt-20">
                    <div className="grid md:grid-cols-1 xl:grid-cols-2 gap-8">
                        { data ? data.map(item => 
                        <div key={item.id} className="card relative mt-5 w-full border-2 rounded-md shadow-lg p-5">
                            <button onClick={(e)=>{e.preventDefault(); deleteBag(item.id)}} className='hover:text-red-500 absolute bottom-2 right-5 hover:opacity-70 mb-5'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>
                            <div className="flex">
                                <div className="w-7/12 flex">
                                    <img src={item.photo} className='w-24 rounded-lg mr-4' alt="" />
                                    <div className="text my-auto">
                                        <p id='Medium'>{item.name}</p>
                                        <p id='Light'>{item.brand}</p>
                                    </div>
                                </div>
                                <div className="w-5/12 flex">
                                    <p id='Medium' className='text-lg my-auto ml-auto'>Rp. {item.price}</p>
                                </div>
                            </div>
                            <div className="grid xl:mt-5">
                                <button onClick={()=>navigate(`/checkout/${item.id}`)} className='py-1 px-8 bg-red-500 rounded-full text-white hover:opacity-75 mx-auto' id='Medium'>Checkout</button>
                            </div>
                        </div>
                        ) :
                        null }
                    </div>
                </div>
            </div>
        </div>

        { loading === true ? <Loading /> : null }
    </div>
  )
}

export default Order