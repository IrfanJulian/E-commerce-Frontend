import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Loading from '../../Components/Loading';
import Swal from 'sweetalert2';

const Settings = () => {

    const {email} = useParams();
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [showPass2, setShowPass2] = useState(false);
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [change, setChange] = useState(false);
    const [data, setData] = useState();
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState([]);
    
    const [form, setForm] = useState({
        name: "",
        birth: ""
    });

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
    }, [])

    const handleChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        })
      };

    const changePass = async(e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios({
                method: "PUT",
                url: `${process.env.REACT_APP_URL}/user/change-password/${email}`,
                data: {
                    password: password
                }
            })
            setLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your password has been changed'
              })
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

    const updatePhoto = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('photo', photo, photo.name)
        Swal.fire({
            title: 'Are you sure want to change photo?',
            text: "Your photo will be change.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then(async(result) => {
            if (result.isConfirmed) {
                setLoading(true);
                await axios({
                    method: "PUT",
                    url: `${process.env.REACT_APP_URL}/user/change-photo/${email}`,
                    data: formData
                })
                setLoading(false);
                Swal.fire(
                    'Success!',
                    'Your photo has been changed.',
                    'success'
                    )
                window.location.reload();
            }
          }).catch(() => {
            setLoading(false);
                Swal.fire(
                    'Error!',
                    'Something went wrong.',
                    'error'
                    )
          })

    }

    const handleSubmit = async(e) => {
        setLoading(true);
        try {
            await axios({
                method: "PUT",
                url: `${process.env.REACT_APP_URL}/user/change-information/${email}`,
                data: {
                    name: form.name,
                    birth: form.birth
                }
            })
            setLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your profile updated'
              })
            //   window.location.reload();
              setForm("");
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
            <div className="lg:hidden grid pt-5 pb-10 px-5">
                <button onClick={()=>navigate(`/profile/${email}`)} className='flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <div className="wrapper my-5">
                    <p id='SemiBold' className='text-2xl mb-10'>Settings</p>
                    <div className="grid my-10">
                        <img src={ data && data.photo.length !== 0 ? data.photo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ189QpiU5NaQAJ72Rd6odT5BdjqmzRzDqAwwDgAVRqko4ha9thmsXoluYhLSkPbBLZN94&usqp=CAU" } className='w-32 mx-auto rounded-full' alt="" />
                        <label htmlFor="img" className='mt-4 text-md text-center' id='Medium'>
                            <p>Choose Picture</p>
                        </label>
                        <button id='Medium' onClick={updatePhoto} className='py-1 px-5 bg-red-500 text-white w-max mx-auto rounded-full mt-5'>Save change</button>
                        <input type="file" name='photo' id='img' onChange={(e)=>setPhoto(e.target.files[0])} className='hidden' />
                    </div>
                    <div className="Personal grid">
                        <p id='Medium' className='text-xl mb-5'>Personal Information</p>
                        <button onClick={()=>edit === false ? setEdit(true) : setEdit(false)} id='Medium' className='w-max ml-auto text-red-500 flex'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                            <p className='ml-2'>{edit === false ? "Edit" : "Cancel"}</p>
                        </button>
                        <p id='Light'>Fullname</p>
                        <input name='name' value={form.name} onChange={handleChange} type="text" className={`border rounded-lg py-2 px-5 w-full ${edit === false ? "hidden" : "block"}`} placeholder='Fullname' id='Light' />
                        <div id='Light' className={`border rounded-lg py-2 px-5 w-full ${edit === true ? "hidden" : "block"}`}>
                            <p>{ data ? data.name : null }</p>
                        </div>
                        <p id='Light' className='mt-5'>Date of birth</p>
                        <input name='birth' value={form.birth} onChange={handleChange} type="date" className={`border rounded-lg py-2 px-5 w-full ${edit === false ? "hidden" : "block"}`} placeholder='Date of birth' id='Light' />
                        <div id='Light' className={`border rounded-lg py-2 px-5 w-full ${edit === true ? "hidden" : "block"}`}>
                            <p>{ data ? data.birth.length < 1 ? "Set date of birth" : data.birth : null }</p>
                        </div>
                    </div>
                    <button onClick={()=>setChange(true)} id='Medium' className='text-red-500 flex text-kg w-max mx-auto my-10'>Change Password</button>
                    { change === true ?
                            <div className="fixed left-0 bottom-[68px] w-screen bg-white p-4 border-2 rounded-tl-xl rounded-tr-xl">
                                <button onClick={()=>setChange(false)} className='absolute top-3 right-3'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <p id='Light' className='mt-5'>Password</p>
                                <div className="flex mb-5" id='Light'>
                                    <input name='password' value={password} onChange={(e)=>setPassword(e.target.value)} type={showPass === false ? "password" : "text"} className='w-10/12 border-l-2 border-t-2 border-b-2 rounded-tl-md rounded-bl-md py-2 pl-4 outline-none' placeholder='Insert your password' />
                                    <button type='button' onClick={()=>showPass === false ? setShowPass(true) : setShowPass(false)} className='align-center border-r-2 border-t-2 border-b-2 px-4 rounded-tr-md rounded-br-md'>{ showPass === false ? "Show" : "Hide" }</button>
                                </div>
                                <p id='Light'>Confirmation Password</p>
                                <p id='Light' className={`text-sm text-red-500 mb-1 ${password2 && password2.length >= 1 && password.length >= 1 && password !== password2 ? "block" : "hidden"}`}>Password doen't match!!</p>
                                <div className="flex" id='Light'>
                                    <input name='password2' onChange={(e)=>setPassword2(e.target.value)} type={showPass2 === false ? "password" : "text"} className='w-10/12 border-l-2 border-t-2 border-b-2 rounded-tl-md rounded-bl-md py-2 pl-4 outline-none' placeholder='Insert your password' />
                                    <button type='button' onClick={()=>showPass2 === false ? setShowPass2(true) : setShowPass2(false)} className='align-center border-r-2 border-t-2 border-b-2 px-4 rounded-tr-md rounded-br-md'>{ showPass2 === false ? "Show" : "Hide" }</button>
                                </div>
                                <button onClick={changePass} id='SemiBold' className='rounded-full py-2 text-white bg-red-500 w-full mt-5'>Save</button>
                            </div>
                    :
                    null }

                </div>
                <button onClick={handleSubmit} className='py-2 bg-red-500 rounded-full text-white w-full mb-2' id='Medium'>Save</button>
                <button onClick={()=>{localStorage.clear(); navigate('/auth-login')}} className='mb-10 py-2 text- text-red-500 border-2 border-red-500 rounded-full w-full' id='Medium'>Logout</button>
            </div>
            { loading === true ? <Loading /> : null }
    </div>
  )
}

export default Settings