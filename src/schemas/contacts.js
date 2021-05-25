const mongoose = require('mongoose')
const { Schema } = mongoose

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'User name is required'],
      min: 2,
      max: 24,
    },
    email: {
      type: String,
      required: [true, 'User email is required'],
    },
    phone: {
      type: String,
      min: 14,
      max: 14,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
)

const Contact = mongoose.model('GoItCollection', contactsSchema)

module.exports = Contact
