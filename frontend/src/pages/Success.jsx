import React, { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import toast from "react-hot-toast"
import { useGlobalContext } from "../provider/GlobalProvider"

const SuccessPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { fetchCartItem, fetchOrder } = useGlobalContext()

  useEffect(() => {
    fetchCartItem?.()
    fetchOrder?.()

    toast.success("Payment successful 🎉")

    const timer = setTimeout(() => {
      //navigate("/orders")
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      <h1 className="text-2xl font-bold text-green-700">Payment Successful 🎉</h1>
      <p className="mt-2 text-gray-600">Your order has been placed successfully.</p>
      <p className="text-sm text-gray-400 mt-1">Redirecting to myorders...</p>
    </div>
  )
}

export default SuccessPage
