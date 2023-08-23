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