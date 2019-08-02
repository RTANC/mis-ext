const express = require('express')
const router = express.Router()
const { getRetire, getLicenseExpire, getTeacher } = require('./person.controller')

router.get('/retires', getRetire)
router.get('/licenses/expires', getLicenseExpire)
router.get('/teachers', getTeacher)

module.exports = router