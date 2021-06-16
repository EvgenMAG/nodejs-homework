const mongoose = require('mongoose')
const { Schema, model } = mongoose
const bcrypt = require('bcryptjs')
const grava = require('gravatar')
const { Subscription } = require('../helpers/constants')
const SALT_FACTOR = 8

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/
        return re.test(String(value).toLowerCase())
      }
    },
    subscription: {
      type: String,
      enum: [Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS],
      default: Subscription.STARTER
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: function () {
        return grava.url(this.email, { s: '250' }, true)
      }
    },
    idClaudAvatar: {
      type: String,
      default: null
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(SALT_FACTOR))
  }
  next()
})

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User
