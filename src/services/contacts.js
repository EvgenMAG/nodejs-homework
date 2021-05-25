
const ContactsRepository = require('../repository')
const db = require('../db')

class ContactsService {
  constructor() {
    process.nextTick(async () => {
      const client = await db
      this.repository = {
        contacts: new ContactsRepository(client),
      }
    })
  }

  async listContacts() {
    const data = await this.repository.contacts.listContacts()
    return data
  }

  async getContactById(id) {
    const data = await this.repository.contacts.getContactById(id)
    return data
  }

  async addContact(body) {
    const data = await this.repository.contacts.addContact(body)
    return data
  }

  async updateContact(id, body) {
    const data = await this.repository.contacts.updateContact(id, body)
    return data
  }

  async removeContact(id) {
    const data = await this.repository.contacts.removeContact(id)

    return data
  }

  async updateStatusContact(id, body) {
    const data = await this.repository.contacts.updateStatusContact(id, body)
    return data
  }
}

module.exports = ContactsService
