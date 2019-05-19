const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

mongoose.connect("mongodb+srv://root:Aa123456@cluster0-fofsa.mongodb.net/test?retryWrites=true")

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }

    next();
})


app.use('/products', productRoutes)
app.use('/orders', orderRoutes)


app.use((req,res,next) => {
    res.status(200).json({
        Davetiye : 'Perihan \u2764 Servet'
    })
})


/*
app.use((req, res, next) => {
    const error = new Error("Not found")
    error.status = 404
    next(error)
})
*/

app.use((error, req, res ,next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app