const mongoose = require('mongoose')
const Schema = mongoose.Schema
const VSchema = new Schema({
  no: Number,
  author: String,
  date: Date,
  count: Number
})
module.exports = mongoose.model('board', VSchema, 'board')
