<template>
  <div>
    <header>
      <img src="../public/logo.jpg" alt="logo" />
    </header>
    <nav class="main-nav">
      <router-link to="/" class="nav-link">메인</router-link>
      <router-link to="/about" class="nav-link">부위별 운동</router-link>
      <router-link to="/routine" class="nav-link">나만의 루틴</router-link>
      <router-link to="/gyms" class="nav-link">집근처 헬스장</router-link>
      <router-link to="/purchases" class="nav-link">각종 구매처</router-link>
      <router-link to="/board" class="nav-link">자유게시판</router-link>
      <router-link to="/login" class="nav-link right-link">로그인</router-link>
      <router-link to="/mypage" class="nav-link">마이페이지</router-link>
    </nav>
    <router-view style="height: 60%" />
    <Footer>
      <div id="footer_container">
        <div id="footer_up">
          <div id="Inf"></div>
          <div id="Adv"></div>
        </div>
        <div id="footer_down">
          <small>
            Copyright ⓒ Ministry of Patriots and Veterans Affairs. All Rights
            Reserved
          </small>
        </div>
      </div>
    </Footer>
  </div>
</template>

<style>
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #989898;
}
header {
  height: 50%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  color: #585656;
  background-color: #d9d9d9;
  padding: 10px 20px;
}

.nav-link {
  text-decoration: none;
  color: #2c3e50;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
  margin: 10px 0;
}

.nav-link:hover {
  background-color: #585656;
  color: white;
}

.right-link {
  margin-left: auto;
}
.main-nav .nav-link {
  text-decoration: none;
  color: #2c3e50;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
  margin: 10px; /* 위아래 10px, 좌우 10px로 수정 */
  padding: 5px 10px; /* 좌우 패딩 추가 */
}

.main-nav .nav-link:hover {
  background-color: #585656;
  color: white;
}

.main-nav .right-link {
  margin-left: auto;
  margin-right: 0;
}
</style>
