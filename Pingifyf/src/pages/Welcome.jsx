import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
    return (
        <>
            <div className='bg-[#dcfcb4] w-full min-h-screen flex justify-center items-center relative'>

                <div className='w-45 h-45'>
                    <img
                        className="w-full h-full object-cover"
                        src="assets/Pingify_logo.png"
                        alt=""
                    />
                </div>

                {/* Bottom Button */}
                <div className='absolute bottom-8 w-full px-5'>
                    <Link
                        to="/login"
                        className='bg-black text-white w-full py-3 px-5 rounded-xl flex justify-between items-center gap-2 text-lg font-medium'
                    >
                        Get Started
                        <i className="ri-arrow-right-line text-2xl"></i>
                    </Link>
                </div>

            </div>
        </>
    )
}

export default Welcome