<template>
  <div v-if="showModal" class="modal-container">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">X</button>
      <header style="margin-bottom: 20px">
        <img src="../../public/logo.jpg" alt="logo" />
      </header>
      <form @submit.prevent="login">
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
          <button type="submit" class="login-button">
            <span>로그인</span>
          </button>
          <button type="submit" class="signup-button">
            <span>회원가입</span>
          </button>
        </div>
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
</template>
<script>
export default {
  data() {
    return {
      showModal: true,
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      console.log('로그인 시도:', this.username, this.password)
    },
    closeModal() {
      console.log('모달 닫기')
      this.showModal = false
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
}

.modal-content {
  width: 500px;
  background-color: #d9d9d9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
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
</style>
