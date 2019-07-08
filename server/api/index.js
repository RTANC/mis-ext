const express = require('express')
const router = express.Router()
const taskRoutes = require('./task')

router.use('/tasks', taskRoutes)

module.exports = router