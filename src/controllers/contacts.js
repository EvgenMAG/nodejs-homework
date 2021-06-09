const { HttpCode } = require('../helpers/constants')
const { ContactsService } = require('../services')

const contactsService = new ContactsService()

const listContacts = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contacts = await contactsService.listContacts(userId, req.query)
    res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        ...contacts,
      }
    })
  } catch (e) {
    next(e)
  }
}
const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await contactsService.getContactById(userId, req.params.contactId)
    if (contact) {
      res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        }

      })
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Not Found contact',
      })
    }
  } catch (e) {
    next(e)
  }
}
const removeContact = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await contactsService.removeContact(userId, req.params.contactId)
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
    const userId = req.user.id

    const contact = await contactsService.addContact(userId, req.body)
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
    const userId = req.user.id
    const contact = await contactsService.updateContact(userId, req.params.contactId, req.body)
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
    const userId = req.user.id
    const contact = await contactsService.updateStatusContact(userId, req.params.contactId, req.body)
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
