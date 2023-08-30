const express = require('express')
const router = express.Router()
const UserSchema = require('../UserSchema.cjs')
const bcrypt = require('bcrypt')

/* 로그인  */
router.post('/login', async (req, res) => {
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
    console.log(`${username}님 ${new Date()}에 로그인 하셨습니다.`)
  } catch (error) {
    console.error('로그인 실패:', error)
  }
})

/* 회원가입  */
router.post('/signup', async (req, res) => {
  const { username, password, tell, email } = req.body

  // 비밀번호를 bcrypt를 사용하여 해시화
  const hashedPassword = await bcrypt.hash(password, 10) // 두 번째 매개변수는 해시에 사용할 라운드 수
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
/* 중복확인 */
router.post('/checkUsername', async (req, res) => {
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

/* 로그아웃 */
router.post('/logout', (req, res) => {
  const { username } = req.body

  console.log(`${username}님  ${new Date()}에 로그아웃 하셨습니다.`)
  res.json({ message: '로그아웃 성공' })
})

/* 사용자 아이디 찾기  */
router.get('/user/:username', async (req, res) => {
  try {
    const username = req.params.username
    res.json({ username: username /* 기타 사용자 정보 필드 */ })
  } catch (error) {
    console.error('사용자 정보를 가져오는 중 오류 발생:', error)
    res.status(500).json({
      success: false,
      message: '사용자 정보를 가져오는 중 오류 발생했습니다.'
    })
  }
})

module.exports = router
