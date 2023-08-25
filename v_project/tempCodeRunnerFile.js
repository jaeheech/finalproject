const express = require('express')
const history = require('connect-history-api-fallback')
const logger = require('morgan')
const path = require('path')
const VSchema = require('./mdb.cjs')
const UserSchema = require('./UserSchema.cjs')
const crypto = require('crypto')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const app = express()
app.use(history())
app.use(bodyParser.json())
const _path = path.join(__dirname, './dist')

const secretKey = crypto.randomBytes(32) // 32바이트의 랜덤 키 생성
console.log('Generated Secret Key:', secretKey.toString('hex')) // 버퍼를 16진수 문자열로 변환하여 출력

// POST를 위한 구문
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// 스태틱 경로 설정
app.use('/', express.static(_path))
// 로그 INFO
app.use(logger('tiny'))

/* 회원가입 코드 시작 */
app.post('/signup', async (req, res) => {
  const { username, password, tell, email } = req.body

  // 비밀번호를 bcrypt를 사용하여 해시화
  const hashedPassword = await bcrypt.hash(password, 10) // 두 번째 매개변수는 해시에 사용할 라운드 수입니다.
  const userData = {
    username,
    password: hashedPassword,
    tell,
    email
  }
  try {
    const newUser = new UserSchema(userData)
    await newUser.save()
    console.log('회원가입 성공:', newUser)
    res.json({ message: '로그인 성공' })
  } catch (error) {
    console.error('회원가입 실패:', error)
    res.status(500).send('회원가입 실패')
  }
})
/* 아이디 중복확인 코드 */
app.post('/checkUsername', async (req, res) => {
  const { username } = req.body

  try {
    // 데이터베이스에서 해당 아이디로 사용자를 찾아봅니다.
    const existingUser = await UserSchema.findOne({ username })

    if (existingUser) {
      // 이미 존재하는 아이디인 경우
      res.json({ available: false })
    } else {
      // 사용 가능한 아이디인 경우
      res.json({ available: true })
    }
  } catch (error) {
    console.error('아이디 중복 확인 실패:', error)
    res.status(500).send('아이디 중복 확인 실패')
  }
})
/* 로그인 CRUD R 읽기 저장된 아이디와 패스워드 정보를 읽어와서 로그인 기능 실현 */
app.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    // 사용자 데이터베이스에서 해당 아이디로 사용자 찾기
    const user = await UserSchema.findOne({ username })

    if (!user) {
      res.status(400).json({ error: '아이디가 존재하지 않습니다.' })
      return
    }

    // 입력된 비밀번호를 bcrypt.compare를 사용하여 비교
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      res.status(400).json({ error: '비밀번호가 일치하지 않습니다.' })
      return
    }

    // 인증이 성공하면 로그인 성공 응답 보내기
    res.json({ message: '로그인 성공' })
    console.log(`${username}님 로그인 하셨습니다.`)
  } catch (error) {
    console.error('로그인 실패:', error)
  }
})
/* 알림메시지  */
function showErrorAlert(message) {
  alert(message)
}

// ====게시판 MongoDB ====
// CRUD에서 Create
app.post('/create', (req, res) => {
  VSchema.findOne()
    .sort({ no: -1 })
    .limit(1)
    .then((lastPost) => {
      const newNo = lastPost ? lastPost.no + 1 : 1 // If there are no posts, start from 1
      const { title, author, date, count, content } = req.body

      const newPost = new VSchema({
        no: newNo,
        title,
        author,
        date,
        count,
        content
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
// 게시물 조회 엔드포인트 수정
app.get('/get-post/:postId', async (req, res) => {
  const postId = req.params.postId

  try {
    // 게시물 조회
    const post = await VSchema.findById(postId)

    if (!post) {
      return res.status(404).json({ error: '게시물을 찾을 수 없습니다.' })
    }

    // 조회수 증가
    post.count++ // 조회수 1 증가
    await post.save() // 변경된 조회수를 저장

