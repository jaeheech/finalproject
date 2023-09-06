const express = require('express')
const router = express.Router()
const RoutineSchema = require('../RoutineSchema.cjs')

/* 나만의 루틴 저장 */
router.post('/save-routine', async (req, res) => {
  try {
    const username = req.body.username
    const routineData = req.body

    // 루틴 데이터를 MongoDB에 저장
    const routine = new RoutineSchema({
      username: routineData.username,
      day: routineData.day,
      exercises: routineData.exercises
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

    console.log('Username', username)

    // 해당 사용자의 모든 루틴을 불러옵니다.
    const routines = await RoutineSchema.find({ username })
    console.log(routines)
    res.json({ success: true, routines })
  } catch (error) {
    console.error('루틴을 불러오는 중 오류 발생:', error)
    res.status(500).json({
      success: false,
      message: '루틴을 불러오는 중 오류 발생했습니다.'
    })
  }
})

/* 루틴 업데이트 */
router.put('/update-routine/:routineId', async (req, res) => {
  try {
    const routineId = req.params.routineId
    const updatedRoutineData = req.body

    // 루틴을 업데이트합니다.
    const updatedRoutine = await RoutineSchema.findByIdAndUpdate(
      routineId,
      updatedRoutineData,
      { new: true } // 업데이트 후의 데이터를 반환합니다.
    )

    if (!updatedRoutine) {
      return res.status(404).json({
        success: false,
        message: '해당 루틴을 찾을 수 없습니다.'
      })
    }

    res.json({
      success: true,
      message: '루틴이 성공적으로 업데이트되었습니다.',
      updatedRoutine: updatedRoutine
    })
  } catch (error) {
    console.error('루틴을 업데이트하는 중 오류 발생:', error)
    res.status(500).json({
      success: false,
      message: '루틴을 업데이트하는 중 오류 발생했습니다.'
    })
  }
})
/* 루틴 삭제 */
router.delete('/delete-routine/:routineId', async (req, res) => {
  try {
    const routineId = req.params.routineId

    // 루틴을 삭제합니다.
    const deletedRoutine = await RoutineSchema.findByIdAndRemove(routineId)

    if (!deletedRoutine) {
      return res.status(404).json({
        success: false,
        message: '해당 루틴을 찾을 수 없습니다.'
      })
    }

    res.json({
      success: true,
      message: '루틴이 성공적으로 삭제되었습니다.',
      deletedRoutine: deletedRoutine
    })
  } catch (error) {
    console.error('루틴을 삭제하는 중 오류 발생:', error)
    res.status(500).json({
      success: false,
      message: '루틴을 삭제하는 중 오류 발생했습니다.'
    })
  }
})
module.exports = router
