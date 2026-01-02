import React, { useEffect, useState } from "react"
import Axios from "../utils/Axios"
import SummaryApi from "../common/SummaryApi"
import { Link, useParams } from "react-router-dom"
import AxiosToastError from "../utils/AxiosToastError"
import Loading from "../components/Loading"
import CardProduct from "../components/CardProduct"
import { useSelector } from "react-redux"
import { valideURLConvert } from "../utils/valideURLConvert"

const ProductListPage = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const params = useParams()
  const AllSubCategory = useSelector(state => state.product.allSubCategory)
  const [displaySubCategory, setDisplaySubCategory] = useState([])

  const subCategory = params.subCategory.split("-")
  const subCategoryName = subCategory.slice(0, -1).join(" ")
  const categoryId = params.category.split("-").slice(-1)[0]
  const subCategoryId = params.subCategory.split("-").slice(-1)[0]

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId,
          subCategoryId,
          page,
          limit: 20,
        },
      })

      if (res.data.success) {
        setData(page === 1 ? res.data.data : [...data, ...res.data.data])
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setPage(1)
    fetchProducts()
  }, [params])

  useEffect(() => {
    const sub = AllSubCategory.filter(s =>
      s.category.some(c => c._id === categoryId)
    )
    setDisplaySubCategory(sub)
  }, [AllSubCategory, params])

  return (
    <section className="bg-gray-50 min-h-screen">
      <div
        className="
          max-w-[1400px] mx-auto px-2 sm:px-4 pt-3
          grid grid-cols-[72px_1fr] lg:grid-cols-[180px_1fr] gap-3
        "
      >
        {/* LEFT SIDEBAR */}
        <aside className="bg-white rounded-md border sticky top-20 h-[85vh] overflow-y-auto">
          {displaySubCategory.map(s => {
            const link = `/${valideURLConvert(
              s.category[0].name
            )}-${s.category[0]._id}/${valideURLConvert(s.name)}-${s._id}`

            return (
              <Link
                to={link}
                key={s._id}
                className={`
                  flex flex-col lg:flex-row items-center gap-1 lg:gap-2
                  px-2 py-3 border-b hover:bg-green-50
                  ${
                    subCategoryId === s._id
                      ? "bg-green-50 border-l-4 border-green-500"
                      : ""
                  }
                `}
              >
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-10 h-10 object-contain"
                />
                <span className="text-[11px] lg:text-sm font-medium text-center lg:text-left">
                  {s.name}
                </span>
              </Link>
            )
          })}
        </aside>

        {/* RIGHT CONTENT */}
        <main>
          {/* TITLE */}
          <div className="bg-white sticky top-20 z-10 border-b px-2 py-2 mb-3">
            <h2 className="text-base sm:text-lg font-semibold capitalize">
              Buy {subCategoryName} Online
            </h2>
          </div>

          {/* PRODUCTS */}
          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
              gap-2 sm:gap-3
            "
          >
            {data.map(product => (
              <CardProduct key={product._id} data={product} />
            ))}
          </div>

          {loading && (
            <div className="flex justify-center py-6">
              <Loading />
            </div>
          )}
        </main>
      </div>
    </section>
  )
}

export default ProductListPage
