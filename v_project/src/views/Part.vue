<template>
  <div id="part_all">
    <!-- 좌측 네비 파트 -->
    <div id="part_sidebar">
      <ul>
        <li v-for="v in sideBar" :key="v">{{ v }}</li>
      </ul>
    </div>
    <!-- // 좌측 네비 파트 -->

    <!-- 우측 content 파트 -->
    <div id="part_content">
      <div id="part_content_title" style="border-bottom: 3px solid #989898">
        <h1 style="margin-left: 1%; text-align: center; letter-spacing: 2px">
          부위별 운동
        </h1>
      </div>
      <!-- selection 파트 -->
      <div id="part_content_selection">
        <input type="checkbox" id="shoulders" value="어깨" />어깨
        <input type="checkbox" id="chest" value="가슴" />가슴
        <input type="checkbox" id="back" value="등" />등
        <input type="checkbox" id="lower_body" value="하체" />하체
        <input type="checkbox" id="biceps" value="이두" />이두
        <input type="checkbox" id="triceps" value="삼두" />삼두
      </div>
      <!-- // selection 파트 -->

      <!-- result 파트 -->
      <div id="part_content_result">
        <div style="background-color: plum; width: 1000px; height: 600px">
          <p>● 결과들이 카드 형태로 출력될 예정</p>
          <p>● selection 파트에서 부위를 고르면 필터기능을 구현할 예정</p>
          <p>● 클릭시 모달창으로 상세정보를 볼 수 있게 구현할 예정</p>
        </div>
      </div>
      <!-- // result 파트 -->
    </div>
    <!-- // 우측 content 파트 -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      sideBar: ['부위별 운동', '나만의 루틴', '집근처 헬스장', '자유게시판']
    }
  }
}
</script>
<style scoped>
#part_all {
  display: flex;
  background-color: #585656;
  margin: 0;
  width: 100%;
  height: 100%;
}
#part_sidebar {
  background-color: #d9d9d9;
  margin: 30px 0 0 30px;
  width: 13%;
  height: 20%;
}
#part_sidebar li {
  color: lightslategray;
  margin: 30px 0 10px 20px;
}
#part_sidebar li:first-child {
  color: black;
  font-size: 20px;
  font-weight: bold;
}
#part_content {
  background-color: #d9d9d9;
  margin: 30px;
  width: 85%;
  height: 92%;
}
</style>
