const mongoose = require('mongoose')
const VSchema = require('./schema.cjs')
const mongodbURL = 'mongodb://127.0.0.1:27017'
console.log(mongodbURL)
mongoose.set('strictQuery', false)
mongoose
  .connect(mongodbURL, { useNewUrlParser: true })
  .then(() => console.log('스키마로드완료!!\nDB 접속완료!!'))
  .catch((e) => console.log(e))
module.exports = VSchema
