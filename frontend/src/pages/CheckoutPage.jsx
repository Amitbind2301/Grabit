import React, { useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import AddAddress from '../components/AddAddress'
import { useSelector } from 'react-redux'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'

const CheckoutPage = () => {
  const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem, fetchOrder } = useGlobalContext()
  const [openAddress, setOpenAddress] = useState(false)
  const addressList = useSelector(state => state.addresses.addressList)
  const [selectAddress, setSelectAddress] = useState(0)
  const cartItemsList = useSelector(state => state.cartItem.cart)
  const navigate = useNavigate()

  const handleCashOnDelivery = async () => {
    const toastId = toast.loading("Placing order...")
    try {
      const response = await Axios({
        ...SummaryApi.CashOnDeliveryOrder,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        }
      })

      const { data: responseData } = response

      toast.dismiss(toastId)

      if (responseData.success) {
        toast.success(responseData.message)
        fetchCartItem?.()
        fetchOrder?.()
        navigate('/success', {
          state: { text: "Order" }
        })
      }
    } catch (error) {
      toast.dismiss(toastId)
      AxiosToastError(error)
    }
  }

 const handleOnlinePayment = async () => {
  const toastId = toast.loading("Redirecting to payment...")

  try {
    const response = await Axios({
      ...SummaryApi.payment_url,
      data: {
        list_items: cartItemsList,
        addressId: addressList[selectAddress]?._id,
        subTotalAmt: totalPrice,
        totalAmt: totalPrice,
      }
    })

    const { data: responseData } = response

    if (!responseData?.url) {
      toast.dismiss(toastId)
      toast.error("Stripe checkout URL not received")
      return
    }

    toast.dismiss(toastId)

    // 🔥 THIS LINE FIXES EVERYTHING
    window.location.href = responseData.url

  } catch (error) {
    toast.dismiss(toastId)
    AxiosToastError(error)
  }
}



  return (
    <section className='bg-blue-50'>
      <div className='container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between'>
        
        <div className='w-full'>
          <h3 className='text-lg font-semibold'>Choose your address</h3>
          <div className='bg-white p-2 grid gap-4'>
            {
              addressList.map((address, index) => (
                <label key={index} htmlFor={"address" + index} className={!address.status && "hidden"}>
                  <div className='border rounded p-3 flex gap-3 hover:bg-blue-50'>
                    <input
                      id={"address" + index}
                      type='radio'
                      value={index}
                      onChange={(e) => setSelectAddress(e.target.value)}
                      name='address'
                    />
                    <div>
                      <p>{address.address_line}</p>
                      <p>{address.city}</p>
                      <p>{address.state}</p>
                      <p>{address.country} - {address.pincode}</p>
                      <p>{address.mobile}</p>
                    </div>
                  </div>
                </label>
              ))
            }

            <div
              onClick={() => setOpenAddress(true)}
              className='h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer'
            >
              Add address
            </div>
          </div>
        </div>

        <div className='w-full max-w-md bg-white py-4 px-2'>
          <h3 className='text-lg font-semibold'>Summary</h3>

          <div className='bg-white p-4'>
            <h3 className='font-semibold'>Bill details</h3>

            <div className='flex justify-between ml-1'>
              <p>Items total</p>
              <p>
                <span className='line-through text-neutral-400'>
                  {DisplayPriceInRupees(notDiscountTotalPrice)}
                </span>{" "}
                {DisplayPriceInRupees(totalPrice)}
              </p>
            </div>

            <div className='flex justify-between ml-1'>
              <p>Quntity total</p>
              <p>{totalQty} item</p>
            </div>

            <div className='flex justify-between ml-1'>
              <p>Delivery Charge</p>
              <p>Free</p>
            </div>

            <div className='font-semibold flex justify-between'>
              <p>Grand total</p>
              <p>{DisplayPriceInRupees(totalPrice)}</p>
            </div>
          </div>

          <div className='w-full flex flex-col gap-4'>
            <button
              className='py-2 px-4 bg-green-600 hover:bg-green-700 rounded text-white font-semibold'
              onClick={handleOnlinePayment}
            >
              Online Payment
            </button>

            <button
              className='py-2 px-4 border-2 border-green-600 font-semibold text-green-600 hover:bg-green-600 hover:text-white'
              onClick={handleCashOnDelivery}
            >
              Cash on Delivery
            </button>
          </div>
        </div>
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
    </section>
  )
}

export default CheckoutPage
