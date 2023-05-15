require('dotenv').config()  

const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const db = require('./db')
const helmet = require("helmet")

const PORT = process.env.PORT || 5000
const TransactionRoute = require('./routes/transaction.route')
const CategoryRoute = require('./routes/category.route')
const LoadRoute = require('./routes/onLoad.route')
const AccountRoute = require('./routes/account.route')
const UserRoute = require('./routes/user.route')
const RemainderRoute = require('./routes/remainder.route')
const GoalRoute = require('./routes/goal.route')
const DefaultCategoryRoute = require('./routes/defaultCategory.route')
const IconRoute = require('./routes/icon.route')
const AuthRoute = require('./routes/auth.route')
const TMPAccount = require('./routes/TMP.route')




app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use('/transaction',TransactionRoute)
app.use('/category',CategoryRoute)
app.use('/load',LoadRoute)
app.use('/account',AccountRoute)
app.use('/user',UserRoute)
app.use('/remainder',RemainderRoute)
app.use('/goal',GoalRoute)
app.use('/defaultcategory',DefaultCategoryRoute);
app.use('/icon',IconRoute)
app.use('/auth',AuthRoute)
app.use('/tmp',TMPAccount)

app.listen(PORT,()=>{
    db.sequelize
    console.log("Started on "+PORT)
})