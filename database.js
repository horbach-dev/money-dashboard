const mongoose = require('mongoose')

const MONGO_PASSWORD = 'IWildSB8'
const MONGO_DB = 'money-dashboard'

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 10000,
}

// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
const url = `mongodb+srv://horbach:${MONGO_PASSWORD}@cluster0.ds5eo.mongodb.net/${MONGO_DB}?authSource=admin&retryWrites=true&w=majority`

const database = async () => {
  return mongoose
    .connect(url, options)
    .then(function () {
      console.log('MongoDB is connected')
    })
    .catch(function (err) {
      console.log(err)
    })
}

module.exports = database
