const express = require('express')
const contactsControllers = require('../controllers/contacts')
const { validateCreateContact, validateUpdateContact, validateUpdateStatus } = require('../validation/contactsValidation')
const router = express.Router()
const guard = require('../helpers/guard')

router
  .get('/', guard, contactsControllers.listContacts)
  .get('/:contactId', guard, contactsControllers.getContactById)
  .post('/', guard, validateCreateContact, contactsControllers.addContact)
  .delete('/:contactId', guard, contactsControllers.removeContact)
  .put('/:contactId', guard, validateUpdateContact, contactsControllers.updateContact)
  .patch('/:contactId/favorite', guard, validateUpdateStatus, contactsControllers.updateStatusContact)

module.exports = router
