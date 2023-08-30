const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoutineSchema = new Schema({
  username: String, // 사용자와 연결
  day: String, // 루틴이 속한 요일
  exercises: [String] // 운동 목록
})

module.exports = mongoose.model('Routine', RoutineSchema, 'routines')
