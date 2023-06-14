import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ clickFilter, serch, search, vsearch, onSearch, clickSearch  }) => {

    const email = localStorage.getItem('email');
    const navigate = useNavigate();
    const [isLogin, setIslogin] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(()=>{
        token && token.length >= 1 ? setIslogin(true) : setIslogin(false);
    }, [token])

  return (
    <div id='Medium' className='shadow-lg'>

        {/* Dekstop */}
        <div className="md:w-full md:pl-7 lg:w-10/12 mx-auto md:flex py-5 hidden">
            <div onClick={()=>navigate('/')} className="w-3/12 cursor-pointer hover:opacity-70">
                <img src={"https://res.cloudinary.com/ddpo9zxts/image/upload/v1681319165/Assets%20Blanja/Group_1158_zurdcn.png"} alt="" />
            </div>
            <div className="w-6/12 flex">
                <input name={search} value={vsearch} onChange={onSearch} type="text" placeholder='Search......' className='border-t-2 border-b-2 border-l-2 rounded-l-full border-gray-300 md:py-1 lg:py-2 px-7 w-10/12 my-auto outline-none' />
                <button onClick={clickSearch} className='border-t-2 border-b-2 border-r-2 rounded-r-full border-gray-300 pr-4 text-gray-400 h-max md:py-1 lg:py-2 my-auto'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
                <button  onClick={clickFilter} className='rounded-xl border-2 border-gray-300 text-gray-400 h-max md:p-1 lg:p-2 hover:text-white hover:bg-red-500 my-auto md:ml-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                    </svg>
                </button>
            </div>
            {isLogin === false ? 
            <div className="w-4/12 flex">
                <button onClick={()=>navigate('/auth-login')} className='rounded-xl text-gray-400 h-max p-2 hover:text-red-500 my-auto ml-auto mx-auto'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                </button>
                <div className="flex w-3/4" id='Light'>
                    <button onClick={()=>navigate('/auth-login')} className='mx-2 border-2 rounded-full w-full py-2 text-gray-500 h-max my-auto hover:text-white hover:bg-red-500 hover:font-semibold'>Login</button>
                    <button onClick={()=>navigate('/auth-register')} className='mx-2 border-2 rounded-full w-full py-2 text-gray-500 h-max my-auto hover:text-white hover:bg-red-500 hover:font-semibold'>Register</button>
                </div>
            </div>
            :
            <div className="w-4/12 flex">
                <div className="wrapper w-8/12 mx-auto flex">
                    <button onClick={()=>navigate(`/my-bag/${email}`)} className='rounded-xl text-gray-400 h-max p-2 hover:text-red-500 my-auto ml-auto mx-auto'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </button>
                    <button className='rounded-xl text-gray-400 h-max p-2 hover:text-red-500 my-auto ml-auto mx-auto'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                        </svg>
                    </button>
                    <button className='rounded-xl text-gray-400 h-max p-2 hover:text-red-500 my-auto ml-auto mx-auto'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                    </button>
                    <button onClick={()=>navigate(`/profile/${email}`)} className='rounded-xl text-gray-400 h-max p-2 hover:text-red-500 my-auto ml-auto mx-auto'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </button>
                </div>
            </div>
            }
        </div>

        {/* Mobile */}
        <div className="w-full bg-white py-5 border-t fixed bottom-0 left-0 md:hidden">
            { isLogin === true ?
                <div className="flex">
                    <button onClick={()=>navigate('/')} className='text-gray-500 mx-auto active:text-red-500 focus:text-red-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </button>
                    <button className='text-gray-500 mx-auto active:text-red-500 focus:text-red-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </button>
                    <button onClick={()=>navigate(`/my-bag/${email}`)} className='text-gray-500 mx-auto active:text-red-500 focus:text-red-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                    </button>
                    <button className='text-gray-500 mx-auto active:text-red-500 focus:text-red-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                    </button>
                    <button onClick={()=>navigate(`/profile/${email}`)} className='text-gray-500 mx-auto active:text-red-500 focus:text-red-500'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </button>
                </div>
            :
                <div className="flex">
                    <button onClick={()=>navigate('/auth-login')} className='mx-2 border-2 rounded-full w-1/2 py-1 text-gray-500 h-max my-auto'>Login</button>
                    <button onClick={()=>navigate('/auth-register')} className='mx-2 border-2 rounded-full w-1/2 py-1 text-gray-500 h-max my-auto'>Register</button>
                </div>
            }
        </div>

    </div>
  )
}

export default Navbar