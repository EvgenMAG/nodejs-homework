
const { HttpCode } = require('../helpers/constants')
const { UserService, AuthService, LocalUploadAvatarService, UploadService } = require('../services')
const path = require('path')
const fs = require('fs/promises')
require('dotenv').config()

const serviceUser = new UserService()
const serviceAuth = new AuthService()

const register = async (req, res, next) => {
  const { password, email, subscription, avatar } = req.body

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
    const newUser = await serviceUser.create({ password, email, subscription, avatar })
    return res.status(HttpCode.CREATED).json({
      Status: HttpCode.CREATED,
      ContentType: 'application / json',
      ResponseBody: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
          avatar: newUser.avatar
        }
      }
    })
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body

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
  } catch (error) {
    next(error)
  }
}

// //// ---------------LOCAL UPLOAD ---------//////

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id

    const pathToUserFile = path.join(process.env.IMAGE_DIR, process.env.AVATAR_USERS_DIR)
    console.log(id)
    const uploads = new LocalUploadAvatarService(pathToUserFile)
    const avatarUrl = await uploads.saveAvatar({ idUser: id, file: req.file })

    try {
      await fs.unlink(path.join(pathToUserFile, req.user.avatarURL))
    } catch (e) {
    }
    await serviceUser.updateAvatar(id, avatarUrl)
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {

        avatarUrl
      },
    })
  } catch (e) {
    next(e)
  }
}

// //// ---------------CLOUD UPLOAD ---------//////

// const avatars = async (req, res, next) => {
//   try {
//     const id = req.user.id
//     const uploads = new UploadService()
//     const {idClaudAvatar,avatarUrl} = await uploads.saveAvatar(req.file.path,req.user.idClaudAvatar)

//       await fs.unlink(req.file.path)

//     await serviceUser.updateAvatar(id, avatarUrl, idClaudAvatar)
//     return res.status(HttpCode.OK).json({
//       status: 'success',
//       code: HttpCode.OK,
//       data: {
//         avatarUrl
//       },
//     })
//   } catch (e) {
//     next(e)
//   }
// }

module.exports = {
  register,
  login,
  logout,
  currentUser,
  subscriptionStatus,
  avatars
}
