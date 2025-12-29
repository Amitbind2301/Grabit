import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { Link, useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from '../components/Loading'
import CardProduct from '../components/CardProduct'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'

const ProductListPage = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const params = useParams()
  const AllSubCategory = useSelector(state => state.product.allSubCategory)
  const [DisplaySubCatory, setDisplaySubCategory] = useState([])

  const subCategory = params?.subCategory?.split("-")
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(" ")
  const categoryId = params.category.split("-").slice(-1)[0]
  const subCategoryId = params.subCategory.split("-").slice(-1)[0]

  const fetchProductdata = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId,
          subCategoryId,
          page,
          limit: 12, // Blinkit-style grid
        }
      })

      const { data: responseData } = response
      if (responseData.success) {
        if (page === 1) {
          setData(responseData.data)
        } else {
          setData(prev => [...prev, ...responseData.data])
        }
        setTotalPage(responseData.totalCount)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductdata()
  }, [params, page])

  useEffect(() => {
    const sub = AllSubCategory.filter(s => {
      return s.category.some(el => el._id === categoryId)
    })
    setDisplaySubCategory(sub)
  }, [params, AllSubCategory])

  return (
    <section className='bg-gray-50 min-h-screen pt-4'>
      <div className='container mx-auto px-4 lg:px-8 grid grid-cols-[200px,1fr] gap-4'>

        {/* Subcategories */}
        <div className='bg-white shadow rounded p-2 sticky top-20 h-[80vh] overflow-y-auto scrollbarCustom'>
          {DisplaySubCatory.map((s, index) => {
            const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`
            return (
              <Link
                to={link}
                key={s._id + index}
                className={`flex items-center gap-3 p-2 mb-2 rounded hover:bg-green-100 transition 
                  ${subCategoryId === s._id ? "bg-green-100" : ""}`}
              >
                <img
                  src={s.image}
                  alt={s.name}
                  className='w-12 h-12 object-contain rounded'
                />
                <p className='text-sm font-medium'>{s.name}</p>
              </Link>
            )
          })}
        </div>

        {/* Products */}
        <div className='flex flex-col'>
          <div className='bg-white shadow-md p-4 rounded mb-4 sticky top-20 z-10'>
            <h3 className='text-lg font-semibold'>{subCategoryName}</h3>
          </div>

          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
            {data.map((p, index) => (
              <CardProduct data={p} key={p._id + index} />
            ))}
          </div>

          {loading && (
            <div className='mt-4'>
              <Loading />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProductListPage
