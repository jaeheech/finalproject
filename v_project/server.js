const express = require('express')
const history = require('connect-history-api-fallback')
const logger = require('morgan')
const path = require('path')
const VSchema = require('./mdb.cjs')
const crypto = require('crypto') /* 암호화 모듈 */
const bodyParser = require('body-parser')
const cors = require('cors')
const { Builder, By } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const app = express()

app.use(history())
app.use(bodyParser.json())
app.use(cors())

const _path = path.join(__dirname, './dist')
const secretKey = crypto.randomBytes(32) // 32바이트의 랜덤 키 생성
app.use('/', express.static(_path))
console.log('Generated Secret Key:', secretKey.toString('hex')) // 버퍼를 16진수 문자열로 변환하여 출력

// POST를 위한 구문
app.use(express.json())

app.use(express.urlencoded({ extended: true }))
// 스태틱 경로 설정
// 로그 INFO
app.use(logger('tiny'))

//login 라우터
const loginrouter = require('./serve/login')
app.use('/', loginrouter)
/* 나만의 루틴 라우터 */
const routinrouter = require('./serve/routin')
app.use('/', routinrouter)

// ====게시판 MongoDB ====
// CRUD에서 Create
app.post('/create', (req, res) => {
  VSchema.findOne()
    .sort({ no: -1 })
    .limit(1)
    .then((lastPost) => {
      const newNo = lastPost ? lastPost.no + 1 : 1 // If there are no posts, start from 1
      const { title, date, count, content } = req.body
      const author = req.body.username
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

// 서버 코드에서 /get-posts 엔드포인트 수정
app.get('/get-posts', async (req, res) => {
  const page = parseInt(req.query.page) || 1 // 페이지 번호를 쿼리 파라미터로 받음
  const itemsPerPage = parseInt(req.query.limit) || 20 // 페이지당 아이템 수를 쿼리 파라미터로 받음

  try {
    const totalPosts = await VSchema.countDocuments() // 전체 게시물 수 조회
    const totalPages = Math.ceil(totalPosts / itemsPerPage) // 총 페이지 수 계산

    const posts = await VSchema.find()
      .sort({ _id: -1 }) // _id 필드를 내림차순으로 정렬하여 최신 게시물부터 가져오기
      .skip((page - 1) * itemsPerPage) // 스킵할 게시물 수 계산
      .limit(itemsPerPage) // 페이지당 보여줄 게시물 수 설정

    res.json({
      posts,
      totalPages,
      currentPage: page
    })
  } catch (error) {
    console.error('데이터베이스에서 게시물 가져오기 오류:', error)
    res.status(500).send('게시물 가져오기 오류')
  }
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

    res.json(post)
  } catch (error) {
    console.error('게시물 조회 오류:', error)
    res.status(500).send('게시물 조회 오류')
  }
})

// 게시글 조회수 업데이트 엔드포인트 추가
app.post('/update-count/:postId', async (req, res) => {
  const postId = req.params.postId

  try {
    const post = await VSchema.findById(postId)
    if (!post) {
      return res.status(404).json({ error: '게시물을 찾을 수 없습니다.' })
    }

    post.count++ // 조회수 1 증가
    await post.save() // 변경된 조회수를 저장

    res.json({ message: '조회수가 업데이트되었습니다.' })
  } catch (error) {
    console.error('조회수 업데이트 오류:', error)
    res.status(500).send('조회수 업데이트 오류')
  }
})
// 서버 코드에서 /get-hot-posts 엔드포인트 추가
app.get('/get-hot-posts', async (req, res) => {
  try {
    const hotPosts = await VSchema.find()
      .sort({ count: -1 }) // 조회수가 높은 순으로 정렬하여 가져옴
      .limit(3) // 상위 3개 게시물 가져옴

    res.json(hotPosts)
  } catch (error) {
    console.error('게시물 조회 오류:', error)
    res.status(500).send('게시물 조회 오류')
  }
})
// 게시글 수정 엔드포인트 추가
app.put('/update-post/:postId', async (req, res) => {
  const postId = req.params.postId
  const { title, content } = req.body

  try {
    const updatedPost = await VSchema.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true } // 업데이트 후의 데이터 반환
    )

    if (!updatedPost) {
      return res.status(404).json({ error: '게시물을 찾을 수 없습니다.' })
    }

    res.json({ message: '게시물이 수정되었습니다.' })
  } catch (error) {
    console.error('게시물 수정 오류:', error)
    res.status(500).send('게시물 수정 오류')
  }
})

// 게시글 삭제 엔드포인트 추가
app.delete('/delete-post/:postId', async (req, res) => {
  const postId = req.params.postId

  try {
    const deletedPost = await VSchema.findByIdAndDelete(postId)
    if (!deletedPost) {
      return res.status(404).json({ error: '게시물을 찾을 수 없습니다.' })
    }

    // 삭제된 게시글 이후의 게시글들의 글 번호 업데이트
    await VSchema.updateMany(
      { no: { $gt: deletedPost.no } },
      { $inc: { no: -1 } }
    )

    res.json({ message: '게시물이 삭제되었습니다.' })
  } catch (error) {
    console.error('게시물 삭제 오류:', error)
    res.status(500).send('게시물 삭제 오류')
  }
})

// news 크롤링
async function scrapeWebsite() {
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().headless())
    .build()

  try {
    await driver.get('https://kormedi.com/healthnews/')

    const articles = await driver.findElements(
      By.className('article__list_wrapper')
    )

    const scrapedData = []

    for (let i = 0; i < 4; i++) {
      const article = articles[i]
      const titleElement = await article.findElement(By.className('post-title'))
      const title = await titleElement.getText()

      const summaryElement = await article.findElement(
        By.className('post-summary')
      )
      const summary = await summaryElement.getText()

      const imageElement = await article.findElement(
        By.className('thumbnail-link')
      )
      const imageUrl = await imageElement.getAttribute('data-bg')
      console.log('Image URL:', imageUrl)
      const linkElement = await article.findElement(By.className('post-title'))
      const articleLink = await linkElement.getAttribute('href')

      scrapedData.push({ title, summary, imageUrl, articleLink })
    }

    return scrapedData
  } catch (error) {
    console.error(error)
    return { error: '데이터를 가져오는 도중 오류 발생' }
  } finally {
    await driver.quit()
  }
}

app.get('/healthnews-data', async (req, res) => {
  const scrapedData = await scrapeWebsite()
  res.json(scrapedData)
})
app.listen(3000, () => {
  console.log('3000포트에서 서버 동작중...')
})
