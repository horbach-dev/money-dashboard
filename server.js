const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

const userRoutes = require('./routes/users')
const tableRoutes = require('./routes/tables')
const cellRoutes = require('./routes/cells')

// Headers
app.use(function (reqy, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname, 'front/build')))
app.use(userRoutes)
app.use(tableRoutes)
app.use(cellRoutes)

module.exports = app
