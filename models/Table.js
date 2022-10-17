const { Schema, model, Types } = require('mongoose')
const { schemaRegistration } = require('../actions/schemaRegistration')

const schema = new Schema({
  title: { type: String },
  url: { type: String },
  originalId: { type: String }, // id of google sheet,
  sheets: { type: Array },
})

schemaRegistration('Table', schema.obj)
module.exports = model('Table', schema)
