
const Contact = require('../schemas/contacts')

class ContactsRepository {
  constructor() {
    this.model = Contact
  }

  async listContacts(userId, { page = 1, limit = 5, sortBy, sortByDesc, filter, favorite = null }) {
    const optionSearch = { owner: userId }
    if (favorite !== null) {
      optionSearch.favorite = favorite
    }
    const result = await this.model.paginate(optionSearch, {
      limit,
      page,
      sort: {
        ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
        ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {})
      },
      select: filter ? filter.split('|').join(' ') : '',
      populate: {
        path: 'owner',
        select: 'name email subscription',
      },
    })
    return result
  }

  async getContactById(userId, id) {
    const result = await this.model.findOne({ _id: id, owner: userId }).populate({
      path: 'owner',
      select: 'name email subscription',
    })
    return result
  }

  async addContact(userId, body) {
    const newContact = await this.model.create({ ...body, owner: userId })

    return newContact
  }

  async updateContact(userId, id, body) {
    const updatedClient = await this.model.findByIdAndUpdate(
      { _id: id, owner: userId },
      { ...body },
      { new: true }
    )
    return updatedClient
  }

  async removeContact(userId, id) {
    const removedClient = await this.model.findByIdAndRemove({ _id: id, owner: userId },
    )
    return removedClient
  }

  async updateStatusContact(userId, id, body) {
    const updatedClient = await this.model.findByIdAndUpdate({ _id: id, owner: userId },
      { ...body },
      { new: true }
    )
    return updatedClient
  }
}

module.exports = ContactsRepository
