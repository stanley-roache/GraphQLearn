const mongoose = require('mongoose')

const Schema = mongoose.Schema

const moemoeaSchema = new Schema({
  name: String,
  description: String
})

module.exports = mongoose.model('Moemoea', moemoeaSchema)