
const { ContactsRepository } = require('../repository')

class ContactsService {
  constructor() {
    this.repository = {
      contacts: new ContactsRepository(),
    }
  }

  async listContacts(userId, query) {
    const data = await this.repository.contacts.listContacts(userId, query)
    const { docs: contacts, totalDocs: total, limit, page: pageNumber, favorite } = data
    return { contacts, total, limit, pageNumber, favorite }
  }

  async getContactById(userId, id) {
    const data = await this.repository.contacts.getContactById(userId, id)
    return data
  }

  async addContact(userId, body) {
    const data = await this.repository.contacts.addContact(userId, body)
    return data
  }

  async updateContact(userId, id, body) {
    const data = await this.repository.contacts.updateContact(userId, id, body)
    return data
  }

  async removeContact(userId, id) {
    const data = await this.repository.contacts.removeContact(userId, id)

    return data
  }

  async updateStatusContact(userId, id, body) {
    const data = await this.repository.contacts.updateStatusContact(userId, id, body)
    return data
  }
}

module.exports = ContactsService
