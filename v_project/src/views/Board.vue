<template>
  <div v-if="showModal" id="modal">
    <div id="modal_content">
      <img src="../../public/logo.jpg" alt="" />
      <br />
      <label for="author">작성자:</label>
      <input type="text" id="author" v-model="author" />
      <br />
      <label for="board_content" style="position: relative; bottom: 20%"
        >내용:</label
      >
      <textarea id="board_content" v-model="content"></textarea>
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
            <th>조회수</th>
          </tr>
          <tr v-for="post in posts" :key="post._id">
            <td>{{ post.no }}</td>
            <td>{{ post.author }}</td>
            <td>{{ post.date }}</td>
            <td>{{ post.count }}</td>
          </tr>
        </table>
      </div>
      <button id="in" @click="showModal = true">등록</button>
      <button id="out">삭제</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
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
      ],
      author: '',
      content: '',
      date: new Date(),
      count: 0,
      no: 1,
      posts: [] // 가져온 게시물을 저장하는 속성 추가
    }
  },
  mounted() {
    this.fetchPosts() // 컴포넌트가 마운트되면 fetchPosts 메서드 호출
  },
  methods: {
    saveData: function () {
      axios
        .post('/create', {
          no: this.no,
          author: this.author,
          date: this.date,
          count: this.count
        })
        .then((res) => console.log(res))
    },
    fetchPosts() {
      axios
        .get('/get-posts') // 백엔드 API에 맞게 엔드포인트 수정
        .then((response) => {
          this.posts = response.data
        })
        .catch((error) => {
          console.error('게시물 가져오기 오류:', error)
        })
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
