const express = require('express')
const history = require('connect-history-api-fallback')
const logger = require('morgan')
const path = require('path')
const VSchema = require('./mdb.cjs')
const app = express()
app.use(history())
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
  VSchema.findOne()
    .sort({ no: -1 })
    .limit(1)
    .then((lastPost) => {
      const newNo = lastPost ? lastPost.no + 1 : 1 // If there are no posts, start from 1
      const { author, date, count } = req.body

      const newPost = new VSchema({
        no: newNo,
        author,
        date,
        count
      })

      newPost
        .save()
        .then(() => {
          res.send('입력완료')
        })
        .catch((error) => {
          console.error('게시물 저장 오류:', error)
          res.status(500).send('게시물 저장 오류')
        })
    })
    .catch((error) => {
      console.error('게시물 조회 오류:', error)
      res.status(500).send('게시물 조회 오류')
    })
})
// 서버 코드를 수정하여 게시물을 가져오는 새로운 엔드포인트 추가
app.get('/get-posts', (req, res) => {
  VSchema.find()
    .then((posts) => {
      res.json(posts)
    })
    .catch((error) => {
      console.error('데이터베이스에서 게시물 가져오기 오류:', error)
      res.status(500).send('게시물 가져오기 오류')
    })
})
app.listen(3000, () => {
  console.log('3000포트에서 서버 동작중...')
})
