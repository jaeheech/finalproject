const express = require('express')
const logger = require('morgan')
const path = require('path')
const VSchema = require('./mdb.cjs')
const app = express()
const _path = path.join(__dirname, './dist')
// POST를 위한 구문
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// 스태틱경로
app.use('/', express.static(_path))
// 로그 INFO
app.use(logger('tiny'))
// ====MongoDB CRUD====
// CRUD에서 Create
app.post('/create', (req, res) => {
  const no = req.body.no
  const author = req.body.author
  const date = req.body.date
  const count = req.body.count
  ;(() => {
    const _data = { no, author, date, count }
    new VSchema(_data).save()
    res.send('입력완료')
  })()
})
app.listen(3000, () => {
  console.log('3000포트에서 서버 동작중...')
})
