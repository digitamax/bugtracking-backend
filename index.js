const express = require('express')
const app = express()
const connectDB = require('./db/db')
require('dotenv').config()
const path=require('path')

//Importing routes
const bugsRoutes = require('./routes/bugs')


//Configuring middlewares
app.use(express.static(__dirname));
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())

//Routes
app.use("/api/bugs", bugsRoutes)


app.listen(3000, (req, res) => {
    connectDB()
    console.log('App listening on port 3000')
})