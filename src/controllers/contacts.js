const { HttpCode } = require('../helpers/constants')
const ContactsService = require('../services')

const contactsService = new ContactsService()

const listContacts = (req, res, next) => {
  try {
    const contacts = contactsService.listContacts()
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        contacts,
      }
    })
  } catch (e) {
    next(e)
  }
}
const getContactById = (req, res, next) => {
  try {
    const contact = contactsService.getContactById(req.params.contactId)
    if (contact) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        }

      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not Found contact',
        data: 'Not Found contact',
      })
    }
  } catch (e) {
    next(e)
  }
}
const removeContact = (req, res, next) => {
  try {
    const contact = contactsService.removeContact(req.params.contactId)
    if (contact) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        }

      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not Found contact',
        data: 'Not Found contact',
      })
    }
  } catch (e) {
    next(e)
  }
}

const addContact = (req, res, next) => {
  try {
    console.log(req.body)
    const contact = contactsService.addContact(req.body)
    res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        contact,
      }
    })
  } catch (e) {
    next(e)
  }
}
const updateContact = (req, res, next) => {
  try {
    console.log(req.body)
    console.log(req.params.contactId)
    const contact = contactsService.updateContact(req.params.contactId, req.body)
    if (contact) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        }

      })
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: 'Not Found contact',
        data: 'Not Found contact',
      })
    }
  } catch (e) {
    next(e)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
