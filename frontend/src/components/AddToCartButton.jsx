import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from './Loading'
import { useSelector } from 'react-redux'
import { FaMinus, FaPlus } from "react-icons/fa6";

const AddToCartButton = ({ data }) => {
  const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext()
  const cartItem = useSelector(state => state.cartItem.cart)

  const [loading, setLoading] = useState(false)
  const [isAvailableCart, setIsAvailableCart] = useState(false)
  const [qty, setQty] = useState(0)
  const [cartItemDetails, setCartItemDetails] = useState(null)

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.addTocart,
        data: { productId: data._id }
      })

      if (response.data.success) {
        toast.success(response.data.message)
        fetchCartItem && fetchCartItem()
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const product = cartItem.find(item => item.productId._id === data._id)
    setIsAvailableCart(Boolean(product))
    setQty(product?.quantity || 0)
    setCartItemDetails(product || null)
  }, [cartItem, data])

  const increaseQty = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    await updateCartItem(cartItemDetails._id, qty + 1)
  }

  const decreaseQty = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (qty === 1) {
      deleteCartItem(cartItemDetails._id)
    } else {
      await updateCartItem(cartItemDetails._id, qty - 1)
    }
  }

  return (
    <>
      {isAvailableCart ? (
        <div className='flex items-center border border-green-600 rounded-full h-7'>
          <button
            onClick={decreaseQty}
            className='px-2 text-green-600 hover:bg-green-50'
          >
            <FaMinus size={11} />
          </button>

          <span className='px-3 text-xs font-semibold'>
            {qty}
          </span>

          <button
            onClick={increaseQty}
            className='px-2 text-green-600 hover:bg-green-50'
          >
            <FaPlus size={11} />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className='border border-green-600 text-green-600 text-xs font-semibold px-4 py-[3px] rounded-full hover:bg-green-600 hover:text-white transition'
        >
          {loading ? <Loading /> : 'Add'}
        </button>
      )}
    </>
  )
}

export default AddToCartButton
