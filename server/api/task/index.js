const express = require('express')
const router = express.Router()
const { getTasks, getActivities, getTaskHistory } = require('./task.controller')

router.get('/', getTasks)
router.get('/history', getTaskHistory)
router.get('/:tskId/activities', getActivities)

module.exports = router