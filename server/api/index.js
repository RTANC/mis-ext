const express = require('express')
const router = express.Router()
const taskRoutes = require('./task')
const personRoutes = require('./person')

router.use('/tasks', taskRoutes)
router.use('/persons', personRoutes)

module.exports = router