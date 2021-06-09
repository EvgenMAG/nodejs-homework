/* eslint-disable new-cap */
const User = require('../schemas/users')

class UserRepository {
  constructor() {
    this.model = User
  }

  async findById(id) {
    const user = await this.model.findOne({ _id: id })
    return user
  }

  async findByEmail(email) {
    const user = await this.model.findOne({ email })
    // console.log(result)
    return user
  }

  async create(body) {
    const user = new this.model(body)
    return user.save()
  }

  async updateToken(id, token) {
    await this.model.updateOne({ _id: id }, { token })
  }

  async getCurrentUser(id) {
    const { name, email, subscription } = await this.model.findOne({ _id: id })
    return { name, email, subscription }
  }

  async updateSubscriptionStatus(id, body) {
    const user = await this.model.findOneAndUpdate(
      { _id: id },
      { ...body },
      { new: true }
    )
    return user
  }
}

module.exports = UserRepository
