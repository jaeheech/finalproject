const express = require('express')
const router = express.Router()
const RoutineSchema = require('../RoutineSchema.cjs')
/* 나만의 루틴 저장 */
router.post('/save-routine', async (req, res) => {
  try {
    const username = req.params.username
    const routineData = req.body
    console.log(routineData)
    // 루틴 데이터를 MongoDB에 저장
    const routine = new RoutineSchema({
      username: routineData.username, // 클라이언트에서 보낸 사용자 아이디
      day: routineData.day, // 클라이언트에서 보낸 요일
      exercises: routineData.exercises // 클라이언트에서 보낸 운동 목록
    })

    await routine.save()

    res.json({ success: true, message: '루틴이 성공적으로 저장되었습니다.' })
  } catch (error) {
    console.error('루틴을 저장하는 중 오류 발생:', error)
    res.status(500).json({
      success: false,
      message: '루틴을 저장하는 중 오류 발생했습니다.'
    })
  }
})
/* 저장된 루틴 불러오기 */
router.get('/get-routines/:username', async (req, res) => {
  try {
    const username = req.params.username

    // 해당 사용자의 모든 루틴을 불러옵니다.
    const routines = await RoutineSchema.find({ username })

    res.json({ success: true, routines })
  } catch (error) {
    console.error('루틴을 불러오는 중 오류 발생:', error)
    res.status(500).json({
      success: false,
      message: '루틴을 불러오는 중 오류 발생했습니다.'
    })
  }
})
module.exports = router
