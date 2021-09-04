import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import {notFound, errorHandler} from '../backend/middleware/errorMiddleware.js'
import userRoutes from '../backend/routes/userRoutes.js'
import brandRoutes from '../backend/routes/brandRoutes.js'
import colorRoutes from '../backend/routes/colorRoutes.js'
import fabricRoutes from '../backend/routes/fabricRoutes.js'
import seasonRoutes from '../backend/routes/seasonRoutes.js'
import storyRoutes from '../backend/routes/storyRoutes.js'
import vendorRoutes from '../backend/routes/vendorRoutes.js'
import categoryRoutes from '../backend/routes/categoryRoutes.js'
import styleRoutes from '../backend/routes/styleRoutes.js'


dotenv.config()
connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use('/api/users', userRoutes)
app.use('/api/brands', brandRoutes)
app.use('/api/colors', colorRoutes)
app.use('/api/fabrics', fabricRoutes)
app.use('/api/seasons', seasonRoutes)
app.use('/api/stories', storyRoutes)
app.use('/api/vendors', vendorRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/styles', styleRoutes)

const __dirname = path.resolve()
app.use('/Uploads/Brands', express.static(path.join(__dirname, '/Uploads/Brands')))
app.use('/Uploads/Styles', express.static(path.join(__dirname, '/Uploads/Styles')))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*',(req, res)=>{
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res)=> {
        res.send('API is running...')
    })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))