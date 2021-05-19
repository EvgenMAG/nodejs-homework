const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const { HttpCode } = require('./helpers/constants')

const contactsRouter = require('./api_contacts/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res, next) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    message: `USe api on routtes ${req.baseUrl}/api/contacts`,
    data: 'Not Found',
  })
})

app.use((err, req, res, next) => {
  err.status = err.status ? err.status : HttpCode.INTERNAL_SERVER_ERROR
  res.status(err.status).json({
    status: err.status === 500 ? 'fail' : 'error',
    code: err.status,
    message: err.status,
    data: err.status === 500 ? 'Internal Server Error' : 'err.data',
  })
})

module.exports = app
