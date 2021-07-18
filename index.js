const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
var cookies = require("cookie-parser");
app.use(cookies())
const verify = require('./routes/verifytoken')
// for ejs
app.set('view engine', 'ejs')
const path = require('path')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, 'media')))

//Routes

const loginRoute = require('./routes/login')
const signupRoute = require('./routes/signup')
const courseRoute = require('./routes/course')
const profileRoute = require('./routes/profile')

//connect to database
mongoose.connect(process.env.DBCONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to db')
})
//urls 


app.use('/login', loginRoute)
app.use('/signup', signupRoute)
app.use('/home', (req, res) => {
    res.render('index.ejs')
})
app.use('/comments/', courseRoute)
app.use('/home/profile', profileRoute)




//listening
app.listen(3000, (req, res) => {
    console.log("listening on port 3000 ....")
})