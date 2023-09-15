<template>
  <div>
    <!-- 로그인 모달 -->
    <div v-show="showModal" class="modal-container">
      <div class="modal-content">
        <!-- 닫기 버튼 -->
        <button class="close-button" @click="closeModal">X</button>
        <header style="margin-bottom: 20px">
          <!-- 로고 이미지 -->
          <img src="../../public/logo_ver2.png" alt="logo" />
        </header>
        <form @submit.prevent="login">
          <!-- 로그인 폼 -->
          <div id="id_span">
            <span>ID</span>
            <input
              type="text"
              id="username"
              v-model="username"
              placeholder="아이디를 입력하시오"
              required
            />
          </div>
          <div id="id_span">
            <span>Password</span>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="비밀번호를 입력하시오"
              required
            />
          </div>
          <div class="button-container">
            <!-- 로그인 버튼 -->
            <button type="submit" class="login-button">
              <span>로그인</span>
            </button>
            <!-- 회원가입 버튼 -->
            <button
              type="button"
              class="signup-button"
              @click="openSignupModal"
            >
              <span>회원가입</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 배경 오버레이 -->
    <div v-show="showModal || showSignupModal" class="overlay"></div>

    <!-- 회원가입 모달 -->
    <div v-show="showSignupModal" class="modal-container">
      <div class="modal-content">
        <!-- 닫기 버튼 -->
        <button class="close-button" @click="closeSignupModal">X</button>
        <header style="margin-bottom: 20px">
          <!-- 로고 이미지 -->
          <img src="../../public/logo_ver2.png" alt="logo" />
        </header>
        <form @submit.prevent="signup">
          <!-- 회원가입 폼 -->
          <div id="id_span">
            <label for="signup-username"><span>ID</span></label>
            <input
              type="text"
              id="signup-username"
              v-model="signupUsername"
              placeholder="아이디를 입력하시오"
              required
              @input="checkUsernameAvailability"
            />
          </div>
          <div>
            <span v-show="usernameUnavailable"
              >이미 사용중인 아이디 입니다.</span
            >
          </div>
          <div id="id_span">
            <label for="signup-password"><span>Password</span></label>
            <input
              type="password"
              id="signup-password"
              v-model="signupPassword"
              placeholder="비밀번호를 입력하시오"
              required
            />
          </div>
          <div id="id_span">
            <label for="signup-tell"><span>Tell</span></label>
            <input
              type="text"
              id="signup-tell"
              v-model="signupTell"
              placeholder="연락처를 입력하시오"
              required
            />
          </div>
          <div id="id_span">
            <label for="signup-email"><span>E-mail</span></label>
            <input
              type="email"
              id="signup-email"
              v-model="signupEmail"
              placeholder="전자우편 주소를 입력하시오"
              required
            />
          </div>
          <!-- ... (추가 회원가입 필드) -->
          <div class="button-container">
            <!-- 회원가입 버튼 -->
            <button
              type="submit"
              class="signup-button"
              @click="openSignupModal"
            >
              <span>계정생성</span>
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- 팝업 -->
    <div v-show="showSignupSuccess" class="popup">
      <div class="popup-content">
        <p>회원가입이 완료되었습니다!</p>
        <button @click="closeSignupSuccessPopup">닫기</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      showModal: true,
      showSignupModal: false, // 회원가입 모달창 처음엔 안나옴
      showSignupSuccess: false, // 회원가입성공시 닫힘
      username: '',
      password: '',
      signupUsername: '',
      signupPassword: '',
      showLoginSuccess: false,
      loggedIn: false, // 로그인 상태
      usernameUnavailable: false
    }
  },
  methods: {
    /* 회원가입 메소드  */
    async signup() {
      try {
        await axios.post('/signup', {
          username: this.signupUsername,
          password: this.signupPassword,
          tell: this.signupTell,
          email: this.signupEmail
        })
        // console.log(response.data)
        this.showSignupSuccess = true // 회원가입 완료 팝업 표시
        this.closeSignupModal() // 회원가입 모달 닫기
      } catch (error) {
        console.error('회원가입 실패:', error)
      }
    },
    /* 로그인 메소드 */
    async login() {
      try {
        await axios.post('/login', {
          username: this.username,
          password: this.password
        })
        // 로그인 성공 시 처리
        this.$store.commit('login', this.username)
        this.$router.push('/') // 기존에 있던 메인 화면으로 이동
        // 로그인 성공 메시지를 표시
        const message = `${this.username}님 로그인 성공하셨습니다.`
        alert(message)
        // 로그인 실패 처리〈오늘의 핫딜 상품들〉
      } catch (error) {
        console.error('로그인 실패:', error)
      }
    },
    /* 아이디 중복체크 메소드 */
    async checkUsernameAvailability() {
      try {
        const response = await axios.post('/checkUsername', {
          username: this.signupUsername
        })

        if (response.data.available) {
          // 아이디 사용 가능하면 메시지 안나옴
          this.usernameUnavailable = false
        } else {
          // 아이디 중복 일때 메세지 나옴
          this.usernameUnavailable = true
        }
      } catch (error) {
        console.error('아이디 중복 확인 실패:', error)
      }
    },
    closeModal() {
      // console.log('모달 닫기')
      this.showModal = false
      this.$router.push('/')
    },
    openSignupModal() {
      this.showSignupModal = true
    },
    closeSignupModal() {
      this.showSignupModal = false
      this.resetSignupForm()
    },
    closeSignupSuccessPopup() {
      this.showSignupSuccess = false // 회원가입 완료 팝업 닫기
      this.showModal = true // 로그인 모달로 다시 돌아가기
    },
    resetSignupForm() {
      this.signupUsername = ''
      this.signupPassword = ''
      this.signupTell = ''
      this.signupEmail = ''
    },
    closeLoginSuccessPopup() {
      this.showLoginSuccess = false
      this.showModal = false
      this.$router.push('/') // 메인페이지로 돌아감
    },
    logout() {
      this.loggedIn = false // 로그아웃 시 loggedIn 상태를 업데이트
    }
  }
}
</script>

<style scoped>
.social-button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.custom-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

.custom-button img {
  max-width: 100%;
  height: auto;
}
.naver-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

#username {
  margin-left: 50px;
}
span {
  font-weight: bold;
}
#id_span {
  padding-left: 10px;
  background-color: #ffe4e4;
  padding: 20px;
  border-radius: 10px;
}
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.modal-content {
  width: 500px;
  background-color: #ffbfbf;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
}
.signup-modal {
  z-index: 20; /* 회원가입 모달이 로그인 모달 위에 보이도록 */
}

/* 배경 오버레이 스타일링 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 5; /* 배경 오버레이가 모달 아래에 위치하도록 */
  /* ... (기타 스타일) */
}
.close-button {
  color: black;
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  background-color: #ffe4e4;
  width: 80%;
  border: none;
  text-align: center;
  outline: none;
}

button {
  background-color: #ffe4e4;
  color: black;
  font-weight: bolder;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
}

input::placeholder {
  text-align: center;
  font-weight: bolder;
  color: #747474;
}
::placeholder {
  text-align: center;
}
.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 10px;
}

.login-button,
.signup-button {
  flex: 1;
  margin: 0;
  font-size: 12px;
  padding: 8px 0;
  border-radius: 4px;
}
#signup-username {
  margin-left: 47px;
}
#signup-tell {
  margin-left: 40px;
}
#signup-email {
  margin-left: 40px;
}
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 15; /* 오버레이보다 위에 표시 */
}

.popup-content {
  text-align: center;
}
</style>
