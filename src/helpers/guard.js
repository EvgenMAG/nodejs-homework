const passport = require('passport')
require('../config/passport')
const { HttpCode } = require('./constants')

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    const headerAuth = req.get('Authorization')
    let token = null
    if (headerAuth) {
      token = headerAuth.split(' ')[1]
    }
    if (err || !user || token !== user?.token) {
      return res.status(HttpCode.UNAUTHORISED).json(
        {
          status: 'error',
          code: HttpCode.UNAUTHORISED,
          message: 'Not authorized'
        }
      )
    }
    req.user = user
    //   res.locals.user = user   --- that is right way, but it doesn't used --- переменная на текущем запросе
    //  req.app.locals --- глобальная переменная
    return next()
  })(req, res, next)
}

module.exports = guard
