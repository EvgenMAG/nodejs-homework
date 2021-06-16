const express = require('express')
const {
  register,
  login,
  logout,
  currentUser,
  subscriptionStatus,
  avatars,
  verify,
  reVerifying

} = require('../controllers/users')
const { validateCreateUser, validateStatusSubscription } = require('../validation/contactsValidation')
const router = express.Router()
const guard = require('../helpers/guard')
const { createAccountLimiter } = require('../helpers/rate-limit')
const upload = require('../helpers/upload')

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
  .patch('/avatars', guard, upload.single('avatar'), avatars)
  .get('/verify/:verificationToken', verify)
  .post('/verify', reVerifying)

module.exports = router
