
const { UserRepository } = require('../repository')

class UserService {
  constructor() {
    this.repository = {
      users: new UserRepository(),
    }
  }

  async create(body) {
    const data = await this.repository.users.create(body)
    return data
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
}

module.exports = UserService
