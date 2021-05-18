
const ContactsRepository = require('../repository')

class ContactsService {
  constructor() {
    this.repository = {
      contacts: new ContactsRepository(),
    }
  }

  listContacts() {
    const data = this.repository.contacts.listContacts()
    return data
  }

  getContactById(id) {
    const data = this.repository.contacts.getContactById(id)
    return data
  }

  addContact(body) {
    const data = this.repository.contacts.addContact(body)
    return data
  }

  updateContact(id, body) {
    const data = this.repository.contacts.updateContact(id, body)
    return data
  }

  removeContact(id) {
    const data = this.repository.contacts.removeContact(id)

    return data
  }
}

module.exports = ContactsService
