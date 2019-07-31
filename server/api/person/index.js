const express = require('express')
const router = express.Router()
const { getRetire, getLicenseExpire } = require('./person.controller')

router.get('/retires', getRetire)
router.get('/licenses/expires', getLicenseExpire)

module.exports = router