import React from 'react'

const Loading = () => {
  return (
    <div className='fixed top-0 left-0 h-screen w-screen'>
        <div className="bg-black opacity-50 w-screen h-screen"></div>
        <div className="absolute top-0 left-0 h-screen w-screen grid">
            <div className="bg-white p-3 w-3/4 lg:w-1/4 m-auto grid rounded-lg">
                <img src={"https://ouch-cdn2.icons8.com/Ep3wqAGDcJfzF59x1ps9LfP9fktFOl9038-prbdGG8M/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNTI4/L2U1Y2U1ODZhLTFj/MmQtNDQ3NC1hYTA3/LWIyYmU1MzY4ZDc5/OS5zdmc.png"} className='w-14 mx-auto animate-spin' alt="" />
                <p className='lg:text-xl text-center mt-5' id='Medium'>Loading....</p>
            </div>
        </div>
    </div>
  )
}

export default Loading