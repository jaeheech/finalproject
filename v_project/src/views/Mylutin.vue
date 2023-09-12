<template>
  <div id="mylutin_all">
    <div id="mylutin_sidebar">
      <ul>
        <li v-for="item in sideBar" :key="item">
          <a :href="getLink(item)">{{ item }}</a>
        </li>
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
      <div class="routine-inputs">
        <h2 v-if="!showInputs">{{ routineMessage }}</h2>
        <div v-else>
          <h2>{{ routineMessage }}</h2>
          <div class="routine_button">
            <input
              type="text"
              v-model="newExercise"
              placeholder="루틴을 입력하세요"
            />
            <button @click="saveRoutine" class="save-button">저장</button>
            <button @click="showInputs = false" class="cancel-button">
              취소
            </button>
          </div>
        </div>
      </div>
      <div class="routine-list">
        <h2>루틴 목록</h2>
        <ul>
          <li v-for="(routines, day) in routinesByDay" :key="day">
            <p>
              {{ day }}요일 루틴:
              <span v-for="(routine, index) in routines" :key="index">
                {{ index + 1 }}. {{ routine.exercises.join(', ') }}
                <button
                  @click="editRoutine(routine)"
                  style="
                    background: #ffe600;
                    font-weight: bold;
                    margin: 0px 30px 0px 10px;
                  "
                >
                  수정
                </button>
              </span>
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
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>루틴 수정</h2>
        <input
          type="text"
          v-model="editedExercise"
          placeholder="수정할 내용 입력"
        />
        <div id="button_content">
          <button @click="saveEditedRoutine">저장</button>
          <button @click="deleteRoutine">삭제</button>
          <button @click="closeModal">취소</button>
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
      sideBar: [
        '부위별 운동',
        '나만의 루틴',
        '운동자세 교정',
        '집근처 헬스장',
        '자유게시판'
      ],
      user: null,
      showInputs: false,
      routineData: {
        exercises: []
      },
      newExercise: '',
      routineMessage: '버튼을이용해 루틴을 작성하세요.',
      routines: [],
      routinesByDay: {
        월: [],
        화: [],
        수: [],
        목: [],
        금: [],
        토: [],
        일: []
      },
      showModal: false,
      editedExercise: '',
      editedRoutineId: null
    }
  },
  created() {
    // 사용자 정보 가져오기
    if (this.username) {
      this.fetchUserInfo(this.username)
    }
    this.fetchRoutines()
    console.log(this.fetchRoutines)
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

    showRoutineInputs(day, routine = null) {
      this.routineData.day = day

      if (routine) {
        // 수정 버튼을 클릭한 경우, 루틴 데이터를 불러와 폼에 채움
        this.newExercise = routine.exercises.join(', ')
        this.editedRoutineId = routine._id // 수정할 루틴의 ID를 저장
      } else {
        // 새 루틴을 추가하는 경우, 루틴 데이터 초기화하고 수정 모드 비활성화
        this.newExercise = ''
        this.editedRoutineId = null // 수정 모드가 아닌 경우 ID를 null로 설정
      }

      // 폼을 표시하고 루틴 작성 메시지를 업데이트
      this.showInputs = true
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
          exercises: [this.newExercise]
        }

        if (this.editedRoutineId) {
          // 수정 모드에서 루틴을 업데이트합니다.
          await axios.put(
            `/update-routine/${this.editedRoutineId}`,
            routineData
          )
          // 수정 모드에서 루틴을 저장한 후 폼 초기화
          this.newExercise = ''
          // 수정 모드에서 루틴을 저장한 후 editedRoutineId를 초기화합니다.
          this.editedRoutineId = null
        } else {
          // 새 루틴을 추가할 때 editedRoutineId를 초기화합니다.
          this.editedRoutineId = null
          // 수정 모드가 아닌 경우, 해당 요일의 모든 루틴을 대체합니다.
          const response = await axios.post(
            '/save-routine', // 수정 모드가 아닌 경우 저장 엔드포인트를 사용합니다.
            routineData
          )
          // 저장 후에 폼 초기화
          this.newExercise = ''
          // 저장 후에 서버에서 받아온 루틴을 추가합니다.
          this.routines.push(response.data.routine)
        }

        // 루틴 입력 폼 숨기기
        this.routineMessage = '버튼을 이용해 루틴을 작성하세요.'
        alert('저장되었습니다.')
        this.showInputs = false
        this.fetchRoutines()
      } catch (error) {
        console.error('루틴을 저장 또는 수정하는 중 오류 발생:', error)
      }
    },
    async fetchRoutines() {
      try {
        // 서버에서 루틴 데이터를 가져오기
        const response = await axios.get(`/get-routines/${this.username}`)
        this.routines = response.data.routines

        // Initialize routinesByDay with empty arrays for each day
        this.routinesByDay = {
          월: [],
          화: [],
          수: [],
          목: [],
          금: [],
          토: [],
          일: []
        }

        this.routines.forEach((routine) => {
          // Make sure routine.day is a valid day of the week
          if (this.routinesByDay[routine.day]) {
            this.routinesByDay[routine.day].push(routine)
          }
        })
      } catch (error) {
        console.error('루틴을 불러오는 중 오류 발생:', error)
      }
    },
    editRoutine(routine) {
      this.showModal = true
      this.editedExercise = routine.exercises.join(', ')
      this.editedRoutineId = routine._id
    },
    closeModal() {
      this.showModal = false
    },
    async saveEditedRoutine() {
      try {
        // 수정된 내용을 서버로 보내기 위한 데이터 준비
        const updatedRoutineData = {
          exercises: this.editedExercise
            .split(',')
            .map((exercise) => exercise.trim())
        }

        // Axios를 사용하여 서버에 수정된 루틴 데이터 보내기
        await axios.put(
          `/update-routine/${this.editedRoutineId}`,
          updatedRoutineData
        )

        // 수정이 완료되면 showModal을 false로 설정하여 모달을 닫습니다.
        alert('수정 되었습니다.')
        this.showModal = false

        this.fetchRoutines()
      } catch (error) {
        console.error('루틴 수정 중 오류 발생:', error)
      }
    },
    async deleteRoutine() {
      try {
        if (!this.editedRoutineId) {
          // 수정 중인 루틴 ID가 없다면 아무것도 하지 않음
          return
        }

        // Axios를 사용하여 서버에 루틴 삭제 요청 보내기
        await axios.delete(`/delete-routine/${this.editedRoutineId}`)

        // 삭제 후에 showModal을 false로 설정하여 모달을 닫습니다.
        this.showModal = false

        // 삭제한 루틴을 화면에서도 제거하기 위해 데이터 업데이트
        this.removeDeletedRoutine(this.editedRoutineId)
      } catch (error) {
        console.error('루틴 삭제 중 오류 발생:', error)
      }
    },
    removeDeletedRoutine(routineId) {
      this.routines = this.routines.filter(
        (routine) => routine._id !== routineId
      )

      // this.routinesByDay 객체에서도 해당 루틴을 찾아 제거해야 합니다.
      for (const day in this.routinesByDay) {
        this.routinesByDay[day] = this.routinesByDay[day].filter(
          (routine) => routine._id !== routineId
        )
      }
    },
    getLink(item) {
      switch (item) {
        case '부위별 운동':
          return 'http://localhost:3000/part'
        case '나만의 루틴':
          return 'http://localhost:3000/mylutin'
        case '운동자세 교정':
          return 'http://localhost:3000/fixed'
        case '집근처 헬스장':
          return 'http://localhost:3000/neargym'
        case '자유게시판':
          return 'http://localhost:3000/Board'
        default:
          return ''
      }
    }
  }
}
</script>
<style scoped>
.modal {
  /* 모달을 화면 중앙에 표시하기 위한 스타일 */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: black;
  color: #ffe600;
  padding: 20px;
  z-index: 9999;
  border: 3px solid #ffe600;
}
#button_content {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
#button_content button {
  background-color: #ffe600;
  font-weight: bold;
}
#mylutin_all {
  display: flex;
  background-color: black;
  margin: 0;
  width: 100%;
  height: 100%;
}
#mylutin_sidebar {
  background-color: #ffe600;
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
  background-color: #ffe600;
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
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: black;
  color: #ffe600;
  margin-right: 5px;
  cursor: pointer;
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
  background-color: #ffe600;
  margin-left: 40px;
  margin-right: 50px;
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
.save-button {
  margin-top: 10px;
  width: 100px;
  height: 40px;
  font-size: 18px;
  letter-spacing: 3px;
  background-color: rgb(0, 0, 0);
  color: rgb(255, 230, 0);
  border-radius: 10px;
  margin-left: auto;
  margin-right: 30px;
}
.cancel-button {
  margin-top: 10px;
  width: 100px;
  height: 40px;
  font-size: 18px;
  letter-spacing: 3px;
  background-color: rgb(0, 0, 0);
  color: rgb(255, 230, 0);
  border-radius: 10px;
  margin-left: auto;
  margin-right: 10px;
}
.routine-list ul {
  list-style: none;
  padding: 0;
}

.routine-list li {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: black; /* Alternate background colors */
  color: #ffe600;
}

.routine-list li:nth-child(even) {
  background-color: #6d6c6c; /* Alternate background colors */
  color: #ffe600;
}

.routine-list p {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.routine-list {
  margin-top: 20px;
  padding: 10px;
}

.routine-list h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.routine-list li:hover {
  background-color: #d0d0d0; /* Hover effect */
  transition: background-color 0.3s ease-in-out;
}
.input_routine {
  display: flex;
}
</style>
