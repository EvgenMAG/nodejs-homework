
const { UserRepository } = require('../repository')
const jwt = require('jsonwebtoken')
// require('dotenv').config()
// const SECRET_KEY = process.env.SECRET_KEY
// console.log(SECRET_KEY)

const SECRET_KEY = 'secret'

class AuthService {
  constructor() {
    this.repository = {
      users: new UserRepository(),
    }
  }

  async login({ email, password }) {
    const user = await this.repository.users.findByEmail(email)
    const isValidPassword = await user?.validPassword(password)
    if (!user || !isValidPassword) {
      return null
    }

    const id = user.id
    const payload = { id }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '5h' })
    await this.repository.users.updateToken(id, token)
    return token
  }

  async logout(id) {
    const data = await this.repository.users.updateToken(id, null)
    return data
  }
}

module.exports = AuthService
