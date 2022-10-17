const { Schema, model } = require('mongoose')
const { schemaRegistration } = require('../actions/schemaRegistration')

const schema = new Schema({
  originalId: { type: String },
  cellPosition: { type: String },
  tradeType: { type: String },
  asset: { type: String },
  fiat: { type: String },
  sheet: { type: String },
  transAmount: { type: String },
  payTypes: { type: Array },
  countries: { type: Array },
  url: { type: String },
  ownerTableId: { type: String }, // id of Table
})

schemaRegistration('Cell', schema.obj)
module.exports = model('Cell', schema)
