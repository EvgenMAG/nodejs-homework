/* eslint-disable new-cap */
const { MongoClient } = require('mongodb')
require('dotenv').config()
const uriDb = 'mongodb+srv://Magdegaben:Sonya2021GGT@cluster0.uiffc.mongodb.net/contactsNode?retryWrites=true&w=majority'

const db = new MongoClient.connect(uriDb, { useUnifiedTopology: true, })

process.on('SIGIN', async () => {
  const client = await db
  client.close()
  console.log('Connection for DB terminated')
  process.exit()
})
module.exports = db
