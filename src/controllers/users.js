
const { HttpCode } = require('../helpers/constants')
const { UserService, AuthService } = require('../services')

const serviceUser = new UserService()
const serviceAuth = new AuthService()

const register = async (req, res, next) => {
  const { password, email, subscription } = req.body
  console.log(email)
  console.log(password)

  const user = await serviceUser.findByEmail(email)
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: HttpCode.CONFLICT,
      ContentType: 'application / json',
      ResponseBody: {
        message: 'Email in use'
      }
    })
  }
  try {
    const newUser = await serviceUser.create({ password, email, subscription })
    return res.status(HttpCode.CREATED).json({
      Status: HttpCode.CREATED,
      ContentType: 'application / json',
      ResponseBody: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription
        }
      }
    })
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  console.log(req.body)

  try {
    const token = await serviceAuth.login({ email, password })
    const user = await serviceUser.findByEmail(email)
    if (token) {
      return res.status(HttpCode.OK).json({
        Status: HttpCode.OK,
        ContentType: 'application / json',
        ResponseBody: {
          user: {
            email: user.email,
            subscription: user.subscription,
            token: token
          }
        }
      })
    }

    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: 'Invalid creadentials',
    })
  } catch (error) {
    next(error)
  }
}

const logout = async (req, res, next) => {
  const id = req.user.id
  await serviceAuth.logout(id)
  return res.json({
    Status: HttpCode.NO_CONTENT,
    ContentType: 'application / json',
    message: 'Logout done'

  })
}

const currentUser = async (req, res, next) => {
  try {
    const user = await serviceUser.getCurrentUser(req.user.id)

    if (user) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { user },
      })
    }
    next({
      status: HttpCode.UNAUTHORIZED,
      message: 'You should login first',
    })
  } catch (error) {
    next(error)
  }
}

const subscriptionStatus = async (req, res, next) => {
  try {
    const user = await serviceUser.updateSubscriptionStatus(
      req.user.id,
      req.body
    )
    if (user) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          user: {
            name: user.name,
            email: user.email,
            subscription: user.subscription,
          },
        },
      })
    }
    next({
      status: HttpCode.UNAUTHORIZED,
      message: 'You are not authorized',
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  register,
  login,
  logout,
  currentUser,
  subscriptionStatus
}
