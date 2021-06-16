const nodemailer = require('nodemailer')
const sendGrid = require('@sendgrid/mail')
const Mailgen = require('mailgen')
require('dotenv').config()

class EmailService {
    #reSender = nodemailer
    #sender = sendGrid
    #generateTemplate = Mailgen

    #createTemplate(verifyToken) {
      const mailGenerator = new this.#generateTemplate({
        theme: 'default',
        product: {
          name: 'System Contacts',
          link: 'https://3474f268626e.ngrok.io'
        }
      })

      const template = {
        body: {
          name: 'Guest',
          intro: 'Welcome to Contacts base! We are very excited to have you on board.',
          action: {
            instructions: 'To get started with Mailgen, please click here:',
            button: {
              color: '#22BC66', // Optional action button color
              text: 'Confirm your account',
              link: `https://3474f268626e.ngrok.io/api/users/verify/${verifyToken}`
            }
          }
        }
      }
      const emailBody = mailGenerator.generate(template)
      return emailBody
    }

    async sendEmail(verifyToken, email) {
      const emailBody = this.#createTemplate(verifyToken)
      this.#sender.setApiKey(process.env.SENDGRID_API_KEY)

      const msg = {
        to: email,
        from: process.env.EMAIL_LOGIN_META, // email that will be used for mailing
        subject: 'Sending with SendGrid is Fun',
        html: emailBody,
      }

      await this.#sender.send(msg)
    }

    async reSendEmail(verifyToken, email) {
      const emailBody = this.#createTemplate(verifyToken)

      const config = {
        host: 'smtp.meta.ua',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_LOGIN_META, // credentials to mail service
          pass: process.env.USER_PASSWORD_META, // credentials to mail service
        },
      }
      const msg = {
        to: email,
        from: process.env.EMAIL_LOGIN_META, // email that will be used for mailing
        subject: 'Sending with Nodemailer is Fun',
        html: emailBody,
      }

      const transporter = await this.#reSender.createTransport(config)
      await transporter.sendMail(msg)
    }
}

module.exports = EmailService
