<template>
  <div id="app">
    <!-- ... 헤더 및 기타 내용 ... -->
    <header style="margin: 20px 0">
      <img
        src="../public/도르트문트.jpg"
        alt="logo_01"
        style="width: 100px; position: absolute; left: 0"
      />
      <img src="../public/logo_ver2.png" alt="logo_02" />
      <div class="header-right-links">
        <!-- 로그인 상태에 따라 로그인 또는 로그아웃 버튼을 표시-->
        <router-link
          style="color: #ffe600; font-weight: bold"
          v-if="loggedIn"
          to="/"
          @click="logout"
          >로그아웃</router-link
        >
        <router-link
          v-else
          to="/Login"
          style="color: #ffe600; font-weight: bold"
          >로그인</router-link
        >
      </div>
    </header>

    <nav>
      <router-link to="/">메인</router-link>
      <router-link to="/part">부위별 운동</router-link>
      <!-- 로그인 했을때만 나오게 함  -->
      <router-link v-if="loggedIn" to="/mylutin">나만의 루틴</router-link>
      <router-link to="/neargym">집근처 헬스장</router-link>
      <router-link to="/Board">자유게시판</router-link>
    </nav>
    <router-view class="main-content" />
    <Footer>
      <div id="footer_container">
        <div id="footer_up">
          <!-- 문의란 -->
          <div id="Inf" style="text-align: left">
            <span
              style="font-size: 18px; font-weight: bold; letter-spacing: 2px"
            >
              이용안내 | 이용약관 | 고객센터 | 기타문의
            </span>
            <br /><br />
            <div>후원계좌 국민은행) 000000-00-000000</div>
            <div>이용약관</div>
            <div>고객센터 070-0000-0000</div>
            <div>기타문의 dongsgym23@naver.com</div>
          </div>

          <!-- 광고란 -->
          <div id="Adv">
            <div id="Adv_allbox">
              <div id="row_01">
                <div id="Adv_box_01" style="margin-right: 15px">
                  <a href="https://www.naver.com/"
                    ><img src="../public/adv01.png" alt="광고1"
                  /></a>
                </div>
                <div id="Adv_box_02">
                  <img src="../public/adv02.png" alt="광고2" />
                </div>
              </div>
              <div id="row_02">
                <div id="Adv_box_03" style="margin-right: 15px">
                  <img src="../public/adv03.png" alt="광고3" />
                </div>
                <div id="Adv_box_04">
                  <img src="../public/adv04.png" alt="광고4" />
                </div>
              </div>
              <div id="row_03">
                <div id="Adv_box_05" style="margin-right: 15px">
                  <img src="../public/adv05.png" alt="광고5" />
                </div>
                <div id="Adv_box_06">
                  <img src="../public/adv06.png" alt="광고6" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="footer_down">
          <small
            >Copyright ⓒ Ministry of Patriots and Veterans Affairs. All Rights
            Reserved</small
          >
        </div>
      </div>
    </Footer>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  computed: {
    loggedIn() {
      // 로그인 상태를 가져옴
      return this.$store.state.isLoggedIn
    }
  },
  methods: {
    logout() {
      const username = this.$store.state.username
      axios
        .post('/logout', { username })
        .then((response) => {
          // 로그아웃 후 클라이언트 상태를 업데이트
          this.$store.commit('logout')
          // 로그아웃 후 메인 페이지로 이동
          this.$router.push('/')
          alert('로그아웃되었습니다.')
        })
        .catch((error) => {
          console.error('로그아웃 요청 오류:', error)
        })
    }
  }
}
</script>
<style>
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 2000px;
  background-color: black;
  display: flex;
  flex-direction: column;
}

#app {
  flex: 1;
  display: flex;
  flex-direction: column;
}

header {
  height: 150px;
  padding: 0;
  text-align: center;
}
.header-right-links {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
}

.header-link {
  margin-left: 10px;
  color: #2c3e50; /* 링크 색상 설정 */
  font-weight: bold; /* 링크 글꼴 굵기 설정 */
  text-decoration: none; /* 밑줄 제거 */
  transition: color 0.3s; /* 색상 변화에 애니메이션 효과 추가 */
}
/* 링크에 마우스 호버 시 색상 변화 */
/* .header-link:hover {
  color: #3498db;
} */

nav {
  display: flex;
  font-size: 20px;
  color: black;
  background-color: #ffe600;
}

nav a {
  text-align: center;
  flex: 1;
  font-size: 16px;
  font-weight: bold;
  color: #2c3e50;
  display: inline-block; /* 링크가 너비를 내용에 맞게 조정하도록 설정 */
  padding: 10px 20px; /* 링크 내용 주위에 패딩 추가 */
}

nav a.router-link-active {
  background-color: black;
  color: #ffe600;
}

footer {
  border-top: 3px solid #ffe600;
  background-color: black;
  padding: 10px 0;
  text-align: center;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 400px;
  color: white;
}

#footer_up {
  display: flex;
  justify-content: space-between;
}

#Inf {
  margin: 20px 0 0 50px;
}

#Inf div {
  font-weight: bold;
  margin-bottom: 5px;
  letter-spacing: 1px;
}

#Adv {
  margin: 30px 50px 0 0;
}

#footer_down {
  margin-top: 50px;
}

:is(#row_01, #row_02, #row_03) {
  display: flex;
  justify-content: space-around;
}

:is(
    #Adv_box_01,
    #Adv_box_02,
    #Adv_box_03,
    #Adv_box_04,
    #Adv_box_05,
    #Adv_box_06
  )
  img {
  width: 350px;
  height: 70px;
  margin: 5px;
}
</style>
