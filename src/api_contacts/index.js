const express = require('express')
const router = express.Router()

router
  .use('/contacts', require('./contacts'))
  .use('/users', require('./users'))

module.exports = router
