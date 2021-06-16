const ContactsService = require('./contacts')
const UserService = require('./users')
const AuthService = require('./auth')
const LocalUploadAvatarService = require('./local-upload')
const UploadService = require('./cloud-uploads')
const EmailService = require('./email-verification')

module.exports = { ContactsService, UserService, AuthService, LocalUploadAvatarService, UploadService, EmailService }
