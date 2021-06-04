const rateLimit = require('express-rate-limit')
const { HttpCode } = require('./constants')
const { createUserLimit } = require('../config/rateLimit.json')

const createAccountLimiter = rateLimit({
  windowMs: createUserLimit.windowMs,
  max: createUserLimit.max,
  handler: (_req, res) => {
    res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message:
        'Limit creating accounts exceeded. Try later',
    })
  },
})

module.exports = { createAccountLimiter }
