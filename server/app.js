const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const api = require('./api')

app.use(bodyParser.json())
app.use(cors())

app.use('/api', api)

app.use((err ,req, res, next) => {
    res.status(err.status || 500).send({
        error: {
            message: err.message
        }
    })
})
module.exports = app
