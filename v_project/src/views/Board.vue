<template>
  <div v-if="showModal" id="modal">
    <!-- 모달 창 -->
    <div id="modal_content">
      <img src="../../public/logo.jpg" alt="" />
      <br />
      <label for="author">닉네임:</label>
      <input type="text" id="author" v-model="loggedInUserId" />
      <br />
      <label for="title">제목:</label>
      <input type="text" id="title" v-model="title" />
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
    <!-- 사이드바 및 메인 컨텐츠 -->
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
          <!-- 게시물 목록 테이블 -->
          <tr>
            <th>글번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>시간</th>
            <th>조회수</th>
          </tr>
          <tr v-for="post in posts" :key="post._id">
            <td @click="openDetailModal(post)" style="cursor: pointer">
              {{ post.no }}
            </td>
            <td>{{ post.title }}</td>
            <td>{{ post.author }}</td>
            <td>{{ formatDate(post.date) }}</td>
            <td>{{ post.count }}</td>
          </tr>
        </table>
      </div>
      <button id="in" @click="showModal = true">등록</button>
      <div id="pagination">
        <!-- 페이지 네비게이션 -->
        <button @click="changePage(-1)" :disabled="currentPage === 1">
          이전
        </button>
        <span>페이지 {{ currentPage }} / {{ totalPages }}</span>
        <button @click="changePage(1)" :disabled="currentPage === totalPages">
          다음
        </button>
      </div>
    </div>
  </div>
  <div v-if="showDetailModal" id="detail_modal">
    <!-- 상세 모달 창 -->
    <div id="detail_modal_content">
      <h2 class="modal-title">{{ selectedPost.author }}님의 글</h2>
      <div class="modal-section">
        <p class="modal-section-label">제목:</p>
        <p class="modal-section-content1">{{ selectedPostTitle }}</p>
      </div>
      <div class="modal-section">
        <p class="modal-section-label">내용:</p>
        <p class="modal-section-content2">{{ selectedPostContent }}</p>
      </div>
      <button class="modal-button" @click="showDetailModal = false">
        닫기
      </button>
      <button
        class="modal-button-del"
        @click=";[(showDetailModal = false), deletePost(selectedPost._id)]"
      >
        삭제
      </button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      showModal: false,
      loggedInUserId: '',
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
      title: '',
      date: new Date(),
      count: 0,
      no: 1,
      posts: [], // 가져온 게시물을 저장하는 속성 추가
      showDetailModal: false,
      selectedPost: {},
      selectedPostTitle: '',
      selectedPostContent: '',
      currentPage: 1, // 현재 페이지 번호
      itemsPerPage: 50, // 페이지당 아이템 수를 50으로 설정
      totalPages: 0 // 총 페이지 수
    }
  },
  mounted() {
    this.fetchPosts() // 컴포넌트가 마운트되면 fetchPosts 메서드 호출
    this.loggedInUserId = this.$store.state.username
  },
  methods: {
    saveData: function () {
      if (!this.$store.state.isLoggedIn) {
        // 사용자가 로그인하지 않은 경우
        alert('로그인 후에 글을 작성할 수 있습니다.')
        // 로그인 페이지로 이동
        this.$router.push('/Login')
        return
      }

      axios
        .post('/create', {
          title: this.title,
          date: this.date,
          count: this.count,
          content: this.content,
          username: this.loggedInUserId // 작성자 정보를 전달
        })
        .then((res) => {
          console.log(res)
          // 데이터 제출 성공적으로 처리
          this.fetchPosts() // 새로운 게시글이 작성되면 목록을 다시 가져옴
        })
        .catch((error) => {
          console.error('데이터 저장 오류:', error)
          // 오류 처리
        })
    },
    fetchPosts() {
      axios
        .get('/get-posts', {
          params: {
            page: this.currentPage,
            limit: this.itemsPerPage
          }
        })
        .then((response) => {
          this.posts = response.data.posts
          this.totalPages = response.data.totalPages // 총 페이지 수 저장
        })
        .catch((error) => {
          console.error('게시물 가져오기 오류:', error)
        })
    },
    changePage(offset) {
      this.currentPage += offset
      this.fetchPosts() // 페이지 변경 시 게시물 다시 가져오기
    },
    formatDate(dateTime) {
      const dateObject = new Date(dateTime)
      const hours = dateObject.getHours()
      const minutes = dateObject.getMinutes()
      const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`
      return formattedTime
    },
    async openDetailModal(post) {
      try {
        const response = await axios.get(`/get-post/${post._id}`)
        this.selectedPost = response.data
        this.selectedPostTitle = response.data.title
        this.selectedPostContent = response.data.content
        this.showDetailModal = true
        axios
          .post(`/update-count/${post._id}`)
          .then(() => {
            // 조회수 업데이트 성공
            // 이후에 해당 게시글의 조회수를 클라이언트 측에서도 업데이트하는 로직 추가
            const updatedPostIndex = this.posts.findIndex(
              (p) => p._id === post._id
            )
            if (updatedPostIndex !== -1) {
              // 해당 게시글이 목록에 존재하는 경우
              this.posts[updatedPostIndex].count++ // 조회수 업데이트
            }
            // 다른 로직을 추가할 수 있습니다.
          })
          .catch((error) => {
            console.error('조회수 업데이트 오류:', error)
          })
      } catch (error) {
        console.error('게시물 가져오기 오류:', error)
      }
    },
    deletePost(postId) {
      axios
        .delete(`/delete-post/${postId}`)
        .then(() => {
          this.showDetailModal = false // 모달 창 닫기
          this.fetchPosts() // 게시물 목록을 다시 가져옴
        })
        .catch((error) => {
          console.error('게시물 삭제 오류:', error)
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
  z-index: 10;
}
#modal_content {
  position: relative;
  margin: auto;
  width: 450px;
  height: 600px;
  top: 20%;
  background: #d9d9d9;
  border-radius: 8px;
  padding: 20px;
}
#modal_click {
  position: absolute;
  bottom: 0%;
  left: 10%;
}
#modal_end {
  position: absolute;
  bottom: 0%;
  left: 20%;
}
#author {
  width: 50%;
  height: 5%;
  margin: 10px;
}
#title {
  width: 50%;
  height: 5%;
  margin: 10px 10px 10px 20px;
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
  height: 4%;
  border-bottom: 3px solid #898787;
  margin-bottom: 5px;
  color: #000;
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
  margin-top: 10px;
}
#pagination {
  margin-top: 10px;
  position: relative;
  left: 42%;
}
#detail_modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

#detail_modal_content {
  /* Different ID */
  background-color: white;
  width: 550px;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  margin: auto;
  height: 550px;
  border-radius: 8px;
  padding: 20px;
}
.modal-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.modal-section {
  margin-top: 15px;
}

.modal-section-label {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 5px;
}

.modal-section-content1 {
  font-size: 16px;
  line-height: 1.5;
  border: 1px solid black;
  border-radius: 5px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}
.modal-section-content2 {
  font-size: 16px;
  line-height: 1.5;
  border: 1px solid black;
  border-radius: 5px;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}

.modal-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 50px;
}
.modal-button-del {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 50px;
  margin-left: 10px;
}
</style>
