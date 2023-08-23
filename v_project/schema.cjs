const mongoose = require('mongoose')
const Schema = mongoose.Schema
const VSchema = new Schema({
  no: Number,
  title: String,
  author: String,
  date: Date,
  count: Number,
  content: String
})
module.exports = mongoose.model('board', VSchema, 'board')
