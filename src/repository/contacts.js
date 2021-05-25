
const { ObjectID } = require('mongodb')

class ContactsRepository {
  constructor(client) {
    this.collection = client.db().collection('GoItCollection')
  }

  async listContacts() {
    const results = await this.collection.find({}).toArray()
    return results
  }

  async getContactById(id) {
    const objectID = ObjectID(id)
    const [result] = await this.collection.find({ _id: objectID }).toArray()
    return result
  }

  async addContact(body) {
    const record = {
      ...body,
      ...(body.favorite ? {} : { favorite: false })
    }
    const { ops: [newContact], } = await this.collection.insertOne(record)

    return newContact
  }

  async updateContact(id, body) {
    const objectID = ObjectID(id)
    const { value: updatedClient } = await this.collection.findOneAndUpdate({ _id: objectID },
      { $set: body },
      { returnOriginal: false }
    )
    return updatedClient
  }

  async removeContact(id) {
    const objectID = ObjectID(id)
    const { value: removedClient } = await this.collection.findOneAndDelete({ _id: objectID },
    )
    return removedClient
  }

  async updateStatusContact(id, body) {
    const objectID = ObjectID(id)
    const { value: updatedClient } = await this.collection.findOneAndUpdate({ _id: objectID },
      { $set: body },
      { returnOriginal: false }
    )
    return updatedClient
  }
}

module.exports = ContactsRepository
