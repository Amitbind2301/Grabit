import React from 'react'
import banner from '../assets/banner.jpg'
import bannerMobile from '../assets/banner-mobile.jpg'

import pharmacyBanner from '../assets/pharmacy.avif'
import petBanner from '../assets/pet.avif'
import babyBanner from '../assets/baby.avif'

import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import { useNavigate } from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find(sub =>
      sub.category.some(c => c._id === id)
    )

    if (!subcategory) return

    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(
      subcategory.name
    )}-${subcategory._id}`

    navigate(url)
  }

  return (
    <section className="bg-white">

      {/* ================= MAIN HERO BANNER ================= */}
      <div className="container mx-auto">
        <div className="w-full min-h-48 rounded overflow-hidden">
          <img
            src={banner}
            alt="banner"
            className="w-full hidden lg:block"
          />
          <img
            src={bannerMobile}
            alt="banner mobile"
            className="w-full lg:hidden"
          />
        </div>
      </div>

      {/* ================= BLINKIT STYLE IMAGE ONLY (PC ONLY) ================= */}
      <div className="container mx-auto px-4 my-6 hidden lg:grid grid-cols-3 gap-4">

        <div
          onClick={() => navigate('/pharmacy')}
          className="cursor-pointer rounded-2xl overflow-hidden h-[180px]"
        >
          <img
            src={pharmacyBanner}
            alt="pharmacy"
            className="w-full h-full object-cover"
          />
        </div>

        <div
          onClick={() => navigate('/pet-care')}
          className="cursor-pointer rounded-2xl overflow-hidden h-[180px]"
        >
          <img
            src={petBanner}
            alt="pet care"
            className="w-full h-full object-cover"
          />
        </div>

        <div
          onClick={() => navigate('/baby-care')}
          className="cursor-pointer rounded-2xl overflow-hidden h-[180px]"
        >
          <img
            src={babyBanner}
            alt="baby care"
            className="w-full h-full object-cover"
          />
        </div>

      </div>

      {/* ================= CATEGORY GRID ================= */}
      <div className="container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {loadingCategory
          ? new Array(12).fill(null).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse"
              >
                <div className="bg-blue-100 min-h-24 rounded"></div>
                <div className="bg-blue-100 h-8 rounded"></div>
              </div>
            ))
          : categoryData.map(cat => (
              <div
                key={cat._id}
                className="cursor-pointer"
                onClick={() =>
                  handleRedirectProductListpage(cat._id, cat.name)
                }
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-scale-down"
                />
              </div>
            ))}
      </div>

      {/* ================= CATEGORY WISE PRODUCTS ================= */}
      {categoryData?.map(c => (
        <CategoryWiseProductDisplay
          key={c?._id}
          id={c?._id}
          name={c?.name}
        />
      ))}

    </section>
  )
}

export default Home
