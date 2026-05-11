import React from 'react'

const Loading = () => {
    return (
        <>
            <div className='bg-[#dcfcb4] w-full min-h-screen flex flex-col justify-center items-center'>

                <div className='w-44 h-44'>
                    <img
                        className="w-full h-full object-cover"
                        src="assets/Pingify_logo.png"
                        alt=""
                    />
                </div>

                <div className='w-18 h-18 -mt-10'>
                    <img
                        className='w-full h-full object-contain'
                        src="../assets/dotsLoading.gif"
                        alt=""
                    />
                </div>

            </div>
        </>
    )
}

export default Loading