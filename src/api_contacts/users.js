const express = require('express')
const {
  register,
  login,
  logout,
  currentUser,
  subscriptionStatus

} = require('../controllers/users')
const { validateCreateUser, validateStatusSubscription } = require('../validation/contactsValidation')
const router = express.Router()
const guard = require('../helpers/guard')
const { createAccountLimiter } = require('../helpers/rate-limit')

router
  .post('/signup', createAccountLimiter, validateCreateUser, register)
  .post('/login', login)
  .post('/logout', guard, logout)
  .get('/current', guard, currentUser)
  .patch(
    '/',
    guard,
    validateStatusSubscription,
    subscriptionStatus
  )

module.exports = router
