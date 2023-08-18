const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: String,
  password: String,
  tell: String,
  email: String
})

module.exports = mongoose.model('User', UserSchema, 'login')
