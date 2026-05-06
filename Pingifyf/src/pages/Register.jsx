import { React, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
// import { useContext } from 'react'
import { Context } from '../context/Context'

const Register = () => {
    const navigate = useNavigate()
    const { showpass, setshowpass, setuserdata } = useContext(Context)
    const [registeredData, setRegisteredData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setRegisteredData({
            ...registeredData,
            [name]: value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/user/register",
                registeredData,
                { withCredentials: true }
            );
            if (response.data.success) {
                setuserdata(response.data.newuser);
                navigate('/dash');
            }

            console.log("Registration successful:", response.data);

        } catch (error) {
            if (error.response) {
                alert(error.response.data.msg);
            }
        }
    }

    return (
        <div className="min-h-screen flex justify-center bg-[#dcfcb4] px-4">

            <div className=" w-full max-w-sm sm:max-w-md p-4 sm:p-12 rounded-2xl">

                {/* Logo */}
                <div className=" m-auto w-35 h-35 flex justify-center mb-8">
                    <img
                        src="assets/Pingify_logo.png"
                        alt="Pingify Logo"
                        className="w-full h-full object-cover"
                    />
                </div>

                <form className="w-full space-y-4" onSubmit={handleSubmit}>

                    {/* Name */}
                    <div className="w-full">
                        <label className="block mb-1 text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={registeredData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#7cca29]"
                        />
                    </div>

                    {/* Email */}
                    <div className="w-full ">
                        <label className="block mb-1 text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={registeredData.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            required

                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#7cca29]"
                        />
                    </div>

                    {/* Password */}
                    <div className="w-full">
                        <label className="block mb-1 text-gray-700 ">
                            Password
                        </label>
                        <div className=' px-4 py-3 flex border rounded-lg border-gray-300 '>
                            <input
                                type={showpass ? "text" : "password"}
                                name="password"
                                value={registeredData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                                minLength={5}
                                className="w-full flex-1 border-none outline-none "
                            />
                            <button className='text-zinc-700 ' type="button" onClick={() => setshowpass(!showpass)}>
                                {showpass ? (<i class="ri-eye-line"></i>) : (<i class="ri-eye-off-line"></i>)}
                            </button>
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#7cca29] text-white py-3 rounded-lg font-semibold active:scale-95 transition"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-5">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#7cca29] font-medium">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register