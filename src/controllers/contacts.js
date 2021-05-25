const { HttpCode } = require('../helpers/constants')
const ContactsService = require('../services')

const contactsService = new ContactsService()

const listContacts = async (req, res, next) => {
  try {
    const contacts = await contactsService.listContacts()
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
const getContactById = async (req, res, next) => {
  try {
    const contact = await contactsService.getContactById(req.params.contactId)
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
const removeContact = async (req, res, next) => {
  try {
    const contact = await contactsService.removeContact(req.params.contactId)
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

const addContact = async (req, res, next) => {
  try {
    console.log(req.body)
    const contact = await contactsService.addContact(req.body)
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
const updateContact = async (req, res, next) => {
  try {
    console.log(req.body)
    console.log(req.params.contactId)
    const contact = await contactsService.updateContact(req.params.contactId, req.body)
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

const updateStatusContact = async (req, res, next) => {
  try {
    console.log(req.body)
    console.log(req.params.contactId)
    const contact = await contactsService.updateStatusContact(req.params.contactId, req.body)
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
        status: HttpCode.BAD_REQUEST,
        message: 'missing field favorite',
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
  updateStatusContact
}
