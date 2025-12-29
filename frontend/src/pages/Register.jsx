import React, { useState } from 'react'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const REGISTRATION_ENABLED = false; // 🔒 CHANGE TO true TO ENABLE AGAIN

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

        // 🔒 BLOCK REGISTRATION FROM UI
        if (!REGISTRATION_ENABLED) {
            toast.error("Registration is currently closed")
            return
        }
    }

    return (
        <section className='w-full container mx-auto px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
                <p className='text-lg font-semibold'>Welcome to Grabit</p>

                {!REGISTRATION_ENABLED && (
                    <p className="bg-red-100 text-red-700 p-3 rounded mt-4">
                        🚫 Registration is closed. This is a personal project.
                    </p>
                )}

                <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>
                    
                    <input disabled className='bg-gray-200 p-2 rounded' placeholder='Name disabled' />
                    <input disabled className='bg-gray-200 p-2 rounded' placeholder='Email disabled' />
                    <input disabled className='bg-gray-200 p-2 rounded' placeholder='Password disabled' />
                    <input disabled className='bg-gray-200 p-2 rounded' placeholder='Confirm Password disabled' />

                    <button
                        disabled
                        className="bg-gray-500 text-white py-2 rounded font-semibold my-3 tracking-wide cursor-not-allowed"
                    >
                        Registration Closed
                    </button>
                </form>

                <p>
                    Already have account ?{" "}
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
