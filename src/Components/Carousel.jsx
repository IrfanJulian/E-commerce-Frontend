import React, { useEffect, useState } from 'react'

const Carousel = ({ className }) => {

    const [image, setImage] = useState(1)

    const next = () => {
        if(image >= 4){
            setImage(1)
        }else{
            setImage((current)=>current + 1)
        }
    }

    const previous = () => {
        if(image <= 1){
            setImage(4)
        }else{
            setImage((current)=>current - 1)
        }
    }

    useEffect(()=>{
        setTimeout(() => {
            next()
        }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image])


  return (
    <div className={className}>
        <div className="lg:w-3/4 lg:mt-10 mt-0 mx-auto">
            <div className="block lg:flex lg:space-x-5">
                <button onClick={previous} className='w-1/12 hidden lg:block'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 lg:w-10 lg:h-10 lg:ml-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <div className="wrapperimg w-full lg:w-10/12">
                    { image === 1 ?
                    <img src={'https://res.cloudinary.com/ddpo9zxts/image/upload/v1681337692/Assets%20Blanja/fashion_muslim_kxjwgt.jpg'} alt="" className='w-full' />
                    : image === 2 ?
                    <img src={'https://res.cloudinary.com/ddpo9zxts/image/upload/v1681337692/Assets%20Blanja/alat_musik_wp6juf.jpg'} alt="" className='w-full' />
                    : image === 3 ?
                    <img src={'https://res.cloudinary.com/ddpo9zxts/image/upload/v1681337692/Assets%20Blanja/trend_fashion_yfoxky.jpg'} alt="" className='w-full' />
                    :
                    <img src={'https://res.cloudinary.com/ddpo9zxts/image/upload/v1681337692/Assets%20Blanja/electronics_ygnher.jpg'} alt="" className='w-full' />
                    }
                </div>
                <button onClick={next} className='w-1/12 hidden lg:block'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 lg:w-10 lg:h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Carousel