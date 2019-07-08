const express = require('express')
const router = express.Router()
const { getTasks } = require('./task.controller')

router.get('/', getTasks)

module.exports = router