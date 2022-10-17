const { Schema, model } = require('mongoose')
const { schemaRegistration } = require('../actions/schemaRegistration')

const schema = new Schema({
  username: { type: String },
  email: { type: String, require: true },
  password: { type: String, require: true },
  notifications: { type: String }, // id of Notification
  subscription: { type: String }, // id of Subscription
  tables: { type: Array },
})

schemaRegistration('User', schema.obj)
module.exports = model('User', schema)
