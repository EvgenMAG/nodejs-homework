
const { UserRepository } = require('../repository')
const EmailService = require('./email-verification')
const ErrorHandler = require('../helpers/errorHandlers')
const { v4: uuidv4 } = require('uuid')

class UserService {
  constructor() {
    this.repository = {
      users: new UserRepository(),
      email: new EmailService()
    }
  }

  async create(body) {
    const verifyToken = uuidv4()
    // send email for verification
    const { subscription, email } = body
    try {
      console.log(this.repository.email.sendEmail(verifyToken, subscription, email))
      await this.repository.email.sendEmail(verifyToken, email)
    } catch (e) {
      throw new ErrorHandler(503, e.message, 'Service Unavailable!')
    }
    const data = await this.repository.users.create({ ...body, verifyToken })
    return data
  }

  async verify({ verificationToken }) {
    const user = await this.repository.users.findByField({
      verifyToken: verificationToken,
    })
    if (user) {
      await user.updateOne({ verify: true, verifyToken: null })
      return true
    }
    return false
  }

  async reVerifying(email) {
    const user = await this.repository.users.findByField({ email: email })
    if (user) {
      const { verifyToken } = user
      await this.repository.email.reSendEmail(verifyToken, email)
    }
    return user
  }

  async findByEmail(email) {
    const data = await this.repository.users.findByEmail(email)
    return data
  }

  async findById(id) {
    const data = await this.repository.users.findById(id)
    return data
  }

  async getCurrentUser(id) {
    const data = await this.repository.users.getCurrentUser(id)
    return data
  }

  async updateSubscriptionStatus(id, body) {
    const data = await this.repository.users.updateSubscriptionStatus(id, body)
    return data
  }

  async updateAvatar(id, avatarUrl, idClaudAvatar) {
    const data = await this.repository.users.updateAvatarRepo(id, avatarUrl, idClaudAvatar)
    return data
  }
}

module.exports = UserService
