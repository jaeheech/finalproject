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

.main-content {
  flex: 1; /* 주요 콘텐츠가 남은 세로 공간을 차지하도록 함 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70%; /* 필요에 따라 이 값을 조정하세요 */
  margin: 20px 0;
}

footer {
  background-color: #d9d9d9;
  padding: 10px 0;
  text-align: center;
}

/* 푸터 콘텐츠나 다른 요소에 대한 추가 스타일은 여기에 추가할 수 있습니다 */
</style>
