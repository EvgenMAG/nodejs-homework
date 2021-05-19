
const { v4: uuid } = require('uuid')
const db = require('../db')

class ContactsRepository {
  listContacts() {
    return db.get('contacts').value()
  }

  getContactById(id) {
    return db.get('contacts').find({ id }).value()
  }

  addContact(body) {
    const id = uuid()
    const newContact = {
      id,
      ...body,
    }

    db.get('contacts').push(newContact).write()

    return newContact
  }

  updateContact(id, body) {
    const changedContact = db.get('contacts').find({ id }).assign(body).value()

    db.write()

    return changedContact
  }

  removeContact(id) {
    const [contact] = db.get('contacts').remove({ id }).write()
    return contact
  }
}

module.exports = ContactsRepository
