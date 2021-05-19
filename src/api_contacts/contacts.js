const express = require('express')
const contactsControllers = require('../controllers/contacts')
const { validateCreateContact, validateUpdateContact } = require('../validation/contactsValidation')
const router = express.Router()

router
  .get('/', contactsControllers.listContacts)
  .get('/:contactId', contactsControllers.getContactById)
  .post('/', validateCreateContact, contactsControllers.addContact)
  .delete('/:contactId', contactsControllers.removeContact)
  .put('/:contactId', validateUpdateContact, contactsControllers.updateContact)

module.exports = router
