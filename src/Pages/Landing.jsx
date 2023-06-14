import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Carousel from '../Components/Carousel'
import CardCategory from '../Components/CardCategory'
import CardProducts from '../Components/CardProducts'
import { useNavigate } from 'react-router-dom'
import Filter from '../Components/Filter'
import axios from 'axios'
import Loading from '../Components/Loading'

const Landing = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [filter, setfilter] = useState(false);
    const [data, setData] = useState();
    const [search, setSearch] = useState('');

    useEffect(()=>{
        setLoading(true)
        const getProduct = async() => {
            try {
                const res = await axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_URL}/product`
                })
                setData(res.data.data);
            } catch (error) {
                
            }
            setLoading(false);
        }
        getProduct();
    }, [])

  return (
    <div>
        <Navbar clickFilter={()=>setfilter(true)} search='search' vsearch={search} onSearch={(e)=>setSearch(e.target.value)} clickSearch={()=>navigate(`/${search}`)} />
        <div className="wrapper">
            <Carousel />
            {/* Dekstop */}
            <div className="w-10/12 mx-auto md:block hidden">
                {/* Category */}
                <div className="categories my-20">
                    <p id='SemiBold' className='text-3xl'>Categries</p>
                    <p id='Light' className='mb-10 text-gray-400 text-xl'>What are you current looking for.....</p>
                    <div className="categories grid xl:grid-cols-6 md:grid-cols-4 gap-10">
                        <CardCategory image={"https://res.cloudinary.com/ddpo9zxts/image/upload/v1681342008/Assets%20Blanja/jacket_rz5y3l.jpg"} />
                        <CardCategory image={"https://res.cloudinary.com/ddpo9zxts/image/upload/v1681342007/Assets%20Blanja/pants_qg1qjl.jpg"} />
                        <CardCategory image={"https://res.cloudinary.com/ddpo9zxts/image/upload/v1681342007/Assets%20Blanja/shoes_bc49mx.jpg"} />
                        <CardCategory image={"https://res.cloudinary.com/ddpo9zxts/image/upload/v1681342007/Assets%20Blanja/short_dw8t6d.jpg"} />
                        <CardCategory image={"https://res.cloudinary.com/ddpo9zxts/image/upload/v1681342007/Assets%20Blanja/Shirt_djbbwz.jpg"} />
                        <button className='transition-all duration-500 hover:scale-110 hover:text-gray-500 text-gray-400'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 xl:w-32 xl:h-32 mx-auto">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p id='Medium' className='text-2xl'>More</p>
                            <p id='Medium' className='text-2xl'>Categories.....</p>
                        </button>
                    </div>
                </div>

                {/* Products */}
                <div className="Products mt-20">
                    <p id='SemiBold' className='text-3xl'>New</p>
                    <p id='Light' className='mb-10 text-gray-400 text-xl'>You've never seen it before.....</p>
                    <div className="products categories grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 gap-10">
                        { data ? data.map((item)=>
                            <CardProducts key={item.id} onClick={()=>navigate(`/product-detail/${item.id}`)}
                            image={item.photo} tittle={item.name} brand={item.brand} price={item.price} stock={item.stock}
                            />
                        ) 
                        : null }
                    </div>
                    <div className="pagination flex mt-20 mb-10">
                        <button className='ml-auto mr-10 transition-all duration-300 hover:text-red-500 hover:scale-110'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>
                        <p className='text-xl' id='Medium'>1 / 12</p>
                        <button className='mr-auto ml-10 transition-all duration-300 hover:text-red-500 hover:scale-110'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>

            {/* Mobile */}
            <div className="w-full md:hidden px-5 pb-24">
                <button id='Medium' className='text-lg flex my-5'>
                    <p>Choose Categories</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 my-auto ml-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
                <div className="products">
                    { data ?
                    <div className="grid grid-cols-2 gap-5">
                        { data ? data.map((item)=>
                        <CardProducts key={item.id}
                        image={item.photo}
                        tittle={item.name} brand={item.brand} price={item.price} stock={item.stock} onClick={()=>navigate(`/product-detail/${item.id}`)}
                        />
                        ) : null }
                    </div>
                    :
                    null
                    }
                </div>
                <div className="pagination flex mt-5">
                    <button className='ml-auto mr-10'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <p className='text-md' id='Medium'>1 / 12</p>
                    <button className='mr-auto ml-10'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
            { filter === true ? <Filter onClick1={()=>setfilter(false)} onClick3={()=>setfilter(false)} /> : null }
        </div>
        { loading === true ? <Loading /> : null }
    </div>
  )
}

export default Landing