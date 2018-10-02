const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  dream_ids: [{ type: Schema.Types.ObjectId, ref: 'Moemoea' }]
})

module.exports = mongoose.model('User', userSchema)