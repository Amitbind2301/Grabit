import React from 'react'
import { Link } from 'react-router-dom'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { valideURLConvert } from '../utils/valideURLConvert'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import AddToCartButton from './AddToCartButton'

const CardProduct = ({ data }) => {
  const url = `/product/${valideURLConvert(data.name)}-${data._id}`

  return (
    <Link
      to={url}
      className='relative border bg-white rounded-xl p-3 flex flex-col gap-2 w-[180px] h-full hover:shadow-lg shadow-black/40 transition'
    >
      {/* Discount badge */}
      {Boolean(data.discount) && (
        <span className='absolute top-2 left-2 bg-green-600 text-white text-[11px] font-semibold px-2 py-[2px] rounded'>
          {data.discount}% OFF
        </span>
      )}

      {/* Delivery time */}
      <span className='absolute top-2 right-2 bg-green-50 text-green-700 text-[11px] px-2 py-[2px] rounded'>
        10 min
      </span>

      {/* Image */}
      <div className='h-[120px] flex items-center justify-center mt-4'>
        <img
          src={data.image?.[0]}
          alt={data.name}
          className='max-h-full object-contain'
        />
      </div>

      {/* Product name (NOT bold like Blinkit) */}
      <div className='text-sm font-semibold text-gray-900 line-clamp-2 min-h-[36px]'>
        {data.name}
      </div>

      {/* Unit */}
      <div className='text-xs text-gray-500 min-h-[18px]'>
        {data.unit}
      </div>

      {/* Price + Button */}
      <div className='flex items-center justify-between mt-auto'>
        <span className='font-semibold text-sm'>
          {DisplayPriceInRupees(
            pricewithDiscount(data.price, data.discount)
          )}
        </span>

        {data.stock === 0 ? (
          <span className='text-xs text-red-500'>Out of stock</span>
        ) : (
          <AddToCartButton data={data} />
        )}
      </div>
    </Link>
  )
}

export default CardProduct
