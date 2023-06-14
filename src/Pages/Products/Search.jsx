import React, { useEffect, useState } from 'react'
import CardProducts from '../../Components/CardProducts'
import Navbar from '../../Components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../Components/Loading'
import axios from 'axios'

const Search = () => {

    const navigate = useNavigate();
    const {search} = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true)
        const getProduct = async() => {
            try {
                const res = await axios({
                    method: "GET",
                    url: `${process.env.REACT_APP_URL}/product?search=${search}`
                })
                setData(res.data.data);
            } catch (error) {
                
            }
            setLoading(false);
        }
        getProduct();
    }, [search])

  return (
    <div>
        <Navbar />
        <div className="wrapper w-10/12 mx-auto p-10">
            <p id='SemiBold' className='text-3xl'>Search</p>
                <p id='Light' className='mb-10 text-gray-400 text-xl'>Result for {search}</p>
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
            { loading === true ? <Loading /> : null }
    </div>
  )
}

export default Search