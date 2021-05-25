const express = require('express')
const contactsControllers = require('../controllers/contacts')
const { validateCreateContact, validateUpdateContact, validateUpdateStatus } = require('../validation/contactsValidation')
const router = express.Router()

router
  .get('/', contactsControllers.listContacts)
  .get('/:contactId', contactsControllers.getContactById)
  .post('/', validateCreateContact, contactsControllers.addContact)
  .delete('/:contactId', contactsControllers.removeContact)
  .put('/:contactId', validateUpdateContact, contactsControllers.updateContact)
  .patch('/:contactId', validateUpdateStatus, contactsControllers.updateStatusContact)

module.exports = router
