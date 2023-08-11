<template>
  <div v-if="showModal" id="modal">
    <div id="modal_content">
      <img src="../../public/logo.jpg" alt="" />
      <br />
      <label for="author">작성자:</label>
      <input type="text" id="author" />
      <br />
      <label for="board_content" style="position: relative; bottom: 20%"
        >내용:</label
      >
      <textarea id="board_content"></textarea>
      <button id="modal_click" @click=";[(showModal = false), saveData()]">
        작성
      </button>
      <button id="modal_end" @click="showModal = false">취소</button>
    </div>
  </div>
  <div id="container">
    <div id="side_bar">
      <ul>
        <li v-for="v in sideBar" :key="v">{{ v }}</li>
      </ul>
    </div>
    <div id="main">
      <div id="board">
        <div id="head">
          <h2>자유게시판</h2>
        </div>
      </div>
      <div id="content">
        <table>
          <tr>
            <th>글번호</th>
            <th>작성자</th>
            <th>날짜</th>
            <th>내용</th>
          </tr>
        </table>
      </div>
      <button id="in" @click="showModal = true">등록</button>
      <button id="out">삭제</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showModal: false,
      sideBar: [
        '메인',
        '부위별 운동',
        '나만의 루틴',
        '집근처 헬스장',
        '각종 구매처',
        '자유게시판',
        '마이페이지'
      ]
    }
  },
  methods: {
    saveData() {
      const arr = []
      let ct = 1
      const input = document.getElementById('author').value
      const content = document.getElementById('board_content').value
      const date = new Date()
      const data = {
        count: ct++,
        author: input,
        date: date,
        content: content
      }
      arr.push(data)
    }
  }
}
</script>
<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
img {
  position: relative;
  left: 15%;
  margin-bottom: 10px;
}
#modal {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
}
#modal_content {
  position: relative;
  margin: auto;
  width: 450px;
  height: 550px;
  top: 20%;
  background: #d9d9d9;
  border-radius: 8px;
  padding: 20px;
}
#modal_click {
  position: absolute;
  bottom: 5%;
  left: 10%;
}
#modal_end {
  position: absolute;
  bottom: 5%;
  left: 20%;
}
#author {
  width: 50%;
  height: 10%;
  margin: 10px;
}
#board_content {
  width: 70%;
  height: 50%;
  margin: 25px;
}
#container {
  height: 100%;
  background-color: #585656;
  display: flex;
}
#side_bar {
  background-color: #d9d9d9;
  margin: 30px 0 0 30px;
  width: 12%;
  height: 50%;
  color: #898787;
}
li {
  color: lightslategray;
  margin: 20px 0 10px 20px;
}
li:nth-child(6) {
  color: black;
  font-weight: bold;
  font-size: 20px;
}
#main {
  background-color: #d9d9d9;
  margin: 30px;
  width: 85%;
  height: 92%;
}
#board {
  height: 5%;
  border-bottom: 3px solid #898787;
  margin-bottom: 15px;
  color: black;
}
table {
  border-collapse: collapse;
  border: 2px solid #898787;
  width: 100%;
  height: 100%;
}
tr,
th,
td {
  border: 1px solid black;
  text-align: center;
}
#in {
  position: absolute;
  bottom: 85px;
}
#out {
  position: absolute;
  bottom: 85px;
  left: 22%;
}
</style>
