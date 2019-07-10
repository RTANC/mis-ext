const express = require('express')
const router = express.Router()
const { getRetire } = require('./person.controller')

router.get('/retires', getRetire)

module.exports = router