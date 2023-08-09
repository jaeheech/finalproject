<template>
  <header style="margin: 20px 0">
    <img src="../public/logo.jpg" alt="logo" />
  </header>
  <nav>
    <router-link to="/">메인</router-link>
    <router-link to="/about">부위별 운동</router-link>
    <router-link to="/about">나만의 루틴</router-link>
    <router-link to="/about">집근처 헬스장</router-link>
    <router-link to="/about">각종 구매처</router-link>
    <router-link to="/about" style="margin-right: 80px">자유게시판</router-link>
    |
    <router-link to="/about" style="margin-left: 80px">로그인</router-link>
    <router-link to="/about">마이페이지</router-link>
  </nav>
  <router-view style="height: 60%" />
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

nav {
  display: flex;
  justify-content: space-around;
  font-size: 20px;
  color: #585656;
  width: 100%;
  height: 10%;
  background-color: #d9d9d9;
}

nav a {
  font-size: 16px;
  height: 100%;
  float: left;
  margin: 0 20px;
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  width: 10%;
  background-color: #585656;
  color: white;
  font-weight: bold;
}
</style>
