<template>
  <div id="mylutin_all">
    <div id="mylutin_sidebar">
      <ul>
        <li v-for="v in sideBar" :key="v">{{ v }}</li>
      </ul>
    </div>
    <div id="mylutin_content">
      <div>
        <div v-if="user">
          <p class="username"><strong>이용자:</strong> {{ user.username }}</p>
        </div>
      </div>
      <div class="page-title">
        <h2>{{ user.username }}님의 루틴</h2>
      </div>
      <div>
        <ul class="weekday-list">
          <button class="weekday-button" @click="showRoutineInputs('월')">
            월
          </button>
          <button class="weekday-button" @click="showRoutineInputs('화')">
            화
          </button>
          <button class="weekday-button" @click="showRoutineInputs('수')">
            수
          </button>
          <button class="weekday-button" @click="showRoutineInputs('목')">
            목
          </button>
          <button class="weekday-button" @click="showRoutineInputs('금')">
            금
          </button>
          <button class="weekend-button" @click="showRoutineInputs('토')">
            토
          </button>
          <button class="weekend-button" @click="showRoutineInputs('일')">
            일
          </button>
        </ul>
      </div>
      <div class="routine-inputs" v-if="showInputs">
        <h2>{{ routineMessage }}</h2>
        <input type="text" v-model="newExercise" />
        <button @click="addExerciseToRoutine" v-if="!routineExists">
          추가
        </button>
        <button @click="saveRoutine" v-if="routineExists">저장</button>
      </div>
      <div class="routine-list">
        <h2>루틴 목록</h2>
        <ul>
          <li v-for="routine in routines" :key="routine._id">
            <p>
              {{ routine.day }}요일 루틴: {{ routine.exercises.join(', ') }}
            </p>
          </li>
        </ul>
      </div>
      <div class="youtube">
        <div>
          <iframe
            src="https://www.youtube.com/embed/-GJMwcES45A?si=htFpgVrZ-Y8_UQk5"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            class="youtube1"
          ></iframe>
        </div>
        <div>
          <iframe
            src="https://www.youtube.com/embed/YahXKYnc8K8?si=P57C_RXTrfwFCj-n"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            class="youtube2"
          ></iframe>
        </div>
        <div>
          <iframe
            src="https://www.youtube.com/embed/Z0Z8_lVFkjk?si=M9eX4W0nTV4DJZx-"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            class="youtube3"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  computed: {
    ...mapState(['username'])
  },
  data() {
    return {
      sideBar: ['부위별 운동', '나만의 루틴', '집근처 헬스장', '자유게시판'],
      user: null,
      showInputs: false,
      routineData: {
        exercise1: '',
        exercise2: ''
      },
      newExercise: '',
      routineMessage: '',
      routines: [],
      routineExists: false
    }
  },
  created() {
    // 사용자 정보 가져오기
    if (this.username) {
      this.fetchUserInfo(this.username)
    }
    this.fetchRoutines()
  },
  methods: {
    async fetchUserInfo(username) {
      try {
        // 서버에 사용자 정보를 요청
        const response = await axios.get(`/user/${username}`)
        this.user = response.data
      } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류 발생:', error)
      }
    },
    showRoutineInputs(day) {
      this.routineData.day = day //
      this.showInputs = true //

      // 해당 요일에 루틴이 이미 존재하는지 확인
      this.routineExists = !!this.routines.find(
        (routine) => routine.day === day
      )
      if (day === '월') {
        this.routineMessage = '월요일 루틴 작성'
      } else if (day === '화') {
        this.routineMessage = '화요일 루틴 작성'
      } else if (day === '수') {
        this.routineMessage = '수요일 루틴 작성'
      } else if (day === '목') {
        this.routineMessage = '목요일 루틴 작성'
      } else if (day === '금') {
        this.routineMessage = '금요일 루틴 작성'
      } else if (day === '토') {
        this.routineMessage = '토요일 루틴 작성'
      } else if (day === '일') {
        this.routineMessage = '일요일 루틴 작성'
      }
    },
    async saveRoutine() {
      try {
        // 사용자 정보 가져오기
        const response = await axios.get(`/user/${this.username}`)
        const user = response.data

        // 루틴 데이터 생성
        const routineData = {
          username: user.username,
          day: this.routineData.day,
          exercises: this.newExercise
        }

        // 서버에 루틴 데이터를 보내서 저장
        await axios.post('/save-routine', routineData)

        // 저장 후에 폼 초기화
        this.newExercise = ''
        // 루틴 입력 폼 숨기기
        this.showInputs = false
        // 루틴 저장 후에 목록 다시 불러오기
        this.fetchRoutines()
      } catch (error) {
        console.error('루틴을 저장하는 중 오류 발생:', error)
      }
    },
    async fetchRoutines() {
      try {
        // 서버에서 루틴 데이터를 가져오기
        const response = await axios.get(`/get-routines/${this.username}`)
        this.routines = response.data.routines
      } catch (error) {
        console.error('루틴을 불러오는 중 오류 발생:', error)
      }
    },
    async addExerciseToRoutine() {
      // 사용자가 선택한 요일에 대한 루틴 찾기
      const day = this.routineData.day
      const existingRoutine = this.routines.find(
        (routine) => routine.day === day
      )

      if (existingRoutine) {
        // 이미 해당 요일에 루틴이 있는 경우, 새로운 운동을 추가
        existingRoutine.exercises.push(this.newExercise)
      } else {
        // 해당 요일에 루틴이 없는 경우, 새로운 루틴 생성
        const newRoutine = {
          day: day,
          exercises: [this.newExercise]
        }
        this.routines.push(newRoutine)
      }

      // 입력 폼 초기화
      this.newExercise = ''
    }
  }
}
</script>
<style scoped>
#mylutin_all {
  display: flex;
  background-color: #585656;
  margin: 0;
  width: 100%;
  height: 100%;
}
#mylutin_sidebar {
  background-color: #d9d9d9;
  margin: 30px 0 0 30px;
  width: 13%;
  height: 20%;
}
#mylutin_sidebar li {
  color: lightslategray;
  margin: 30px 0 10px 20px;
}
#mylutin_sidebar li:nth-child(2) {
  color: black;
  font-size: 20px;
  font-weight: bold;
}
#mylutin_content {
  background-color: #d9d9d9;
  margin: 30px;
  width: 85%;
  height: auto;
}
.weekday-list {
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.weekday-button,
.weekend-button {
  font-size: 20px;
  font-weight: bold;
  padding: 10px 20px; /* 상하 10px, 좌우 20px의 안간격을 지정합니다. */
  border: none; /* 버튼의 기본 테두리를 제거합니다. */
  border-radius: 5px; /* 둥근 모서리를 추가합니다. */
  background-color: #2d8a7d; /* 빨간색 */
  color: #fff; /* 흰색 텍스트 */
  margin-right: 5px; /* 각 버튼 사이의 오른쪽 여백을 지정합니다. */
  cursor: pointer; /* 커서를 포인터로 변경하여 버튼임을 나타냅니다. */
}

.weekday-button:hover,
.weekend-button:hover {
  background-color: #585656; /* 호버 상태에서 배경색 변경 */
}
.page-title {
  text-align: center; /* 가운데 정렬 */
}

.username {
  position: absolute; /* 절대 위치 지정 */
  top: 30px; /* 위에서 10px 떨어진 위치 */
  right: 10px; /* 오른쪽에서 10px 떨어진 위치 */
}
.youtube {
  display: flex;
  justify-content: space-around;
  margin-top: 100px;
}
.youtube1 {
  width: 350px;
  height: 300px;
}
.youtube2 {
  width: 370px;
  height: 300px;
}
.youtube3 {
  width: 450px;
  height: 300px;
}
.routine-inputs {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
.routine-inputs input {
  margin-bottom: 10px;
  border: none;
  border-bottom: 2px solid black;
  font-size: 24px;
  padding: 9px;
  width: 50%;
  background-color: #d9d9d9;
  margin-left: 50px;
}
</style>
