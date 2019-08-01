const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const moment = require('moment')
const api = require('./api')

app.use(bodyParser.json())
app.use(cors())
moment.locale('th')
app.use('/api', api)

app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        error: {
            message: err.message
        }
    })
})
module.exports = app
