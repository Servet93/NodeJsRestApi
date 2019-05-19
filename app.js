const express = require('express')
const app = express()
const morgan = require('morgan')

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

app.use(morgan('dev'))

//requestleri yakalayan routelar
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

app.use((req,res,next) => {
    res.status(200).json({
        Davetiye : 'Perihan \u2764 Servet'
    })
})

module.exports = app