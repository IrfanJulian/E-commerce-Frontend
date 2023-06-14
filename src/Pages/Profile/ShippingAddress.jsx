import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import { useNavigate } from 'react-router-dom'
import AddAddress from '../../Components/AddAddress';
import axios from 'axios';
import Loading from '../../Components/Loading';
import Swal from 'sweetalert2';

const ShippingAddress = () => {

    const navigate = useNavigate();
    const email = localStorage.getItem('email');
    const [add, setAdd] = useState(false);
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
            const getData = async() => {
                try {               
                    const res = await axios({
                        method: "GET",
                        url: `${process.env.REACT_APP_URL}/user/address/${email}`
                    })
                    setData(res.data.data);
                } catch (error) {
                    
                }
            }
            getData();
    }, [email]);

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
                        email_user: email,
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

  return (
    <div>
        <Navbar />
            {/* Mobile */}
            <div className="lg:hidden grid pt-5 pb-20 px-5">
                <button onClick={()=>navigate(`/profile/${email}`)} className='flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <div className="wrapper my-10 space-y-5">
                    <p id='SemiBold' className='text-2xl mb-10'>Shipping Address</p>
                    <p className={`text-center text-lg ${data ? data.length < 1 ? "block" : "hidden" : null}`} id='Medium'>Your address not set.</p>
                    { data ? data.map((address)=>
                    <div id={address.id} className={`card shadow-lg rounded-lg p-5 border ${data ? data.length >= 1 ? "block" : "hidden" : null}`}>
                        <div className="flex mb-5">
                            <p className='text-lg' id='Medium'>{address.name}</p>
                            <p className='text-lg my-auto ml-auto text-red-500' id='SemiBold'>Change</p>
                        </div>
                        <div className="grid">
                            <p className='text-lg mb-5 -mt-5' id='Light'>{address.phone}</p>
                            <p className='text-lg' id='Medium'>Address</p>
                            <p className='text-md' id='Light'>{address.address} {address.city} {address.postal_code}</p>
                        </div>
                    </div>
                    )
                    :
                    null
                    }
                </div>
                <button onClick={()=>setAdd(true)} className='py-2 bg-red-500 rounded-full text-white w-full' id='Medium'>Add new address</button>
                {add === true ? 
                    <AddAddress close={()=>setAdd(false)} onSubmmit={addAddress} onChange={handleChange} rname='name' rphone='phone' address='address' city='city' postal_code='postal_code' vrname={form.name} vrphone={form.phone} vaddress={form.address} vcity={form.city} vpostal_code={form.postal_code}  />
                :
                    null}
            </div>
            { loading === true ? <Loading /> : null }
    </div>
  )
}

export default ShippingAddress