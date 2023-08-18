const express = require('express')
const history = require('connect-history-api-fallback')
const logger = require('morgan')
const path = require('path')
const VSchema = require('./mdb.cjs')
const UserSchema = require('./UserSchema.cjs')
const crypto = require('crypto')
const bodyParser = require('body-parser')
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

/* 로그인 CRUD 비밀번호 암호화 */
app.post('/signup', async (req, res) => {
  const { username, password, tell, email } = req.body
  const encryptedPassword = encrypt(password)
  const userData = {
    username,
    password: encryptedPassword,
    tell,
    email
  }

  try {
    const newUser = new UserSchema(userData)
    await newUser.save()
    console.log('회원가입 성공:', newUser)
    res.send('회원가입 완료')
  } catch (error) {
    console.error('회원가입 실패:', error)
    res.status(500).send('회원가입 실패')
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

    // 입력된 비밀번호를 복호화하여 비교
    const decryptedPassword = decrypt(user.password) // 암호화된 비밀번호 복호화
    if (password !== decryptedPassword) {
      res.status(400).json({ error: '비밀번호가 일치하지 않습니다.' })
      return
    }

    // 인증이 성공하면 로그인 성공 응답 보내기
    res.json({ message: '로그인 성공' })
  } catch (error) {
    console.error('로그인 실패:', error)
    res.status(500).send('로그인 실패')
  }
})

// 암호화 함수
function encrypt(text) {
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    secretKey,
    Buffer.alloc(16, 0)
  )
  let encrypted = cipher.update(text, 'utf-8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

/* 복호화 함수  */
function decrypt(encryptedText) {
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    secretKey,
    Buffer.alloc(16, 0)
  )
  let decrypted = decipher.update(encryptedText, 'hex', 'utf-8')
  decrypted += decipher.final('utf-8')
  return decrypted
}
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
