<template>
  <div>
    <!-- 로그인 모달 -->
    <div v-show="showModal" v-if="showModal" class="modal-container">
      <div class="modal-content">
        <!-- 닫기 버튼 -->
        <button class="close-button" @click="closeModal">X</button>
        <header style="margin-bottom: 20px">
          <!-- 로고 이미지 -->
          <img src="../../public/logo.jpg" alt="logo" />
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
          <!-- 소셜 로그인 버튼 -->
          <div class="social-button-container">
            <button class="custom-button">
              <img
                src="../../public/social_login_button.png"
                alt="Social Login"
                style="width: 240px; height: 45px"
              />
            </button>
            <button class="naver-button">
              <img
                src="../../public/naver.png"
                alt=""
                style="width: 230px; height: 45px"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
    <!-- 배경 오버레이 -->
    <div v-show="showModal || showSignupModal" class="overlay"></div>
    <!-- 회원가입 모달 -->
    <div
      v-show="showSignupModal"
      v-if="showSignupModal"
      class="modal-container"
    >
      <div class="modal-content">
        <!-- 닫기 버튼 -->
        <button class="close-button" @click="closeSignupModal">X</button>
        <header style="margin-bottom: 20px">
          <!-- 로고 이미지 -->
          <img src="../../public/logo.jpg" alt="logo" />
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
            />
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
            <button type="submit" class="signup-button">
              <span>계정생성</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: true,
      showSignupModal: false,
      username: '',
      password: '',
      signupUsername: '',
      signupPassword: ''
    }
  },
  methods: {
    login() {
      console.log('로그인 시도:', this.username, this.password)
    },
    closeModal() {
      console.log('모달 닫기')
      this.showModal = false
    },
    openSignupModal() {
      this.showSignupModal = true
    },
    closeSignupModal() {
      this.showSignupModal = false
    },
    signup() {
      console.log('회원가입 시도:', this.signupUsername, this.signupPassword)
    }
  }
}
</script>

<style>
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

.naver-button img {
  max-width: 100%;
  height: auto;
}
#username {
  margin-left: 50px;
}
span {
  font-weight: bold;
}
#id_span {
  padding-left: 10px;
  background-color: #989898;
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
  background-color: #d9d9d9;
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
  background-color: #989898;
  width: 80%;
  border: none;
  text-align: center;
  outline: none;
}

button {
  background-color: #989898;
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
  gap: 10px; /* Adjust the gap between buttons */
}

.login-button,
.signup-button {
  flex: 1;
  margin: 0;
  font-size: 12px; /* Adjust the font size */
  padding: 8px 0; /* Adjust the padding */
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
</style>
