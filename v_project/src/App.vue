<template>
  <div id="app">
    <!-- ... 헤더 및 기타 내용 ... -->
    <header style="margin: 20px 0">
      <img src="../public/logo.jpg" alt="logo" />
      <div class="header-right-links">
        <!-- 로그인 상태에 따라 로그인 또는 로그아웃 버튼을 표시합니다 -->
        <router-link v-if="loggedIn" to="/" @click="logout"
          >로그아웃</router-link
        >
        <router-link v-else to="/Login">로그인</router-link>
      </div>
    </header>
    <nav>
      <router-link to="/">메인</router-link>
      <router-link to="/part">부위별 운동</router-link>
      <router-link to="/mylutin">나만의 루틴</router-link>
      <router-link to="/neargym">집근처 헬스장</router-link>
      <router-link to="/buy">각종 구매처</router-link>
      <router-link to="/Board">자유게시판</router-link>
    </nav>
    <router-view class="main-content" />
    <Footer>
      <div id="footer_container">
        <div id="footer_up">
          <div id="Inf"></div>
          <div id="Adv"></div>
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
export default {
  computed: {
    loggedIn() {
      // Vuex 상태에서 로그인 상태를 가져옵니다
      return this.$store.state.isLoggedIn
    }
  },
  methods: {
    logout() {
      // 로그아웃 처리 후 Vuex 상태를 업데이트합니다
      this.$store.commit('logout')
      // 로그아웃 후 메인 페이지로 이동합니다
      this.$router.push('/')
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
  height: 100%;
  background-color: #989898;
  display: flex;
  flex-direction: column;
}

#app {
  flex: 1; /* 남은 세로 공간을 채우기 위해 flex 사용 */
  display: flex;
  flex-direction: column;
}

header {
  height: auto; /* 헤더가 내용에 맞게 높이를 조정할 수 있도록 함 */
  padding: 20px 0;
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
.header-link:hover {
  color: #3498db;
}

nav {
  display: flex;
  font-size: 20px;
  color: #585656;
  background-color: #d9d9d9;
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
  background-color: #585656;
  color: white;
}

footer {
  background-color: #d9d9d9;
  padding: 10px 0;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}

/* 푸터 콘텐츠나 다른 요소에 대한 추가 스타일은 여기에 추가할 수 있습니다 */
</style>
