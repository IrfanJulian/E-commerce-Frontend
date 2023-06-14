import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../Components/Navbar';
import SideBar from '../../Components/SideBar';
import axios from 'axios';
import Loading from '../../Components/Loading';
import Swal from 'sweetalert2';
import CardProducts from '../../Components/CardProducts';
import AddProduct from '../../Components/AddProduct';

const Profile = () => {

    const {email} = useParams();
    const navigate = useNavigate();
    const [sidebar, setSidebar] = useState(false);
    const role = localStorage.getItem('role');
    const [show, setShow] = useState(1);
    const [newAddress, setNewAddress] = useState(false);
    const [data, setData] = useState();
    const [dataOrder, setDataOrder] = useState();
    const [dataAddress, setDataAddress] = useState();
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [add, setAdd] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: email,
        phone: '',
        gender: '',
        birth: ''
    });
    const [photo, setPhoto] = useState([]);
    const [address, setAddress] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        postal_code: ''
    })
    const [dataProduct, setDataProduct] = useState('');

    useEffect(()=>{
        const myProduct = async() => {
            try {
                setLoading(true);
                const res = await axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_URL}/product/my-product/${email}`
                })
                setDataProduct(res.data.data);
                
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        myProduct();
    }, [email]);
    
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }
    
    const handleChangeAddress = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
        const getData = async() => {
            setLoading(true);
            const res = await axios({
                method: "GET",
                url: `${process.env.REACT_APP_URL}/user/profile/${email}`
            })
            setData(res.data.data[0]);
            setLoading(false);
        }
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(data);

    useEffect(() => {
        const getDataAddress = async() => {
            try {               
                const res = await axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_URL}/user/address/${email}`
                })
                setDataAddress(res.data.data);
            } catch (error) {
                
            }
        }
        getDataAddress();
    }, [email]);

    useEffect(()=>{
        if(role === "customer"){
            const getOrder = async() => {
                setLoading(true);
                const res = await axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_URL}/checkout/my-order/${email}`
                })
                setDataOrder(res.data.data);
            }
            setLoading(false);
            getOrder();
        } else {
            const getOrder = async() => {
                setLoading(true);
                const res = await axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_URL}/checkout/seller-order/${email}`
                })
                setDataOrder(res.data.data);
            }
            setLoading(false);
            getOrder();
        }
    }, [email, role])

    const handleSubmit = async() => {
        setLoading(true);
        try {
            await axios({
                method: "PUT",
                url: `${process.env.REACT_APP_URL}/user/change-information/${email}`,
                data: {
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    gender: form.gender,
                    birth: form.birth
                }
            })
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your profile updated'
              })
            //   window.location.reload();
              setForm("");
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            })
        }
        setLoading(false);
    }

    const updatePhoto = async(e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('photo', photo, photo.name)
        try {         
            setLoading(true);
            await axios({
                method: "PUT",
                url: `${process.env.REACT_APP_URL}/user/change-photo/${email}`,
                data: formData
            })
            setLoading(false);
            // window.location.reload();
            Swal.fire(
                'Success!',
                'Your photo has been changed.',
                'success'
                )
        } catch (error) {
            console.log(error);
        }
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
                        name: address.name,
                        phone: address.phone,
                        address: address.address,
                        city: address.city,
                        postal_code: address.postal_code,
                        email_user: email,
                    }
                })
                setForm('')
                // window.location.reload();
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

    const deleteAddress = async(id) => {
        try {
            Swal.fire({
                title: 'Are you sure want to delete this address?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '',
                confirmButtonText: 'Yes, delete it!'
              }).then(async(result) => {
                  if (result.isConfirmed) {
                    setLoading(true);
                    await axios({
                        method: 'DELETE',
                        url: `${process.env.REACT_APP_URL}/user/delete-address/${id}`
                    })
                    // window.location.reload();
                    setLoading(false);
                  Swal.fire(
                    'Deleted!',
                    'Your address has been deleted.',
                    'success'
                  )
                }
              })
        } catch (error) {
            
        }
    }

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

    const deleteProduct = (id) => {
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
                        url: `${process.env.REACT_APP_URL}/product/${id}`
                    })
                    setLoading(false);
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
              })
        } catch (error) {
            console.log(error);
        }
    }

    const handleChangeAddProduct = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitAddProduct = async(e) => {
        setLoading(true);
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('brand', form.brand);
        formData.append('category', form.category);
        formData.append('price', form.price);
        formData.append('condition', form.condition);
        formData.append('stock', form.stock);
        formData.append('description', form.description);
        formData.append('id_seller', email);
        formData.append('photo', photo, photo.name);
        try {
            await axios({
                method: "POST",
                url: `${process.env.REACT_APP_URL}/product`,
                data: formData
            })
            setLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your product uploaded.'
              })
              setForm("");
            //   window.location.reload();
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
        <div className="md:hidden grid pt-5 pb-20 px-5">
            <p id='SemiBold' className='text-3xl text-left'>My Profile</p>
            <div className="my-10 flex">
                <img src={ data && data.photo.length !== 0 ? data.photo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ189QpiU5NaQAJ72Rd6odT5BdjqmzRzDqAwwDgAVRqko4ha9thmsXoluYhLSkPbBLZN94&usqp=CAU" } className='w-24 rounded-full' alt="" />
                <div className="wrapper my-auto ml-4">
                    <p id='Medium' className='text-lg'>{ data ? data.name : null }</p>
                    <p id='Light' className='text-md'>{ data ? data.email : null }</p>
                </div>
            </div>
            <div className="my-10">
                <div onClick={()=>navigate(`/my-order/${email}`)} className="flex py-5 border-b-2">
                    <p id='Medium' className='text-lg'>My Order</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 my-auto ml-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
                <div onClick={()=>navigate(`/shipping-address/${email}`)} className="flex py-5 border-b-2">
                    <p id='Medium' className='text-lg'>Shipping Address</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 my-auto ml-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
                <div onClick={()=>navigate(`/my-product/${email}`)} className={`py-5 border-b-2 ${role === "seller" ? "flex" : "hidden"}`}>
                    <p id='Medium' className='text-lg'>My Product</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 my-auto ml-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
                <div onClick={()=>navigate(`/settings/${email}`)} className="flex py-5 border-b-2">
                    <p id='Medium' className='text-lg'>Settings</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 my-auto ml-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </div>
        </div>

        {/* Dekstop */}
        <div className="hidden md:grid">
            <button onClick={()=>setSidebar(true)} className='text-red-500 mt-5 ml-5 hover:scale-125 w-max'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
            <SideBar close={()=>setSidebar(false)} margin={sidebar === true ? "ml-0" : "-ml-[700px]"} onClick1={()=>{setShow(1); setSidebar(false)}} onClick2={()=>{setShow(2); setSidebar(false)}} onClick3={()=>{setShow(3); setSidebar(false)}} onClick4={()=>{setShow(4); setSidebar(false)}} name={data ? data.name : null} picture={data ? data.photo : null} edit={()=>edit === false ? setEdit(true) : setEdit(false)} textEdit={edit === false ? "Edit Profile" : "Cancel"} />
            <div className="md:w-10/12 lg:w-8/12 mx-auto">
                <div className="wrapper border-2 shadow-xl p-10 rounded-xl">
                    { show === 1 ?
                        <div className="profile information grid">
                            <p id='SemiBold' className='text-3xl mb-5'>My Profile</p>
                            <p id='Light'>Manage your profile information</p>
                            <hr className='my-10 border-t-2' />
                            <div className="flex" id='Light'>
                                { edit === true ? 
                                <div className="w-8/12 border-r space-y-5">
                                    <div className="flex pr-10">
                                        <div className="w-3/12 grid">
                                            <p className='my-auto'>Full name</p>
                                        </div>
                                        <div className="w-9/12">
                                            <input name='name' onChange={handleChange} value={form.name} type="text" placeholder='Insert your name' className='w-full py-2 px-4 border rounded-lg outline-none' />
                                        </div>
                                    </div>
                                    <div className="flex pr-10">
                                        <div className="w-3/12 grid">
                                            <p className='my-auto'>E-mail</p>
                                        </div>
                                        <div className="w-9/12">
                                            <input name='email' onChange={handleChange} value={form.email} type="email" placeholder='Insert your email' className='w-full py-2 px-4 border rounded-lg outline-none' disabled />
                                        </div>
                                    </div>
                                    <div className="flex pr-10">
                                        <div className="w-3/12 grid">
                                            <p className='my-auto'>Phone Number</p>
                                        </div>
                                        <div className="w-9/12">
                                            <input name='phone' onChange={handleChange} value={form.phone} type="text" placeholder='Insert your phone number' className='w-full py-2 px-4 border rounded-lg outline-none' />
                                        </div>
                                    </div>
                                    <div className="flex pr-10">
                                        <div className="w-3/12 grid">
                                            <p className='my-auto'>Gender</p>
                                        </div>
                                        <div className="w-9/12">
                                            <select name='gender' onChange={handleChange} value={form.gender} id="gender" className='w-full py-2 px-4 border rounded-lg outline-none cursor-pointer'>
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex pr-10">
                                        <div className="w-3/12 grid">
                                            <p className='my-auto'>Date of Birth</p>
                                        </div>
                                        <div className="w-9/12">
                                            <input name='birth' onChange={handleChange} value={form.birth} type="date" className='w-full py-2 px-4 border rounded-lg outline-none' />
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="w-8/12 border-r space-y-5">
                                    <div className="flex pr-10">
                                        <div className="w-3/12 grid">
                                            <p className='my-auto'>Full name</p>
                                        </div>
                                        <div className="w-9/12">
                                            <div type="text" placeholder='Insert your name' className='w-full py-2 px-4 border rounded-lg outline-none'>
                                                {data ? data.name : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex pr-10">
                                        <div className="w-3/12 grid">
                                            <p className='my-auto'>E-mail</p>
                                        </div>
                                        <div className="w-9/12">
                                            <div type="text" placeholder='Insert your name' className='w-full py-2 px-4 border rounded-lg outline-none'>
                                                {data ? data.email : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex pr-10">
                                        <div className="w-3/12 grid">
                                            <p className='my-auto'>Phone Number</p>
                                        </div>
                                        <div className="w-9/12">
                                            <div type="text" placeholder='Insert your name' className='w-full py-2 px-4 border rounded-lg outline-none'>
                                                {data ? data.phone : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex pr-10">
                                        <div className="w-3/12 grid">
                                            <p className='my-auto'>Gender</p>
                                        </div>
                                        <div className="w-9/12">
                                            <div type="text" placeholder='Insert your name' className='w-full py-2 px-4 border rounded-lg outline-none'>
                                                {data && data.gender.length > 0 ? data.gender : "Set your gender"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex pr-10">
                                        <div className="w-3/12 grid">
                                            <p className='my-auto'>Date of Birth</p>
                                        </div>
                                        <div className="w-9/12">
                                            <div type="text" placeholder='Insert your name' className='w-full py-2 px-4 border rounded-lg outline-none'>
                                                {data && data.birth.length > 0 ? data.birth : "Set your date of birth"}
                                            </div>
                                        </div>
                                    </div>
                                </div>  
                                }
                                <div className="w-4/12 grid">
                                    <div className="h-max w-max m-auto">
                                        <img src={data ? data.photo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ189QpiU5NaQAJ72Rd6odT5BdjqmzRzDqAwwDgAVRqko4ha9thmsXoluYhLSkPbBLZN94&usqp=CAU"} className='w-40 h-40 rounded-full' alt="" />
                                        <label htmlFor="pic">
                                            <div className='py-2 mt-5 rounded-full w-full text-center cursor-pointer hover:opacity-70'>Change photo</div>
                                        </label>
                                        <input type='file' name='photo' onChange={(e)=>setPhoto(e.target.files[0])} className='hidden' id='pic' />
                                        <button onClick={updatePhoto} id='Light' className='py-2 mt-5 border-2 rounded-full w-full text-center cursor-pointer hover:text-red-500 hover:border-red-500 '>Save Picture</button>
                                        <button onClick={()=>{localStorage.clear(); navigate('/')}} id='Light' className='py-2 mt-5 border-2 rounded-full w-full text-center cursor-pointer hover:text-red-500 hover:border-red-500'>Logout</button>
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleSubmit} className='py-2 rounded-full text-white bg-red-500 w-1/4 mt-10 mx-auto text-xl hover:opacity-70' id='Medium'>Save</button>
                        </div>
                    : show === 2 ?
                        <div className='Shipping address grid'>
                            <p id='SemiBold' className='text-3xl mb-5'>Shipping Address</p>
                            <p id='Light'>Manage your shipping address</p>
                            <hr className='my-10 border-t-2' />
                            <div onClick={()=>setNewAddress(true)} className="addaddress border-4 py-8 border-dashed rounded-3xl cursor-pointer text-gray-300 hover:border-gray-400 hover:text-gray-400">
                                <p className='text-center text-3xl' id='Medium'>Add new address</p>
                            </div>
                            {newAddress === true ? 
                                <div className='absolute top-0 left-0 w-screen h-screen'>
                                    <div className="bg-black opacity-70 w-full h-full"></div>
                                    <div className="absolute w-screen h-screen top-0 left-0 grid">
                                        <div className='relative w-1/2 h-1/2 bg-white m-auto rounded-xl p-5'>
                                            <button onClick={()=>setNewAddress(false)} className='absolute top-3 right-3 w-max h-max hover:opacity-40'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                            <p id='Medium' className='text-2xl text-center h-max'>Add new address</p>
                                            <div className="grid grid-cols-2 gap-5 mt-10">
                                                <div className="card border rounded-xl p-3 shadow-md">
                                                    <p className='text-sm' id='Light'>Recipient's Name</p>
                                                    <input name='name' value={address.name} onChange={handleChangeAddress} type="text" id='Medium' className='text-lg outline-none w-full' />
                                                </div>
                                                <div className="card border rounded-xl p-3 shadow-md">
                                                    <p className='text-sm' id='Light'>Recipient's Phone Number</p>
                                                    <input name='phone' value={address.phone} onChange={handleChangeAddress} type="text" id='Medium' className='text-lg outline-none w-full' />
                                                </div>
                                                <div className="card border rounded-xl p-3 shadow-md">
                                                    <p className='text-sm' id='Light'>Address</p>
                                                    <input name='address' value={address.address} onChange={handleChangeAddress} type="text" id='Medium' className='text-lg outline-none w-full' />
                                                </div>
                                                <div className="card border rounded-xl p-3 shadow-md">
                                                    <p className='text-sm' id='Light'>City</p>
                                                    <input name='city' value={address.city} onChange={handleChangeAddress} type="text" id='Medium' className='text-lg outline-none w-full' />
                                                </div>
                                                <div className="card border rounded-xl p-3 shadow-md">
                                                    <p className='text-sm' id='Light'>Postal Code</p>
                                                    <input name='postal_code' value={address.postal_code} onChange={handleChangeAddress} type="text" id='Medium' className='text-lg outline-none w-full' />
                                                </div>
                                            </div>
                                            <div className="grid">
                                                <button onClick={addAddress} className='w-1/2 text-white bg-red-500 rounded-full mx-auto text-xl mt-10 py-2 hover:opacity-80' id='Medium'>Add new address</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            :
                                null
                            }
                            <div className="wrapper mt-10 space-y-5">
                                { dataAddress && dataAddress.length > 0 ? dataAddress.map((item)=>
                                <div className="card border-2 border-red-500 rounded-md p-5">
                                    <p id='Medium' className='text-xl'>{item.name}</p>
                                    <p id='Medium' className='text-lg mt-2'>{item.phone}</p>
                                    <p id='Light' className='text-lg my-3'>{item.address} {item.city} {item.postal_code}</p>
                                    <button onClick={(e)=>{e.preventDefault();deleteAddress(item.id)}} className='w-max text-red-500 text-xl hover:opacity-75' id='SemiBold'>Delete</button>
                                </div>
                                ) : <p id='Medium' className='text-xl text-center'>Set Your Address</p> }
                            </div>
                        </div>
                    : show === 3 ?
                        <div className="myorder">
                            <p id='SemiBold' className='md:text-2xl lg:text-3xl mb-10'>My Order</p>
                            <div className="flex md:text-lg lg:text-xl" id='Medium'>
                                <button className='focus:text-red-500 pb-5 focus:tex-red-500 focus:border-b-4 focus:border-red-500 mr-auto'>All items</button>
                                <button className='focus:text-red-500 pb-5 focus:tex-red-500 focus:border-b-4 focus:border-red-500 mx-auto'>Not yet paid</button>
                                <button className='focus:text-red-500 pb-5 focus:tex-red-500 focus:border-b-4 focus:border-red-500 mx-auto'>Sent</button>
                                <button className='focus:text-red-500 pb-5 focus:tex-red-500 focus:border-b-4 focus:border-red-500 mx-auto'>Completed</button>
                                <button className='focus:text-red-500 pb-5 focus:tex-red-500 focus:border-b-4 focus:border-red-500 ml-auto'>Order cancel</button>
                            </div>
                            <hr className='mb-10 border-t-2' />
                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
                                { dataOrder && dataOrder.length > 0 ? dataOrder.map((item)=>
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
                                ):
                                null }
                            </div>
                        </div>
                    :
                        <div className="myproduct">
                            <div className="flex mb-10">
                                <p id='SemiBold' className='text-3xl'>My Product</p>
                                <button onClick={()=>setAdd(true)} className='flex w-max h-max my-auto ml-auto text-red-500 hover:opacity-60'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    <p id='Medium' className='text-xl ml-3'>Add Product</p>
                                </button>
                            </div>
                            <hr className='my-10 border-t-2' />
                            <div className="grid grid-cols-4 gap-5">
                                { dataProduct ? dataProduct.map((item)=>
                                <div key={item.id} className='grid'>
                                    <CardProducts deleteProduct={(e)=>{e.preventDefault(); deleteProduct(item.id)}} image={item.photo} tittle={item.name} brand={item.brand} price={item.price} stock={item.stock} />
                                        <button onClick={deleteProduct} className='text-red-500 w-max hover:opacity-60 mx-auto mt-3'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>
                                        </button>
                                </div>
                                ):
                                null}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
        { add === true ? <AddProduct close={()=>setAdd(false)} onSubmit={handleSubmitAddProduct} onChange={handleChangeAddProduct} onChangePhoto={(e)=>setPhoto(e.target.files[0])} name='name' vname={form.name} brand='brand' vbrand={form.brand} price='price' vprice={form.price} condition='condition' vcondition={form.condition} stock='stock' vstock={form.stock} description='description' vdescription={form.description} category='category' vcategory={form.category} photo='photo' />  : null }
        { loading === true ? <Loading /> : null }
    </div>
  )
}

export default Profile