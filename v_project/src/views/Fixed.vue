<template>
  <div id="fixed_all">
    <div id="fixed_sidebar">
      <ul>
        <li v-for="item in sideBar" :key="item">
          <a :href="getLink(item)">{{ item }}</a>
        </li>
      </ul>
    </div>
    <div id="fixed_content">
      <div id="fixed_content_title" style="border-bottom: 4px solid black">
        <h1 style="text-align: center; letter-spacing: 2px">운동자세 교정</h1>
      </div>
      <div id="fixed_content_cam">
        <div id="cam">
          <video
            ref="video"
            id="video"
            width="640"
            height="480"
            autoplay
            muted
            playsinline
            style="position: absolute"
          ></video>
          <canvas ref="canvas" id="canvas" style="position: absolute"></canvas>
        </div>
        <button ref="button" @click="analyzePose">분석 시작</button>
        <div id="result_label">{{ poseResult }}</div>
      </div>
      <div id="warning_point">
        <h2>촬영시 주의사항 <small>📢필독</small></h2>
        <h4>
          📌 인식오류를 띄울 수 있으니 가급적 밝은 곳에서 촬영을 진행해주시기를
          당부드립니다.
        </h4>
        <h4>
          📌 촬영중임을 주위사람들에게 알리고, 미리 양해를 구하신 후 본 촬영에
          임해주시기를 바랍니다.
        </h4>
        <h4>
          📌 본 촬영은 짧은 녹화본을 토대로 결과를 도출하기 때문에 가급적 유동
          인구가 적은곳에서 하십시오.
        </h4>
        <h4>
          📌 양해를 구하지않고 진행할시 초상권 침해 등을 위반하는 행위이며 이에
          대한 책임은 촬영자 본인에게 있습니다.
        </h4>
      </div>
    </div>
  </div>
</template>
<script>
import * as posenet from '@tensorflow-models/posenet'
import * as tf from '@tensorflow/tfjs'
import '@tensorflow/tfjs-backend-webgl'
export default {
  data() {
    return {
      sideBar: ['부위별 운동', '운동자세 교정', '집근처 헬스장', '자유게시판'],
      poseResult: '',
      epose: '',
      model: ''
    }
  },
  mounted() {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false
      })
      .then((stream) => {
        const video = this.$refs.video
        video.srcObject = stream
        video.onloadeddata = () => {
          console.log('비디오 데이터 로드 완료')
          // 로드된 모델을 사용하여 포즈를 예측합니다.
          this.loadPoseNetModel()
        }
      })
      .catch((error) => {
        console.error('비디오 스트림을 가져오는 중 오류 발생:', error)
      })
  },
  methods: {
    getLink(item) {
      switch (item) {
        case '부위별 운동':
          return 'http://localhost:3000/part'
        case '운동자세 교정':
          return 'http://localhost:3000/fixed'
        case '집근처 헬스장':
          return 'http://localhost:3000/neargym'
        case '자유게시판':
          return 'http://localhost:3000/Board'
        default:
          return ''
      }
    },
    async loadPoseNetModel() {
      try {
        const loadedModel = await posenet.load()
        this.model = loadedModel
        console.log(this.model)
        console.log('PoseNet 모델이 로드되었습니다.')

        const video = document.getElementById('video')
        console.log(video)
        video.onloadeddata = () => {
          console.log('비디오 데이터 로드 완료')
          // 로드된 모델을 사용하여 포즈를 예측합니다.
          this.predictPose()
        }
      } catch (error) {
        console.error('PoseNet 모델을 로드하는 중 오류 발생:', error)
      }
    },
    async predictPose() {
      const video = document.getElementById('video')
      const canvas = document.getElementById('canvas')
      const context = canvas.getContext('2d')
      console.log(video, canvas, context)
      if (this.model) {
        console.log(this.model)
        const pose = await this.model.estimateSinglePose(video) // 'pose' 변수 정의
        console.log(pose) // 추가: pose 객체 로깅
        if (pose) {
          canvas.width = video.width
          canvas.height = video.height
          this.drawKeypoints(pose.keypoints, 0.6, context)
          this.drawSkeleton(pose.keypoints, 0.6, context)

          // 포즈 추정이 완료되었을 때만 this.epose를 출력
          console.log(this.epose)
          this.analyzePose()
        }
      } else {
        console.error('모델이 아직 로드되지 않았습니다.')
      }
      // 다음 프레임 요청
      requestAnimationFrame(this.predictPose)
    },
    analyzePose() {
      // 포즈 분석 로직을 여기에 추가
      // this.epose를 사용하여 손 위치 분석 등을 수행
      // console.log(this.epose)
      if (this.epose) {
        // 예: 왼손의 y 좌표가 특정 값보다 큰 경우 '왼손을 들었네요!!' 메시지를 생성
        if (
          this.epose.keypoints[9].position.y >
          this.epose.keypoints[10].position.y
        ) {
          this.poseResult = '왼손을 들었네요!!'
        } else {
          this.poseResult = '왼손을 내렸네요!!'
        }
      } else {
        this.poseResult = '포즈 정보가 없습니다.'
      }
      // TensorFlow 리소스를 정리 (선택 사항)
      tf.dispose()
    }
  }
}
</script>

<style scoped>
#fixed_all {
  display: flex;
  background-color: black;
  margin: 0;
  width: 100%;
  height: 100%;
}
#fixed_sidebar {
  background-color: #ffe600;
  margin: 30px 0 0 30px;
  width: 13%;
  height: 20%;
}
#fixed_sidebar li {
  color: lightslategray;
  margin: 30px 0 10px 20px;
}
#fixed_sidebar li:nth-child(2) {
  color: black;
  font-size: 20px;
  font-weight: bold;
}
#fixed_content {
  background-color: #ffe600;
  margin: 30px;
  width: 85%;
  height: 92%;
}
#fixed_content_cam {
  background-color: darkcyan;
  width: 80%;
  height: 50%;
  margin-top: 5%;
  margin-left: 10%;
}
#fixed_content_cam #cam {
  background-color: azure;
  width: 100%;
  height: 90%;
}
#warning_point {
  margin-top: 6%;
  margin-left: 10%;
}
#warning_point h4 {
  margin-left: 15px;
}
</style>
