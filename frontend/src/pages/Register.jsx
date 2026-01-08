import React, { useState } from 'react'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!data.name || !data.email || !data.password || !data.confirmPassword) {
            return toast.error("All fields are required")
        }

        if (data.password !== data.confirmPassword) {
            return toast.error("Passwords do not match")
        }

        // TODO: add API call here
        toast.success("Registration Successful")
        navigate("/login")
    }

    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p className='text-lg font-semibold'>Welcome to Grabit</p>

                <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
                    
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={data.name}
                        onChange={handleChange}
                        className='p-2 rounded border'
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={data.email}
                        onChange={handleChange}
                        className='p-2 rounded border'
                    />

                    <div className='relative'>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={handleChange}
                            className='p-2 rounded border w-full'
                        />
                        <span
                            onClick={() => setShowPassword(prev => !prev)}
                            className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer'
                        >
                            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </span>
                    </div>

                    <div className='relative'>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={data.confirmPassword}
                            onChange={handleChange}
                            className='p-2 rounded border w-full'
                        />
                        <span
                            onClick={() => setShowConfirmPassword(prev => !prev)}
                            className='absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer'
                        >
                            {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold tracking-wide my-3"
                    >
                        Register
                    </button>
                </form>

                <p>
                    Already have account?{" "}
                    <Link
                        to={"/login"}
                        className='font-semibold text-green-700 hover:text-green-800'
                    >
                        Login
                    </Link>
                </p>
            </div>
        </section>
    )
}

export default Register
