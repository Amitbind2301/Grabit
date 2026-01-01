import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import SummaryApi from '../common/SummaryApi'
import CardProduct from './CardProduct'
import CardLoading from './CardLoading'
import { valideURLConvert } from '../utils/valideURLConvert'

const CategoryWiseProductDisplay = ({ id, name }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const subCategoryData = useSelector(
    state => state.product.allSubCategory
  )

  const loadingCardNumber = new Array(6).fill(null)

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: { id }
      })

      if (response.data.success) {
        setData(response.data.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategoryWiseProduct()
  }, [])

  const getRedirectURL = () => {
    const subcategory = subCategoryData.find(sub =>
      sub.category.some(c => c._id === id)
    )

    return `/${valideURLConvert(name)}-${id}/${valideURLConvert(
      subcategory?.name
    )}-${subcategory?._id}`
  }

  return (
    <section className="container mx-auto px-4 my-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
        <Link
          to={getRedirectURL()}
          className="text-green-600 hover:text-green-400 text-sm"
        >
          See All
        </Link>
      </div>

      {/* Product Grid */}
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-6
          gap-3
          md:gap-4
          lg:gap-5
        "
      >
        {loading
          ? loadingCardNumber.map((_, index) => (
              <CardLoading key={index} />
            ))
          : data.map(product => (
              <CardProduct
                key={product._id}
                data={product}
              />
            ))}
      </div>
    </section>
  )
}

export default CategoryWiseProductDisplay
