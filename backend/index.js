import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/connectDB.js'

import userRouter from './route/user.route.js'
import categoryRouter from './route/category.route.js'
import uploadRouter from './route/upload.router.js'
import subCategoryRouter from './route/subCategory.route.js'
import productRouter from './route/product.route.js'
import cartRouter from './route/cart.route.js'
import addressRouter from './route/address.route.js'
import orderRouter from './route/order.route.js'

const app = express()
const PORT = process.env.PORT || 8080

/* =====================
   CORS (FINAL FIX)
===================== */
app.use(cors({
  origin: process.env.FRONTEND_URL, // http://localhost:5173
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

/* =====================
   Middlewares
===================== */
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(helmet({
  crossOriginResourcePolicy: false
}))

/* =====================
   Routes
===================== */
app.get('/', (req, res) => {
  res.json({ message: `Server running on ${PORT}` })
})

app.use('/api/user', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/file', uploadRouter)
app.use('/api/subcategory', subCategoryRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)

/* =====================
   Server
===================== */
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('✅ Server running on', PORT)
  })
})
