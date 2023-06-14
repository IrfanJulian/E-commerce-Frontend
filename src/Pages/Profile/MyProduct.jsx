import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import AddProduct from '../../Components/AddProduct';
import Swal from 'sweetalert2';
import Loading from '../../Components/Loading';

const MyProduct = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {email} = useParams();
    const [data, setData] = useState('');
    const [add, setAdd] = useState(false);
    const [photo, setPhoto] = useState([]);
    const [form, setForm] = useState({
        name: '',
        brand: '',
        category: '',
        price: '',
        condition: '',
        stock: '',
        description: ''
    });

    useEffect(()=>{
        const myProduct = async() => {
            try {
                setLoading(true);
                const res = await axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_URL}/product/my-product/${email}`
                })
                setData(res.data.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        myProduct();
    }, [email]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
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
            //   window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
        <Navbar />
            {/* Mobile */}
            <div className="lg:hidden grid pt-5 pb-16 px-5">
                <button onClick={()=>navigate(`/profile/${email}`)} className='flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <div className="wrapper my-10 space-y-5 bg-white">
                    <p id='SemiBold' className='text-2xl mb-10'>My Product</p>
                    { data && data.length >= 1 ?
                    <>
                    { data ? data.map((product)=>
                    <div key={product.id} className="card shadow-lg rounded-lg p-3 grid border">
                        <div className="flex mb-5" id='Light'>
                            <div className="w-4/12">
                                <img src={product.photo} alt="" />
                            </div>
                            <div className="w-8/12 pl-2">
                                <p className='font-semibold text-center mb-3'>{product.name}</p>
                                <p className='text-sm text-right'>{product.brand}</p>
                                <p className='text-sm text-right'>Rp. {product.price}</p>
                            </div>
                        </div>
                        <div className="flex mb-3">
                            <p className='font-semibold' id='Light'>Stock :</p>
                            <p className='my-auto ml-1' id='SemiBold'>{product.stock}</p>
                        </div>
                        <p className='font-semibold' id='Light'>Product Description</p>
                        <div className="wrapper overflow-auto h-[3.5rem]">
                            <p className='text-sm' id='Light'>{product.description}</p>
                        </div>
                        <button onClick={(e)=>{e.preventDefault(); deleteProduct(product.id)}} className='ml-auto w-max mt-7 text-red-500' id='Medium'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                    </div>
                    ): null}
                    </>
                    :
                    <p className={`text-center text-lg`} id='Medium'>Nothing product to show. Upload your firts product to selling in this app.</p>
                    }
                </div>
                <button onClick={()=>setAdd(true)} className='my-5 py-2 w-full rounded-full bg-red-500 text-white text-lg' id='Medium'>Add Product</button>
            </div>
            { add === true ? 
            <AddProduct close={()=>setAdd(false)} onSubmit={handleSubmit} onChange={handleChange} onChangePhoto={(e)=>setPhoto(e.target.files[0])} name='name' vname={form.name} brand='brand' vbrand={form.brand} price='price' vprice={form.price} condition='condition' vcondition={form.condition} stock='stock' vstock={form.stock} description='description' vdescription={form.description} category='category' vcategory={form.category} photo='photo' /> 
            : 
            null }
            { loading === true ? <Loading /> : null }
    </div>
  )
}

export default MyProduct